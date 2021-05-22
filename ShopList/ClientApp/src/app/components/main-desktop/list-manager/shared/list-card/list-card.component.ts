import { Component, Input, OnInit } from '@angular/core';
import { ShopListModel, ListPostionModel } from 'src/app/shared/models/shop-list-model';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {

  constructor(private shopListService: ShopListService) { }

  id?: number;
  listName?: string;
  listPostions?: Array<ListPostionModel>;
  creationDate?: string;
  lastModficationDate?: string;
  shopPrice?: number;
  status?: string;

  @Input() shopList?: ShopListModel;
  localShopList?: ShopListModel;
  ngOnInit(): void {
    this.localShopList = this.shopList;
    this.listName = this.shopList?.listName;
    this.listPostions = this.shopList?.listPostions;
    this.creationDate = this.shopList?.creationDate;
    this.shopPrice = this.shopList?.shopPrice;
  }

}
