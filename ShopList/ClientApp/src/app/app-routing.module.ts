import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { CreateListComponent } from './components/main-desktop/list-manager/create-list/create-list.component';
import { CurrentListsComponent } from './components/main-desktop/list-manager/current-lists/current-lists.component';
import { EditListComponent } from './components/main-desktop/list-manager/edit-list/edit-list.component';
import { ListManagerComponent } from './components/main-desktop/list-manager/list-manager.component';
import { RecentlyListsComponent } from './components/main-desktop/list-manager/recently-lists/recently-lists.component';
import { MainDesktopComponent } from './components/main-desktop/main-desktop.component';
import { UserProfileComponent } from './components/main-desktop/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'main-panel', component: MainDesktopComponent, children: [
    {path: 'my-profile/:userName', component: UserProfileComponent},
    {path: 'list-manager', component: ListManagerComponent, children: [
      {path: 'create-list', component: CreateListComponent},
      {path: 'current-lists', component: CurrentListsComponent},
      {path: 'recently-lists', component: RecentlyListsComponent},
      {path: 'edit-list/:id', component: EditListComponent},
    ]},
  ]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
