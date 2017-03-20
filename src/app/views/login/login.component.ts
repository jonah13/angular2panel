import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TitleService} from '../../services/helpers/title.service';
import {AuthService} from '../../services/auth/auth.service';
import {UserModelService} from '../../models/user/user.model.service';
import {AuthInfoService} from '../../services/auth/auth.info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/styles/pages/login.component.scss']
})
export class LoginComponent implements OnInit {
  protected email: string = '';
  protected password: string = '';
  protected error: string = '';
  protected working: boolean = false;
  protected user: any;
  protected role: string = '';

  /**
   * Injecting needed services for login component
   * @param _authService
   * @param _authInfoService
   * @param _userModelService
   * @param _router
   * @param pageTitle
   */
  constructor(private _authService: AuthService,
              private _authInfoService: AuthInfoService,
              private _userModelService: UserModelService,
              private _router: Router, private pageTitle: TitleService) {
    pageTitle.setTitle('Login');
  }

  ngOnInit() {
    this._subscribe();
  }

  getUserDetails() {
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
    } catch (err) {
      console.log(err);
    }
    console.log(this.user);
    if (!this.user || !this.user.user_ID) {
      this.error = 'could not get user ID';
    } else {
      this.role = this.user.user_Role;
      this._userModelService.getById(this.user.user_ID);
    }
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
            return false;
          }
          this.getUserDetails();

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


  /**
   * Subscribes to the necessary observable.
   */
  private _subscribe() {
    this._userModelService.subscribe(data => {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(data);
      if (data.ResponseCode === 200 && data.ResponseMessage === 'Success') {
        //updating user object
        this.user = data.UserDetails;
        this.user.user_Role = this.role;
        this.user.user_ID = this.user.UserID;

        //updating user in LS
        let user_to_store = {
          user_ID: this.user.user_ID,
          user_Role: this.user.user_Role,
          ProfilePic:this.user.ProfilePic,
          Title: this.user.Title,
          FullName: this.user.FullName
        };
        if (this.user.organizationid) {
          user_to_store['organization_id'] = this.user.organizationid;
        }
        this._authInfoService.setCurrentUser(JSON.stringify(user_to_store));
        this._router.navigate(['/panel']);

      } else {
        this.error = 'could not get user ID';
      }
    }, error => {
      console.log(error);
      this.error = 'could not get user ID';
    });
  }
}
