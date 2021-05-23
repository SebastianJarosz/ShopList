import { Component, Input, OnInit } from '@angular/core';
import { ListPostionModel } from 'src/app/shared/models/shop-list-model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  posName?: string;
  quantity?: number;
  unit?: string;

  @Input() listPostion?: ListPostionModel;
  
  constructor() { }
  ngOnInit(): void {
    this.posName = this.listPostion?.posName;
    this.quantity = this.listPostion?.quantity;
    this.unit = this.listPostion?.unit;
  }

}
