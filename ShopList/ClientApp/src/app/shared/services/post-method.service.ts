import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostMethodService {

  constructor() { }
  post(body: FormGroup){
    console.log(body)
  }
}
