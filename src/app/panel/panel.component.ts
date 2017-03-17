import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../services/helpers/title.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserModelService} from '../models/user/user.model.service';
import {AuthInfoService} from '../services/auth/auth.info.service';
import {EditProfileModalComponent} from './components/modals/edit-profile/edit-profile-modal.component';
import {AddOrganizationModalComponent} from './components/modals/add-organization/add-organization-modal.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../assets/styles/pages/panel.component.scss', '../../assets/styles/pages/after-login.scss']
})
export class PanelComponent implements OnInit {
  @ViewChild('editProfileModal') public editProfileModal:EditProfileModalComponent;
  @ViewChild('addOrganizationModal') public addOrganizationModal:AddOrganizationModalComponent;
  protected role: string = '';
  protected user_ID: number;
  protected user: any;
  protected user_temp: any = {FullName: '', role:'', Email:''};
  protected target: boolean = true;
  protected track: boolean = false;
  protected triage: boolean = false;
  protected graph_only: boolean = false;
  protected table_only: boolean = false;

  /**
   * Injecting needed services
   * @param pageTitle
   * @param _authService
   * @param _userModelService
   * @param _authInfoService
   * @param _router
   */
  constructor(private pageTitle: TitleService,
              private _authService: AuthService,
              private _authInfoService: AuthInfoService,
              private _userModelService: UserModelService,
              private _router:Router) {
  }

  /**
   * on init actions
   */
  ngOnInit() {
    this.pageTitle.setTitle('Panel');
    this._subscribe();
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
      if (this.user) {
        this.role = this.user.user_Role || '';
        this.user_ID = this.user.user_ID;
      } else {
        this.role = '';
        this.user_ID = 0;
      }
    } catch (err) {
      console.log(err);
    }
    console.log(this.user_ID);
    if (this.user_ID) {
      this._userModelService.getById(this.user_ID);
    } else {
      console.log(this.user);
      console.log(typeof this.user);
      //this.logout();
    }
  }

  onUpdateStateBtns(btn:string):boolean {
    this.target = false;
    this.track = false;
    this.triage = false;
    if (btn === 'target' || btn === 'track' || btn === 'triage') {
      this[btn] = true;
    }
    return false;
  }

  onUpdateDisplayOptions(btn:string):boolean {
    if (btn === 'table') {
      if (this.table_only) {
        this.table_only = false;
      } else {
        this.table_only = true;
        this.graph_only = false;
      }
    }
    if (btn === 'graph') {
      if (this.graph_only) {
        this.graph_only = false;
      } else {
        this.graph_only = true;
        this.table_only = false;
      }
    }
    return false;
  }

  onClick() {
    return false;
  }

  onSubmit(user_temp) {
    this.user_temp = user_temp;
    console.log(this.user_temp);
    this._userModelService.updateUser(this.user_temp);
  }

  public logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
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

        //updating user in LS
        let user_to_store = {
          user_ID: this.user_ID,
          user_Role: this.role,
          ProfilePic:this.user['ProfilePic'],
          Title: this.user.Title,
          FullName: this.user.FullName
        };
        this._authInfoService.setCurrentUser(JSON.stringify(user_to_store));

        this.user.user_Role = this.role;
        this.user_temp = {UserID: this.user.UserID, FullName: this.user.FullName, Password: this.user.Password, Title: this.user.Title};
        if (!this.user.FullName) {
          this.editProfileModal.trigger();
        }
      } else if (data.ResponseMessage === 'User Details Updated Successfully') {
        this.user.role = this.user_temp.Title;
        this.user.FullName = this.user_temp.FullName;
        this.user.Password = this.user_temp.Password;
        this._userModelService.getById(this.user_ID);
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
