import {Component, ViewEncapsulation} from '@angular/core';
import {TitleService} from "../../../services/helpers/title.service";

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/styles/pages/team-view.component.scss', '../../../../assets/styles/pages/after-login.scss', '../../../../assets/styles/components/panel/sidebar.component.scss']
})
export class TeamViewComponent {

  /**
   * Injecting needed services
   * @param pageTitle
   */
  constructor(private pageTitle:TitleService) {
  }

}
