import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-add-organization-modal',
  templateUrl: './add-organization-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss']
})
export class AddOrganizationModalModalComponent {
  @ViewChild('addOrganizationModal') public addOrganizationModal:ModalDirective;

  public trigger(open = true):void {
    console.info('trigger', this.addOrganizationModal);
    if (open) {
      this.addOrganizationModal.show();
    } else {
      this.addOrganizationModal.hide();
    }

  }
}
