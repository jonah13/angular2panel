import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';
import {TeamMember} from "../../../../models/team-member/team-member.interface";
import {AuthInfoService} from "../../../../services/auth/auth.info.service";

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss', '../../../../../assets/styles/components/panel/invite-users-modal.component.scss']
})
export class InviteUsersModalComponent implements OnInit {
  @ViewChild('inviteUsersModal') public inviteUsersModal:ModalDirective;
  protected teamMembersToInvite:TeamMember[] = [];
  protected user_ID:number;
  protected user:any;

  /**
   * @param _authInfoService
   */
  constructor(private _authInfoService:AuthInfoService) {
  }

  ngOnInit() {
    this.addNewTeamMemberToInvite();

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

  addNewTeamMemberToInvite() {
    this.teamMembersToInvite.push({
      fullName: '',
      titleRole: '',
      email: '',
      permissionGroup: 'Administrator'
    });
  }

  deleteTeamMemberToInvite(index) {
    this.teamMembersToInvite.splice(index, 1);
  }

  sendInvites() {
    console.log('sendInvites', JSON.stringify(this.teamMembersToInvite));
  }

}
