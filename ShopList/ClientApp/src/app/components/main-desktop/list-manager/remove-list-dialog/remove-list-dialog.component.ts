import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { DialogDataShareList } from 'src/app/shared/interface/dialog-data-share-list-interface';
import { ShopListService } from 'src/app/shared/services/list-service/shop-list.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-remove-list-dialog',
  templateUrl: './remove-list-dialog.component.html',
  styleUrls: ['./remove-list-dialog.component.css']
})
export class RemoveListDialogComponent implements OnInit {

  isFeaching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  currentRoute?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataShareList,
  private shopListService: ShopListService,
  public dialog: MatDialog, private router: Router
  ) { }

  ngOnInit(): void {
  }
  delete(){
    this.shopListService.delete(`${this.url}CheckList/Delete/${this.data.id}`).subscribe(responseData => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/main-panel/list-manager/current-lists']);
        this.dialog.closeAll();
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
}
