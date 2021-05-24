import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name?: string | any;
  surname?: string | any;
  email?: string | any;
  userName?: string | any;

  constructor(private userProfile: UserProfileService) { }

  ngOnInit(): void {
    let user = sessionStorage.getItem('userData');
    let objectUser = JSON.parse(user ? user : "")
    this.name = objectUser.name;
    this.surname = objectUser.surname;
    this.userName = objectUser.userName;
    this.email = objectUser.email;
  }

}
