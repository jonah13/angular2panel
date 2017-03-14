import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TitleService} from '../../services/helpers/title.service';
import {UserModelService} from '../../models/user/user.model.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password-reset.component.html'
})
export class RequestPasswordResetComponent {
  protected email: string = '';
  protected error: string = '';
  protected success: string = '';
  protected working: boolean = false;

  /**
   * Injecting needed services
   * @param _router
   * @param _userModelService
   * @param pageTitle
   */
  constructor(private _router: Router,
              private _userModelService: UserModelService,
              private pageTitle: TitleService) {
    pageTitle.setTitle('Reset Password');
    this._subscribe();
  }

  /**
   * Submits reset password request form.
   */
  onSubmit() {
    this.error = '';
    this.working = true;
    this._userModelService.resetPassword({Email: this.email});
    return false;
  }

  /**
   * Subscribes to the necessary observable.
   */
  private _subscribe() {
    this._userModelService.subscribe(data => {
      console.log(data);
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
        this.success = data['ResponseMessage'];
      }
    }, error => {
      this.error = 'An error occurred while trying to contact the API';
      this.working = false;
    });
  }
}
