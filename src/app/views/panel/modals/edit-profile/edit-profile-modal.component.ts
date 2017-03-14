import {Component, ViewEncapsulation, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDirective} from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  @ViewChild('editModal') public editModal:ModalDirective;
  protected img_temp: string = '';
  @Input('user_temp') user_temp: any;
  @Input('user') user: any;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor (private sanitizer: DomSanitizer,) {
  }

  public trigger(open = true):void {
    if (open) {
      this.editModal.show();
    } else {
      this.editModal.hide();
    }

  }

  onImageChange($event) {
    this.user_temp.ProfilePic = $event.target.files[0];
    this.img_temp = URL.createObjectURL(this.user_temp.ProfilePic);
  }

  onSubmit() {
    //TODO: add validation, check password and confirm password
    this.formSubmitted.emit(this.user_temp);
  }
}
