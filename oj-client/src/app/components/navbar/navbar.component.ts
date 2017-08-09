import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl }  from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  title = "COJ"

  username = ""

  constructor(@Inject("auth") private auth) { }

  ngOnInit() {
  }

  login(): void {
  	this.auth.login();
  }

  logout(): void {
  	this.auth.logout();
  }

  

}
