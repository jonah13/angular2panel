import {Component, OnInit, Input, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';
import {TeamMember} from "../../../../models/team-member/team-member.interface";
import {AuthInfoService} from "../../../../services/auth/auth.info.service";
import {TeamMemberModelService} from "../../../../models/team-member/team-member.model.service";

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss', '../../../../../assets/styles/components/panel/invite-users-modal.component.scss']
})
export class InviteUsersModalComponent implements OnInit {
  @ViewChild('inviteUsersModal') public inviteUsersModal:ModalDirective;
  @Input('organization_ID') organization_ID:number;
  protected teamMembersToInvite:TeamMember[] = [];
  protected user:any;
  protected user_ID:number;

  /**
   * @param _authInfoService
   */
  constructor(private _authInfoService:AuthInfoService,
              private _teamMemberModelService:TeamMemberModelService) {
  }

  ngOnInit() {
    let str:string = '' + this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
      if (this.user) {
        this.user_ID = this.user.user_ID;
      } else {
        this.user_ID = 0;
      }
    } catch (err) {
      console.log(err);
    }

  }

  public trigger(open = true):void {
    if (open) {
      this.inviteUsersModal.show();
    } else {
      this.inviteUsersModal.hide();
    }

  }

  public organizationChangedHandler(organization) {
    this.organization_ID = organization.ID;
    this.teamMembersToInvite = [];
    this.addNewTeamMemberToInvite();
  }

  addNewTeamMemberToInvite() {
    this.teamMembersToInvite.push({
      FullName: '',
      Title: '',
      ProfilePic: '',
      Email: '',
      PermissionGroup: 'Administrator',
      organizationId: this.organization_ID,
      Created_by: +this.user_ID
    });
  }

  deleteTeamMemberToInvite(index) {
    this.teamMembersToInvite.splice(index, 1);
  }

  sendInvites() {
    this._teamMemberModelService.create(this.teamMembersToInvite);
    setTimeout(function () {
      this.inviteUsersModal.hide();
    }.bind(this), 1000);

  }

}
