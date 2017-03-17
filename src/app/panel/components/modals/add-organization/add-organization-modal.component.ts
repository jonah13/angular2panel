import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';
import {AuthInfoService} from '../../../../services/auth/auth.info.service';
import {DomSanitizer} from '@angular/platform-browser';
import {OrganizationModelService} from '../../../../models/organization/organization.model.service';
import {StringUtils} from '../../../../shared/utils/string.utils';

@Component({
  selector: 'app-add-organization-modal',
  templateUrl: './add-organization-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss']
})
export class AddOrganizationModalComponent implements OnInit {
  @ViewChild('addOrganizationModal') public addOrganizationModal:ModalDirective;
  public organization:any = {Name: '', Description: '', defaultscheme: 'Beckway Blue', Email: ''};
  public organization_img:string = '';
  public success:string = '';
  public error:string = '';
  protected user_ID:number;
  protected working:boolean = false;

  /**
   * Injecting needed service
   * @param _authInfoService
   * @param _organizationModelService
   * @param _sanitizer
   */
  constructor(private _authInfoService: AuthInfoService,
              private _organizationModelService: OrganizationModelService,
              private _sanitizer: DomSanitizer) {
  }

  /**
   * Initial loading of local businesses and setting page title
   */
  ngOnInit():void {
    this._subscribe();
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      let user = JSON.parse(str);
      if (user) {
        this.user_ID = user.user_ID;
      } else {
        this.user_ID = 0;
      }
    } catch (err) {
      console.log(err);
    }
    this.organization['createdBy'] = this.user_ID;
    console.log(this.user_ID);
  }

  /**
   * shows/hides the modal
   * @param open
   */
  public trigger(open = true):void {
    if (open) {
      this.addOrganizationModal.show();
    } else {
      this.addOrganizationModal.hide();
    }
  }

  protected onSubmit():void {
    console.log(this.organization);
    //validation goes here

    if (this.validate()) {
      this.working = true;
      this._organizationModelService.createOrganization(this.organization);
    }
  }


  /**
   * validate user input
   * @returns {boolean}
   */
  validate(): boolean {
    this.error = '';
    this.success = '';
    this.organization.Name = this.organization.Name.trim();
    if (!this.organization.Name) {
      this.error = 'Organization Name is required';
      return false;
    }
    this.organization.Description = this.organization.Description.trim();
    if (!this.organization.Description || this.organization.Description.length > 120) {
      this.error = 'Organization Description is required/too long';
      return false;
    }
    this.organization.Email = this.organization.Email.trim();
    if (!this.organization.Email || !StringUtils.isEmail(this.organization.Email)) {
      this.error = 'You have to enter a valid Email address';
      return false;
    }
    return true;
  }

  onImageChange($event):void {
    this.organization.OrganizationLogo = $event.target.files[0];
    this.organization_img = URL.createObjectURL(this.organization.OrganizationLogo);
  }

  /**
   * Subscribes to the necessary observable.
   */
  private _subscribe():void {
    this._organizationModelService.subscribe(data => {
      this.working = false;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(data);
      if (data.ResponseCode === 200 && data.ResponseMessage === 'Success' && data.MailStatus === 'Sent') {
        this.success = 'Organization created successfully, an email has been sent to the provided address to continue registration';
        setTimeout(() => {
          this.trigger(false);
        }, 3000);
      } else {
        this.error = 'an error has occurred';
      }
    }, error => {
      this.error = 'an error has occurred';
      console.log(error);
    });
  }
}
