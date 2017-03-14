import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserModelService} from '../../models/user/user.model.service';
import {TitleService} from '../../services/helpers/title.service';
import {StringUtils} from '../../shared/utils/string.utils';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html'
})
export class CreateNewPasswordComponent implements OnInit {
  protected email: string = '';
  protected password: string = '';
  protected confirm_password: string = '';
  protected error: string = '';
  protected success: string = '';
  protected GUID: string = '';
  protected working: boolean = false;

  /**
   * Injecting needed services
   * @param _router
   * @param _route
   * @param _userModelService
   * @param _pageTitle
   */
  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _userModelService: UserModelService,
              private _pageTitle: TitleService) {
  }

  ngOnInit() {
    this._pageTitle.setTitle('Reset Your Password');
    this._subscribe();
    this.GUID = this._route.snapshot.queryParams['GUID'];
    this.email = this._route.snapshot.queryParams['Email'];
    if (!this.GUID || !this.email) {
      this.error = 'The link you followed is not valid, please try again!';
    }

  }

  /**
   * Submits reset password request form.
   */
  onSubmit() {
    this.success = '';
    this.error = '';
    if (this.validate()) {
      this.working = true;
      this._userModelService.changePassword({Email: this.email, Password: this.password, Temp_Password: this.GUID});
    }
    return false;
  }

  /**
   * validate user input
   * @returns {boolean}
   */
  validate(): boolean {
    this.error = '';
    this.email = this.email.trim();
    this.GUID = this.GUID.trim();
    this.password = this.password.trim();
    this.confirm_password = this.confirm_password.trim();
    if (!this.email || !StringUtils.isEmail(this.email)) {
      this.error = 'The link you followed is not valid, please try again!';
      return false;
    }
    if (!this.GUID) {
      this.error = 'The link you followed is not valid, please try again';
      return false;
    }
    if (!this.password) {
      this.error = 'password is required';
      return false;
    }
    if (!this.confirm_password) {
      this.error = 'confirm password is required';
      return false;
    }
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!re.test(this.password)) {
      this.error = 'Password must contain at least six characters, including uppercase, lowercase letters and numbers';
      return false;
    }
    if (this.password !== this.confirm_password) {
      this.error = 'passwords do not match';
      return false;
    }

    return true;
  }


  /**
   * Subscribes to the necessary observable.
   */
  private _subscribe() {
    this._userModelService.subscribe(data => {
      this.working = false;

      //error case
      if (!data || (data && data['ResponseCode'] !== 200)) {
        if (data && data['ResponseMessage']) {
          this.error = data['ResponseMessage'];
        } else {
          this.error = 'An unknown error occurred';
          console.log(data);
        }
      } else {
        this.success = 'Your password was successfully changed!';
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 3000);
      }
    }, error => {
      this.error = 'An error occurred while trying to contact the API';
      this.working = false;
    });
  }
}
