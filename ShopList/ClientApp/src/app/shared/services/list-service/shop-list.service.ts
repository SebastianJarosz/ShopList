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
  json_string='[{"posName":"pomidor","quantity":2,"unit":"szt"},{"posName":"lody","quantity":1,"unit":"opk"}]'
  shopLists?: Array<ShopListModel> = [
    new ShopListModel(1, "test", this.json_string, Date.now.toString(), Date.now.toString(), 1, "Aktywny"),
    new ShopListModel(1, "test", this.json_string, Date.now.toString(), Date.now.toString(), 1, "Aktywny")]
  shopList?: ShopListModel;

  getAll(url: string){
  let tokenParse = localStorage.getItem('token');
  let token = `${tokenParse}`.replace( /"/g ,' ');
  console.log(token);
  return this.httpClient.get<ShopListModel>(url, 
    { 
      observe:"body",
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
  .pipe(map((responseData: any) => {
    const responseArray: Array<ShopListModel> = [];
    for (const key in responseData){
      if(responseData.hasOwnProperty(key)){
        responseArray.push({...responseData[key], id: key })
      }
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
}
