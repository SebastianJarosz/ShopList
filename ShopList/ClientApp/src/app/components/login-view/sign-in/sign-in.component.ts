import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostMethodService } from 'src/app/shared/services/post-method.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm: FormGroup= new FormGroup({});
  hide: boolean = true;

  constructor(private post: PostMethodService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    }); 
  }
  onSubmit(){
    this.post.post(this.signInForm);
  }
  
}
