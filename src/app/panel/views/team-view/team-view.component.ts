import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TeamMemberModelService} from "../../../models/team-member/team-member.model.service";
import {TeamMember} from "../../../models/team-member/team-member.interface";
import {ElementsModelService} from '../../../models/elements/elements.model.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/styles/pages/team-view.component.scss', '../../../../assets/styles/pages/after-login.scss', '../../../../assets/styles/components/panel/sidebar.component.scss']
})
export class TeamViewComponent implements OnInit {
  protected teamMembers:TeamMember[] = [];
  protected filteredTeamMembers:TeamMember[] = [];
  protected elements:any[];
  protected selectedGroup:string = 'All Participants';
  protected organization_ID:number;

  /**
   * Injecting needed services
   * @param pageTitle
   */
  constructor(private _teamMemberModelService:TeamMemberModelService,
              private _elementsModuleService:ElementsModelService,
              private _router:Router) {
  }

  ngOnInit() {
    this._teamMemberModelService.listAll();
    this._teamMemberModelService.observer$.subscribe(result => this._subscribe(result));
    this.elements = this._elementsModuleService.getElements();
  }

  private _subscribe(result:any) {
    if (typeof result.RegisteredUserResponse !== "undefined") {
      // a member was added
      this._teamMemberModelService.listAll();
    } else if (typeof result.MemberDetails !== "undefined") {
      // we retrieve the list of all members
      this.teamMembers = result.MemberDetails ? result.MemberDetails : [];
      //this.filterTeamMembersByOrganizationId();
      this.filteredTeamMembers = this.teamMembers.slice(0);
      this.selectedGroup = 'All Participants';
    }
  }

  private countByRole(role):string {

    if (role === 'All Participants') {
      let count = this.teamMembers.length;
      return count + ' User' + (count === 1 ? '' : 's');
    }

    let count = this.teamMembers.filter(function (value) {
      return value.PermissionGroup === role;
    }).length;

    return count + ' User' + (count === 1 ? '' : 's');
  }

  private changeRoleFilter(role) {
    this.selectedGroup = role;

    if (role === 'All Participants') {
      this.filteredTeamMembers = this.teamMembers.slice(0);
    } else {
      this.filteredTeamMembers = this.teamMembers.filter(function (value) {
        return value.PermissionGroup === role;
      });
    }
  }

  private organizationChangedHandler(organization) {
    this.organization_ID = organization.ID;
    //this.filterTeamMembersByOrganizationId();
    //this._teamMemberModelService.listAllByOrganizationId(this.organization_ID);
  }

  private filterTeamMembersByOrganizationId() {
    this.teamMembers = this.teamMembers.filter(function (value) {
      return value.organizationId == this.organization_ID;
    });
  }

}
