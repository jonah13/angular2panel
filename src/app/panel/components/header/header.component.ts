import {Component, Input, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {AuthInfoService} from '../../../services/auth/auth.info.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserModelService} from '../../../models/user/user.model.service';
import {EditProfileModalComponent} from '../modals/edit-profile/edit-profile-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @ViewChild('editProfileModal') public editProfileModal:EditProfileModalComponent;
  //@ViewChild('addOrganizationModal') public addOrganizationModal:AddOrganizationModalComponent;
  @Input('group_url') group_url:string = '/team-view';
  protected user:any = null;
  protected user_temp:any = {};
  protected role:string = '';

  /**
   * Injecting needed services
   * @param _authInfoService
   * @param _authService
   * @param _userModelService
   * @param _router
   */
  constructor(private _authInfoService: AuthInfoService,
              private _authService: AuthService,
              private _userModelService: UserModelService,
              private _router: Router) {
  }

  /**
   * on init actions
   */
  ngOnInit() {
    this._subscribe();
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
    } catch (err) {
      console.log(err);
    }
    console.log(this.user);

    if (!this.user || !this.user.user_ID) {
      this.logout();
    } else {
      this.role = this.user.user_Role;
      //if (!this.user.ProfilePic) {
      this._userModelService.getById(this.user.user_ID);
      //}
    }
  }

  onSubmit(user_temp) {
    this.user_temp = user_temp;
    console.log(this.user_temp);
    //this._userModelService.updateUser(this.user_temp);
  }

  logout():boolean {
    this._authService.logout();
    this._router.navigate(['/login']);
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
        this._authInfoService.setCurrentUser(JSON.stringify(user_to_store));

        this.user_temp = {UserID: this.user.user_ID, FullName: this.user.FullName, Password: this.user.Password, Title: this.user.Title};
        if (!this.user.FullName) {
          this.editProfileModal.trigger();
        }
      } else if (data.ResponseMessage === 'User Details Updated Successfully') {
        this.user.Title = this.user_temp.Title;
        this.user.FullName = this.user_temp.FullName;
        this.user.Password = this.user_temp.Password;
        this._userModelService.getById(this.user.user_ID);
        this.editProfileModal.trigger(false);
      } else {
        this.logout();
      }
    }, error => {
      console.log(error);
      this.logout();
    });
  }
}