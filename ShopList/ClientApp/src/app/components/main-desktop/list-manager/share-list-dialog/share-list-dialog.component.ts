import {Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogDataShareList } from 'src/app/shared/interface/dialog-data-share-list-interface';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-share-list-dialog',
  templateUrl: './share-list-dialog.component.html',
  styleUrls: ['./share-list-dialog.component.css']
})
export class ShareListDialogComponent implements OnInit {

  isFetching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  shareListForm: FormGroup = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataShareList,
              private shopListService: ShopListService,
              public dialog: MatDialog
              ) { }
  
  ngOnInit(): void {
  }

  onSubmit(){
    this.isFetching = true;
    this.shopListService.post(`${this.url}CheckList/ShareCheckList/${this.shareListForm.get('email')?.value}/${this.data.id}`, null)
    .subscribe(responseData => {
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

  getErrorMessage() {
    if (this.shareListForm.hasError('required')) {
      return 'Email jest wymagany';
    }

    return this.shareListForm.hasError('email') ? 'Nieprawidłowy emial' : '';
  }
}
