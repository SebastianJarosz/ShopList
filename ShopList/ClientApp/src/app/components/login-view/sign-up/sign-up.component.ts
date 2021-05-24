import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistryPostModel } from 'src/app/shared/models/registry-post-model';
import { RegistryService } from 'src/app/shared/services/login-service/registry.service';
import { UrlSettings } from 'src/app/shared/url-settings';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup= new FormGroup({});
  hide: boolean = true;
  isFeaching: boolean = false;
  error: string='NoErrors';
  errorUserName: string='NoErrors';
  errorEmail: string='NoErrors';
  errorPass: string='NoErrors';
  url: string = new UrlSettings().baseUrl;
  durationInSeconds = 5;

  constructor(private rest: RegistryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'repassword': new FormControl(null, Validators.required),
      'acceptReg':new FormControl(null, Validators.required),
    }); 
    this.error = 'NoErrors';
    this.errorUserName = 'NoErrors';
    this.errorEmail = 'NoErrors';
    this.errorPass = 'NoErrors';
  }
  onSubmit(){
    this.isFeaching = true;
    let registryBody = new RegistryPostModel(
                this.signUpForm.value.name.toString(),
                this.signUpForm.value.surname.toString(),
                this.signUpForm.value.userName.toString(),
                this.signUpForm.value.email.toString(),
                this.signUpForm.value.password.toString(),
                );

    this.rest.post(`${this.url}Users/Registry`, registryBody).subscribe(responseData => {
      if(responseData.body?.succeeded == true){
        this.snackBar.openFromComponent(SignUpSuccessComponent, {
          duration: this.durationInSeconds * 1000,
        });
      }else{
        if (responseData.body?.errors){
          for (let i = 0;  i < responseData.body?.errors.length; i++){
            switch (responseData.body?.errors[i].code){ 
              case "DuplicateUserName": { 
                this.errorUserName = "Użytkownik o takiej nazwie już istnieje.";
                 break; 
              } 
              case "DuplicateEmail": { 
                this.errorEmail = "Użytkownik o takim emailu już istnieje."
                 break; 
              } 
              case "PasswordTooShort": { 
                this.errorPass = 'Haslo nie spelnia wymagań.'; 
                break; 
             } 
           } 
          }
        } 
      }
      this.isFeaching = false; 
     },
      error => {
          if(error.status == 500){
            this.error = 'Błąd połączenia z serwerem';
          }else{
            error.forEach((element: { message: any; }) => {
              console.log(element.message)
            });
          }
          this.isFeaching = false; 
        }
     );
  }
}
