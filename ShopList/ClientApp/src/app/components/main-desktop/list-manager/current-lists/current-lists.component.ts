import { Component, OnInit } from '@angular/core';
import { ShopListModel } from 'src/app/shared/models/shop-list-model';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-current-lists',
  templateUrl: './current-lists.component.html',
  styleUrls: ['./current-lists.component.css']
})
export class CurrentListsComponent implements OnInit {

  shopLists?: Array<ShopListModel> | any;
  shopList?: ShopListModel;
  isFetching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  isNotEmpty?: boolean;

  constructor(private shopListService: ShopListService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.shopListService.getAll(`${this.url}CheckList/AllCheckList/0`)
      .subscribe(responseData  => {
        this.shopLists = responseData;
        this.isNotEmpty = (this.shopLists.length > 0) ? true : false;
        this.isFetching = false; 
        },
        error => {
            if(error.status == 403){
              this.error = 'Odmowa dostępu';
              console.error('Odmowa dostępu');
            }else if(error.status == 500){
              this.error = 'Błąd połączenia z serwerem';
              console.error('Błąd połaczeniaz serwerem');
            }
            this.isFetching = false; 
          }
        );

  // this.isFetching=true
  // this.shopListService.
  // getMock().subscribe(responseData  => {
  //   this.shopLists = responseData;
  //   this.isNotEmpty = (this.shopLists.length > 0) ? true : false;
  //   this.isFetching = false; 
  //   },
  //   error => {
  //       if(error.status == 403){
  //         this.error = 'Odmowa dostępu';
  //         console.error('Odmowa dostępu');
  //       }else if(error.status == 500){
  //         this.error = 'Błąd połączenia z serwerem';
  //         console.error('Błąd połaczeniaz serwerem');
  //       }
  //       this.isFetching = false; 
  //     }
  //   );
  }

   
}
