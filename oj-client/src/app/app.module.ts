import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';

import { routing } from './app.routes';


import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  HttpModule,
	  routing
  ],
  providers: [
  	{
  		provide:"data",
  		useClass: DataService
  	},
    {
      provide:"auth",
      useClass:AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
