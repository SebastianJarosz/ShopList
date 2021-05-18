import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPostData } from '../../interface/IPostData';
import { LoginResponseModel } from '../../models/LoginResponseModel';

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
   return this.httpClient.get<LoginResponseModel>(url)
    .pipe(map((responseData: any) => {
      const responseArray = [];
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
          responseArray.push({...responseData[key], id: key })
        }
      }
      return responseArray;
    }));
  }
}
