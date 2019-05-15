import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router' 
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { ValidateService } from './services/validate.service';
import { ShowMsgService } from './services/show-msg.service';
import { AuthService } from './services/auth.service';
import { StorageHandleService } from './services/storage-handle.service';
import { AuthGuard } from './guards/auth.guard';


const appRoutes : Routes = [
  {path: '', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component : ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [ValidateService,AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
