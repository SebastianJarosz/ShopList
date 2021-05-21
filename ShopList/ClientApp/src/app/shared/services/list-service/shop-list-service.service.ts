import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostData } from '../../interface/IPostData';
import { ShopListModel } from '../../models/shop-list-model';

@Injectable({
  providedIn: 'root'
})
export class ShopListServiceService {

  constructor(private httpClient: HttpClient) { }

  post(url: string,  postData: any){
    let tokenParse = localStorage.getItem('token');
    let token = `${tokenParse}`.replace( /"/g ,' ');
    return this.httpClient.post<ShopListModel>(url,
      postData,
      {
        observe:'response',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
   }
}
