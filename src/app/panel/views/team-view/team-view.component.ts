import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TeamMemberModelService} from "../../../models/team-member/team-member.model.service";
import {TeamMember} from "../../../models/team-member/team-member.interface";

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/styles/pages/team-view.component.scss', '../../../../assets/styles/pages/after-login.scss', '../../../../assets/styles/components/panel/sidebar.component.scss']
})
export class TeamViewComponent implements OnInit {
  protected teamMembers:TeamMember[] = [];

  /**
   * Injecting needed services
   * @param pageTitle
   */
  constructor(private _teamMemberModelService:TeamMemberModelService) {
  }

  ngOnInit() {
    this._teamMemberModelService.observer$.subscribe(result => this._subscribe(result));
    this._teamMemberModelService.listAll();
  }

  private _subscribe(result:any) {
    this.teamMembers = result.MemberDetails;
  }
}
