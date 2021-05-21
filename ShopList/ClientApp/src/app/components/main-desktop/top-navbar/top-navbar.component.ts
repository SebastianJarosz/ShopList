import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseModel } from 'src/app/shared/models/LoginResponseModel';
import { UserProfileModel } from 'src/app/shared/models/user-profile-model';
import { SigninService } from 'src/app/shared/services/login-service/signin.service';
import { UserProfileService } from 'src/app/shared/services/user-profile/user-profile.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  headerDict = []
  url: string = new UrlSettings().baseUrl;
  isFeaching: boolean = false;
  error: string='NoErrors';
  showFiller = false;
  innerWidth: any;
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.error='NoErrors';
   }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth < 640){
      this.isMobile = true;
    }else{
      this.isMobile = false
    }
  }
  
  goToMyProfile(){
      let userProfile: any = sessionStorage.getItem("userData");
      let obj: UserProfileModel = JSON.parse(userProfile);
      this.router.navigate(['/main-panel/my-profile/'.concat(obj.userName)]);
  }
  goToMyList(url: string){
    this.router.navigate(['/main-panel/list-manager/'.concat(url)]);
}
  logOut(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    this.router.navigate(["/"]);
  }
}
