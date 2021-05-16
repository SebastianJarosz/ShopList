import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginViewComponent } from './compnents/login-view/login-view.component';
import { SignInComponent } from './components/login-view/sign-in/sign-in.component';
import { SignUpComponent } from './components/login-view/sign-up/sign-up.component';
import { MainDesktopComponent } from './components/main-desktop/main-desktop.component';
import { TopNavbarComponent } from './components/main-desktop/top-navbar/top-navbar.component';
import { ListManagerComponent } from './components/main-desktop/list-manager/list-manager.component';
import { CreateListComponent } from './components/main-desktop/list-manager/create-list/create-list.component';
import { CurrentListsComponent } from './components/main-desktop/list-manager/current-lists/current-lists.component';
import { RecentlyListsComponent } from './components/main-desktop/list-manager/recently-lists/recently-lists.component';
import { SharedListsComponent } from './components/main-desktop/list-manager/shared-lists/shared-lists.component';
import { UserProfileComponent } from './components/main-desktop/user-profile/user-profile.component';
import { ListCardComponent } from './components/main-desktop/list-manager/shared/list-card/list-card.component';
import { ListItemComponent } from './components/main-desktop/list-manager/shared/list-card/list-item/list-item.component';
import { ListCardListsComponent } from './components/main-desktop/list-manager/shared/list-card-lists/list-card-lists.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    SignInComponent,
    SignUpComponent,
    MainDesktopComponent,
    TopNavbarComponent,
    ListManagerComponent,
    CreateListComponent,
    CurrentListsComponent,
    RecentlyListsComponent,
    SharedListsComponent,
    UserProfileComponent,
    ListCardComponent,
    ListItemComponent,
    ListCardListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
