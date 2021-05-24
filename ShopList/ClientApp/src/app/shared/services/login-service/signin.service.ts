import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPostData } from '../../interface/IPostData';
import { LoginResponseModel } from '../../models/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private httpClient: HttpClient) { }


  post(url: string,  postData: IPostData){
   return this.httpClient.post<LoginResponseModel>(url,
     postData,
     {
       observe:'response'
     }
     );
  }

  get(url: string){
    let tokenParse = localStorage.getItem('token');
    let token = `${tokenParse}`.replace( /"/g ,' ');
    return this.httpClient.get<LoginResponseModel>(url, 
      { 
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
    .pipe(map((responseData: any) => {
          return responseData;
    }));
  }
}
