import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostData } from '../../interface/IPostData';
import { RegistryResponseModel } from '../../models/RegistryResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private httpClient: HttpClient) {}
  
  post(url: string,  postData: IPostData){
    return this.httpClient.post<RegistryResponseModel>(url,
      postData,
      {
        observe:'response'
      }
      );
   }
}
