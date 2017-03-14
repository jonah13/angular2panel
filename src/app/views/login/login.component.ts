import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TitleService} from '../../services/helpers/title.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/styles/pages/login.component.scss']
})
export class LoginComponent {
  protected email: string = '';
  protected password: string = '';
  protected error: string = '';
  protected working: boolean = false;

  /**
   * Injecting needed services for login component
   * @param _authService
   * @param _router
   * @param pageTitle
   */
  constructor(private _authService: AuthService,
              private _router: Router, private pageTitle: TitleService) {
    pageTitle.setTitle('Login');
  }

  /**
   * login form submit action
   * @returns {boolean}
   */
  onSubmit(): boolean {
    this.error = '';
    if (!this.working) {
      this.working = true;
      //we get the token
      this._authService.getToken(this.email.trim(), this.password.trim()).subscribe(response => {
        console.log('getToken returned:');
        console.log(response);
        if (response && response.error) {
          this.working = false;
          this.error = response.error;
          return false;
        }
        //then login to get user ID (requires token)
        this._authService.login(this.email.trim(), this.password.trim()).subscribe((res) => {
          console.log('login returned:');
          console.log(res);
          this.working = false;
          if (res && res.error) {
            this.error = res.error;
          } else {
            this._router.navigate(['/panel']);
          }
        }, err => {
          console.log(err);
          this.error = err._body;
          this.working = false;
        });

      }, err => {
        if (err.status === 0) {
          this.error = 'Couldn\'t connect to the server, check your internet connection and try again!';
        }
        console.log(err);
        this.working = false;
      });
    } else {
      console.log('a request to login is already being processed');
    }
    return false;
  }
}
