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

  subscription: Subscription

  searchBox: FormControl = new FormControl()
 
  constructor(@Inject("auth") private auth,
              @Inject("input") private input,
              private router: Router) { }

  ngOnInit() {
    if(this.auth.authenticated()){
      this.username = this.auth.getProfile().nickname;
    }else{
      console.log("Not logged in !")
    }

    this.subscription = this.searchBox
                            .valueChanges
                            .debounceTime(200)
                            .subscribe(
                                term => this.input.changeInput(term)
                              );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  authP(): boolean {
    if(localStorage.getItem("id_token") != null){
      return true;
    }else{
      return false;
    }
  }

  login(): void {
  	this.auth.login()
                .then(profile => this.username = profile.nickname);
  }

  logout(): void {
  	this.auth.logout();
  }


  searchProblem(): void {
    this.router.navigateByUrl('/');
  }
  

}
