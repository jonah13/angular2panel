import { Component } from '@angular/core';
import {TitleService} from '../../services/helpers/title.service';
import {UserModelService} from '../../models/user/user.model.service';
import {StringUtils} from '../../shared/utils/string.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  protected email: string = '';
  protected subject: string = '';
  protected message: string = '';
  protected success: string = '';
  protected error: string = '';
  protected working: boolean = false;

  /**
   * Injecting needed services for login component
   * @param _userModelService
   * @param pageTitle
   */
  constructor(private _userModelService: UserModelService,
              private _router:Router,
              private pageTitle: TitleService) {
    pageTitle.setTitle('Contact Us');
    this._subscribe();
  }

  /**
   * login form submit action
   * @returns {boolean}
   */
  onSubmit(): boolean {
    this.success = '';
    this.error = '';
    if (this.validate()) {
      this.working = true;
      this._userModelService.contact({email: this.email, subject: this.subject, message: this.message});
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
    if (!this.email || !StringUtils.isEmail(this.email)) {
      this.error = 'You have to enter a valid Email address';
      return false;
    }
    if (!this.subject) {
      this.error = 'Name/Subject is required';
      return false;
    }
    if (!this.message) {
      this.error = 'message is required';
      return false;
    }

    return true;
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
        this.success = 'Contact form was successfully submitted';
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
