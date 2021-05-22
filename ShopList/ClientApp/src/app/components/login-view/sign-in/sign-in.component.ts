import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPostModel } from 'src/app/shared/models/LoginPostModel';
import { LoginResponseModel } from 'src/app/shared/models/LoginResponseModel';
import { UserProfileModel } from 'src/app/shared/models/user-profile-model';
import { SigninService } from 'src/app/shared/services/login-service/signin.service';
import { UserProfileService } from 'src/app/shared/services/user-profile/user-profile.service';
import { UrlSettings } from 'src/app/shared/url-settings';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  isFeaching: boolean = false;
  error: string='NoErrors';
  url: string = new UrlSettings().baseUrl;

  constructor(private rest: SigninService, private router: Router, 
              private userProfile: UserProfileService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    }); 
    this.error = 'NoErrors';
  }

  onSubmit(){
    this.isFeaching = true;
    let login = new LoginPostModel(
                this.signInForm.value.userName.toString(),
                this.signInForm.value.password.toString());

    this.rest.post(this.url.concat('Users/UserLogin'), login).subscribe(responseData => {
      responseData.body?.token;
      localStorage.setItem("token", JSON.stringify(responseData.body?.token));
      let user: any = responseData.body;
      this.userProfile.createUserProfile(user);
      sessionStorage.setItem("userData", JSON.stringify(this.userProfile.getUserProfile()));
      this.router.navigate(['main-panel']);
      this.isFeaching = false; 
     },
      error => {
          if(error.status == 403){
            this.error = 'Nieprawidłowy login lub hasło';
            console.error('Nieprawidłowy login lub hasło');
          }else if(error.status == 500){
            this.error = 'Błąd połączenia z serwerem';
            console.error('Błąd połączenia z serwerem');
          }
          this.isFeaching = false; 
        }
     );
  }
}
