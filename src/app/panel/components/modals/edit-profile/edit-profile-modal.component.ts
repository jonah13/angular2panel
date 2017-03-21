import {Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDirective} from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/panel/edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {
  @ViewChild('editModal') public editModal:ModalDirective;
  protected img_temp:string = '';
  protected error:string = '';
  protected confirm_password:string = '';
  @Input('user_temp') user_temp:any;
  @Input('user') user:any;
  @Input('firstTimeLogin') firstTimeLogin:boolean = false;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
    this.img_temp = this.user.ProfilePic;
  }

  public trigger(open = true):void {
    this.error = '';
    if (open) {
      this.editModal.show();
    } else {
      this.editModal.hide();
    }
  }

  resetForm(user = null) {
    if (user) {
      this.user = user;
    }
    this.img_temp = this.user.ProfilePic;
    this.error = '';
    this.user_temp.FullName = this.user.FullName;
    this.user_temp.Password = this.confirm_password = '';
  }

  onImageChange($event) {
    this.user_temp.ProfilePic = $event.target.files[0];
    this.img_temp = URL.createObjectURL(this.user_temp.ProfilePic);
  }

  onSubmit() {
    this.error = '';
    //TODO: add validation, check password and confirm password
    if (this.confirm_password === this.user_temp.Password) {
      this.formSubmitted.emit(this.user_temp);
    } else {
      this.error = 'passwords do not match or password is too short';
    }
  }

  hideEventHandler() {
    console.log('hideEventHandler');
    console.log(this.user, this.user_temp);
    if (this.user.FullName !== this.user_temp.FullName || this.user_temp.Password) {
      if (confirm('Are you sure you want to leave?')) {
        this.editModal.hide()
      }
      return false;
    }

    this.editModal.hide();
  }

}
