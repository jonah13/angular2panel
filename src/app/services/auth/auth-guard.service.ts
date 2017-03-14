import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthInfoService } from './auth.info.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthInfoService, private _router: Router) { }

  canActivate() {
    let promise = new Promise((resolve) => {
      if (!this._auth.isLoggedIn()) {
        this._router.navigate(['/login']);
        resolve(false);
      }
      resolve(true);
    });
    return promise;
  }

}
