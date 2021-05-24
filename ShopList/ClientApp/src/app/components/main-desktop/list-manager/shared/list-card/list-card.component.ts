import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShopListModel, ListPostionModel } from 'src/app/shared/models/shop-list-model';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';
import { RemoveListDialogComponent } from '../../remove-list-dialog/remove-list-dialog.component';
import { ShareListDialogComponent } from '../../share-list-dialog/share-list-dialog.component';



@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {

  constructor(private shopListService: ShopListService, private router: Router, public dialog: MatDialog) { }

  id?: number | any;
  listName?: string;
  listPostions?: Array<ListPostionModel>;
  creationDate?: string;
  lastModficationDate?: string;
  shopPrice?: number;
  status?: number;

  isFeaching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  navurl?: string | any;

  @Input() shopList?: ShopListModel;
  localShopList?: ShopListModel;
  ngOnInit(): void {
    this.id = this.shopList?.id;
    this.localShopList = this.shopList;
    this.listName = this.shopList?.listName;
    this.listPostions = JSON.parse(this.shopList?.listPostion);
    this.creationDate = this.shopList?.creationDate;
    this.shopPrice = this.shopList?.shopPrice;
    this.status = this.shopList?.status;
  }

  sendToOld(){
    let updateShopListModel;
    if(this.status == 0){
      updateShopListModel = {
        'id': this.shopList?.id,
        'listName': this.shopList?.listName,
        'listPostion': this.shopList?.listPostion,
        'creationDate': this.shopList?.creationDate,
        'lastModficationDate':this.shopList?.lastModficationDate,
        'shopPrice': this.shopList?.shopPrice,
        'status': 1
      }
      this.navurl = 'main-panel/list-manager/recently-lists';
    } else {
        updateShopListModel = {
          'id': this.shopList?.id,
          'listName': this.shopList?.listName,
          'listPostion': this.shopList?.listPostion,
          'creationDate': this.shopList?.creationDate,
          'lastModficationDate':this.shopList?.lastModficationDate,
          'shopPrice': this.shopList?.shopPrice,
          'status': 0
      }
      this.navurl = 'main-panel/list-manager/current-lists';
    }

    this.shopListService.update(`${this.url}CheckList/EditCheckList`, updateShopListModel).subscribe(responseData => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.navurl]);
    }); 
      this.isFeaching = false;
     },
      error => {
          if(error.status == 403){
            this.error = 'Błąd podczas przesłania polecenia do serwera';
            console.error(this.error);
          }else if(error.status == 500){
            this.error = 'Błąd połączenia z serwerem';
            console.error(this.error);
          }
          this.isFeaching = false; 
        }
     );
  }

  openDialogShare(){
    const dialogRef = this.dialog.open(ShareListDialogComponent, {
      width: '250px',
      data: {id: this.shopList?.id}
    });
  }
  openDialogRemove(){
    const dialogRef = this.dialog.open(RemoveListDialogComponent, {
      width: '250px',
      data: {id: this.shopList?.id}
    });
  }
}