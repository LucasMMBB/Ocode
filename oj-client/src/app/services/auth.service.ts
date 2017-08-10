import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  // configure Auth0
  clientID = 's1WsAPFYmbycha68omqQFq4eobHtx6Y6';
  domain = 'ojsystem.auth0.com';

  lock = new Auth0Lock(this.clientID, this.domain, {});

  constructor() {

  }

  public login(): Promise<Object> {

    return new Promise((resolve, reject) => {
      // Call the show method to display the widget.
      this.lock.show((error: string, profile: Object, id_token: string) => {
        if (error) {
          reject(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', id_token);
          resolve(profile);
        }
      });
    })
    
  }

  public authenticated(){
    // Check if there is any expired JWT
    // This searches for an item in localStorage with key == "id_token"
    return tokenNotExpired();
  }

  public logout(){
    // Remove token from localstorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  public getProfile(): Object {
    return JSON.parse(localStorage.getItem('profile'));
  }

}