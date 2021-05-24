import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../../models/login-response-model';
import { UserProfileModel } from '../../models/user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  
  userProfile?: UserProfileModel;

  constructor() {

   }
  getUserProfile(){
    return this.userProfile;
  }
  createUserProfile(model?: LoginResponseModel){
    if(model != null){
      this.userProfile = new UserProfileModel(
        model.name,
        model.surname,
        model.userName,
        model.email
        );
      }                        
  }
}
