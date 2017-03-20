import {Component, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {AuthInfoService} from '../../../services/auth/auth.info.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {OrganizationModelService} from '../../../models/organization/organization.model.service';

@Component({
  selector: 'app-organizations-header',
  templateUrl: './organizations-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class OrganizationsHeaderComponent {
  @Output() organizationChanged = new EventEmitter<any>();
  protected user:any = null;
  protected organizations:any[] = [];
  protected current_organization:any = null;

  /**
   * Injecting needed services
   * @param _authInfoService
   * @param _authService
   * @param _organizationModelService
   * @param _router
   */
  constructor(private _authInfoService: AuthInfoService,
              private _authService: AuthService,
              private _organizationModelService: OrganizationModelService,
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
      return;
    }

    if (this.user.user_Role === "SuperAdmin") {
      console.log('SuperAdmin!!!');
      this._organizationModelService.list();
    } else if (this.user.organization_id) {
      console.log(this.user.user_Role+'!!!');
      console.log(this.user.organization_id);
      this._organizationModelService.getById(this.user.organization_id);
    }
  }

  /**
   * Subscribes to the necessary observable.
   */
  private _subscribe() {
    this._organizationModelService.subscribe(data => {
      if (typeof data === 'string') {
        console.log('string');
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(data);
      if (data.ResponseCode === 200 && data.ResponseMessage === 'Success') {
        if (data.ListOrganizationDetails) {
          this.organizations = data.ListOrganizationDetails;
          if (this.organizations.length > 0) {
            this.current_organization = this.organizations[0];
            this.organizationChanged.emit(this.current_organization);
          }
        }
        if (data.OrganizationDetails) {
          this.current_organization = data.OrganizationDetails;
          this.organizationChanged.emit(this.current_organization);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  onClick():boolean {
    return false;
  }

  onChooseOrganization(index:number):boolean {
    this.current_organization = this.organizations[index];
    this.organizationChanged.emit(this.current_organization);
    return false;
  }

  logout():boolean {
    this._authService.logout();
    this._router.navigate(['/login']);
    return false;
  }
}
