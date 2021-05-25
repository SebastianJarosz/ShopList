import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  mockShopLists: Array<ShopListModel> =[
    new ShopListModel(1,"Mock1",
    '[{"posName":"Kawa","quantity":3,"unit":"opakownia"},{"posName":"sól","quantity":1,"unit":"opakowanie"},{"posName":"czekolada z pomarańczą","quantity":1,"unit":"szt"}]',
    "2021-05-24 09:38:46", "2021-05-24 09:38:46", 0, 0),
    new ShopListModel(2,"Mock2",
    '[{"posName":"Kawa","quantity":3,"unit":"opakownia"},{"posName":"sól","quantity":1,"unit":"opakowanie"},{"posName":"czekolada z pomarańczą","quantity":1,"unit":"szt"}]',
    "2021-05-24 09:38:46", "2021-05-24 09:38:46", 0, 0),
    new ShopListModel(3,"Mock3",
    '[{"posName":"Kawa","quantity":3,"unit":"opakownia"},{"posName":"sól","quantity":1,"unit":"opakowanie"},{"posName":"czekolada z pomarańczą","quantity":1,"unit":"szt"}]',
    "2021-05-24 09:38:46", "2021-05-24 09:38:46", 0, 0),
  ];

  getMock(){
    const obser = new Observable((subscriber) => {
      setTimeout(()=>{
          subscriber.next(this.mockShopLists);
          subscriber.complete();
      }, 3000);
    });
    return obser;
  }

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
