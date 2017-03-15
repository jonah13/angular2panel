import {Component, ViewEncapsulation} from '@angular/core';
import {TitleService} from "../../../services/helpers/title.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/styles/pages/group-list.component.scss', '../../../../assets/styles/pages/after-login.scss', '../../../../assets/styles/components/panel/sidebar.component.scss']
})
export class GroupListComponent {

  /**
   * Injecting needed services
   * @param pageTitle
   */
  constructor(private pageTitle:TitleService) {
  }
  
}
