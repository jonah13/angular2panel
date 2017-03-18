import {Component, Output, EventEmitter, ViewEncapsulation, OnInit} from '@angular/core';
import {AuthInfoService} from '../../../../services/auth/auth.info.service';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class SettingsPopoverComponent implements OnInit {
  @Output() addOrganizationClicked = new EventEmitter<void>();
  @Output() confirmClicked = new EventEmitter<void>();
  protected user:any;

  /**
   * Injecting needed services
   * @param _authInfoService
   */
  constructor(private _authInfoService: AuthInfoService) {
  }

  /**
   * on init actions
   */
  ngOnInit() {
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
    } catch (err) {
      console.log(err);
    }
  }

  onConfirmClicked():boolean {
    this.confirmClicked.emit();
    return false;
  }

  onClickAddOrganization(): boolean {
    this.addOrganizationClicked.emit();
    return false;
  }

}
