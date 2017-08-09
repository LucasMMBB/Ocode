import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {

  // configure Auth0
  clientID = 's1WsAPFYmbycha68omqQFq4eobHtx6Y6';
  domain = 'ojsystem.auth0.com';

  lock = new Auth0Lock(this.clientID, this.domain, {});

  constructor() {
    this.lock.on("authenticated", (authResult)=>{
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login(){
    // call the show method to display the widget
    this.lock.show();
  }

  public authenticated(){
    // Check if there is any expired JWT
    // This searches for an item in localStorage with key == "id_token"
    return tokenNotExpired();
  }

  public logout(){
    // Remove token from localstorage
    localStorage.removeItem('id_token');
  }

}