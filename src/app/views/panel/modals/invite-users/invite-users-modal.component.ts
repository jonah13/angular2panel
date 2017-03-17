import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';
import {TeamMember} from "../../../../models/team-member/team-member.interface";

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss', '../../../../../assets/styles/components/panel/invite-users-modal.component.scss']
})
export class InviteUsersModalComponent implements OnInit {
  protected teamMembersToInvite:TeamMember[] = [];
  @ViewChild('inviteUsersModal') public inviteUsersModal:ModalDirective;

  public trigger(open = true):void {
    if (open) {
      this.inviteUsersModal.show();
    } else {
      this.inviteUsersModal.hide();
    }

  }

  ngOnInit() {
    this.addNewTeamMemberToInvite();
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
