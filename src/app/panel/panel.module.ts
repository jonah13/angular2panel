import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

//third party
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { RatingModule } from 'ng2-bootstrap/rating';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { AngularSplitModule } from 'angular-split';

//services
import {OrganizationApiService} from '../models/organization/organization.api.service';
import {OrganizationModelService} from '../models/organization/organization.model.service';
import {TeamMemberModelService} from "../models/team-member/team-member.model.service";
import {TeamMemberApiService} from "../models/team-member/team-member.api.service";
import {ElementsModelService} from '../models/elements/elements.model.service';

//Pipes
import {TruncatePipe} from './pipes/truncate.pipe';

//components
import {PanelComponent} from './panel.component';
import {TeamViewComponent} from "./views/team-view/team-view.component";

import {PanelSidebarComponent} from './components/sidebar/panel-sidebar.component';
import {EditProfileModalComponent} from './components/modals/edit-profile/edit-profile-modal.component';
import {CollapsibleSectionComponent} from './components/collapsible-section/collapsible-section.component';
import {ButtonsPopoverComponent} from './components/popovers/buttons-popover/buttons-popover.component';
import {SettingsPopoverComponent} from './components/popovers/settings-popover/settings-popover.component';
import {RevisionsPopoverComponent} from './components/popovers/revisions-popover/revisions-popover.component';
import {NotificationsPopoverComponent} from './components/popovers/notifications-popover/notifications-popover.component';
import {InviteUsersModalComponent} from "./components/modals/invite-users/invite-users-modal.component";
import {AddOrganizationModalComponent} from "./components/modals/add-organization/add-organization-modal.component";
import {CalendarPopoverComponent} from './components/popovers/calendar-popover/calendar-popover.component';
import {PrioPopoverComponent} from './components/popovers/prio-popover/prio-popover.component';
import {SelectUserPopoverComponent} from './components/popovers/select-user-popover/select-user-popover.component';
import {CommentPopoverComponent} from './components/popovers/comment-popover/comment-popover.component';
import {ListPopoverComponent} from "./components/popovers/list-popover/list-popover.component";
import {HeaderComponent} from "./components/header/header.component";
import {OrganizationsHeaderComponent} from "./components/organizations-header/organizations-header.component";
import {ColorsSchemeComponent} from './components/colors-scheme/colors-scheme.component';
import {EditableTableComponent} from "../components/reusable-components/editable-table.component";
import {EditableStringComponent} from "../components/reusable-components/editable-string.component";

@NgModule({
  declarations: [
    PanelComponent,
    TeamViewComponent,
    PanelSidebarComponent,
    EditProfileModalComponent,
    CollapsibleSectionComponent,
    ButtonsPopoverComponent,
    RevisionsPopoverComponent,
    NotificationsPopoverComponent,
    SettingsPopoverComponent,
    CalendarPopoverComponent,
    SelectUserPopoverComponent,
    CommentPopoverComponent,
    PrioPopoverComponent,
    ListPopoverComponent,
    InviteUsersModalComponent,
    AddOrganizationModalComponent,
    HeaderComponent,
    OrganizationsHeaderComponent,
    ColorsSchemeComponent,
    TruncatePipe,
    EditableTableComponent,
    EditableStringComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularSplitModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    RatingModule.forRoot(),
    DatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    OrganizationApiService,
    OrganizationModelService,
    TeamMemberApiService,
    TeamMemberModelService,
    ElementsModelService
  ],
  exports: [PanelComponent]
})
export class PanelModule {
}

