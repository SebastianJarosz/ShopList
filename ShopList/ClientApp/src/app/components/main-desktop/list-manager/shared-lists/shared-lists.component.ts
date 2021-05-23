import { Component, OnInit } from '@angular/core';
import { ShopListModel } from 'src/app/shared/models/shop-list-model';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-shared-lists',
  templateUrl: './shared-lists.component.html',
  styleUrls: ['./shared-lists.component.css']
})
export class SharedListsComponent implements OnInit {

  shopLists?: Array<ShopListModel>;
  shopList?: ShopListModel;
  isFeaching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;

  constructor(private shopListService: ShopListService) { }

  ngOnInit(): void {
    this.isFeaching=true
    this.shopListService.
      getAll(`${this.url}CheckList/AllCheckList/2`).subscribe(responseData  => {
        this.shopLists = responseData;
        console.log(this.shopLists);
        this.isFeaching = false; 
        },
        error => {
            if(error.status == 403){
              this.error = 'Odmowa dostępu';
              console.error('Odmowa dostępu');
            }else if(error.status == 500){
              this.error = 'Błąd połączenia z serwerem';
              console.error('Błąd połaczeniaz serwerem');
            }
            this.isFeaching = false; 
          }
        );
  }
}