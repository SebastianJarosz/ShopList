import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup= new FormGroup({});
  hide: boolean = true;
  constructor() { }

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
  }
  onSubmit(){
    console.log(this.signUpForm)
  }
}
