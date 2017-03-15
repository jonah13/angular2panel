import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss']
})
export class InviteUsersModalComponent {
  @ViewChild('inviteUsersModal') public inviteUsersModal:ModalDirective;

  public trigger(open = true):void {
    if (open) {
      this.inviteUsersModal.show();
    } else {
      this.inviteUsersModal.hide();
    }

  }
}
