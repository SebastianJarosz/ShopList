import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPostData } from '../../interface/IPostData';
import { ShopListModel } from '../../models/shop-list-model';

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  constructor(private httpClient: HttpClient) { }
  shopLists?: Array<ShopListModel>;
  shopList?: ShopListModel;

  getAll(url: string){
  let tokenParse = localStorage.getItem('token');
  let token = `${tokenParse}`.replace( /"/g ,' ');
  return this.httpClient.get<ShopListModel>(url, 
    { 
      observe:"body",
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
  .pipe(map((responseData: any) => {
    const responseArray: Array<ShopListModel> = [];
    for (const el of responseData){
        responseArray.push(el)
    }
    return responseArray;
  }));
}

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
   update(url: string,  postData: any){
    let tokenParse = localStorage.getItem('token');
    let token = `${tokenParse}`.replace( /"/g ,' ');
    return this.httpClient.put<ShopListModel>(url,
      postData,
      {
        observe:'response',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
   }
   delete(url: string){
    let tokenParse = localStorage.getItem('token');
    let token = `${tokenParse}`.replace( /"/g ,' ');
    return this.httpClient.delete<ShopListModel>(url,
      {
        observe:'response',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
   }
   
}
