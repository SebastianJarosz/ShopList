import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  createShopListForm: FormGroup = new FormGroup({});
  shopPostions = new FormArray([]);
  isFetching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  
  constructor(private shopListService: ShopListService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createShopListForm = new FormGroup({
      'listName': new FormControl(null, Validators.required),
      'shopPostions': this.shopPostions
    }); 
  }
  addShopPostion(): void{
    const control = new FormGroup({
      'posName': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'unit': new FormControl(null, Validators.required),
      });
      this.shopPostions.push(control);
  }
  removePostion(pos: number): void{
    this.shopPostions.removeAt(pos);
  }
  onSubmit(): void{
    this.isFetching = true;
    const createShopListModel = {
      'listName': this.createShopListForm.get('listName')?.value,
      'listPostion': JSON.stringify(this.createShopListForm.get('shopPostions')?.value)
    }
    this.shopListService.post(`${this.url}CheckList/AddCheckList`, createShopListModel)
    .subscribe(responseData => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['main-panel/list-manager/current-lists']);
    }); 
      this.isFetching = false; 
      this.dialog.closeAll();
     },
      error => {
          if(error.status == 403){
            this.error = 'Błąd podczas przesłania polecenia do serwera';
            console.error(this.error);
          }else if(error.status == 500){
            this.error = 'Błąd połączenia z serwerem';
            console.error(this.error);
          }
          this.isFetching = false; 
        }
     );
  }
}
