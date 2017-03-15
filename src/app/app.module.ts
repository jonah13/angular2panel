import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';

//third party
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { RatingModule } from 'ng2-bootstrap/rating';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import {SplitPaneModule} from "ng2-split-pane/lib/ng2-split-pane";

//services
import {TitleService} from './services/helpers/title.service';
import {UserModelService} from './models/user/user.model.service';
import {UserApiService} from './models/user/user.api.service';
import {LocalStorageService} from './services/storage/storage.service';
import {HttpService} from './services/http/http.service';
import {AuthService} from './services/auth/auth.service';
import {AuthInfoService} from './services/auth/auth.info.service';
import {AuthGuardService} from './services/auth/auth-guard.service';

//components
import { AppComponent } from './app.component';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

import {LoginComponent} from './views/login/login.component';
import {RequestPasswordResetComponent} from './views/reset-password/request-password-reset.component';
import {CreateNewPasswordComponent} from './views/reset-password/create-new-password.component';
import {AboutComponent} from './views/about/about.component';
import {HelpComponent} from './views/help/help.component';
import {ContactComponent} from './views/contact/contact.component';
import {PanelComponent} from './views/panel/panel.component';
import {PanelSidebarComponent} from './views/panel/wrapper/sidebar/panel-sidebar.component';
import {EditProfileModalComponent} from './views/panel/modals/edit-profile/edit-profile-modal.component';
import {CollapsibleSectionComponent} from './views/panel/components/collapsible-section/collapsible-section.component';
import {ButtonsPopoverComponent} from './views/panel/popovers/buttons-popover/buttons-popover.component';
import {SettingsPopoverComponent} from './views/panel/popovers/settings-popover/settings-popover.component';
import {RevisionsPopoverComponent} from './views/panel/popovers/revisions-popover/revisions-popover.component';
import {NotificationsPopoverComponent} from './views/panel/popovers/notifications-popover/notifications-popover.component';
import {GroupListComponent} from "./views/panel/group-list/group-list.component";
import {InviteUsersModalComponent} from "./views/panel/modals/invite-users/invite-users-modal.component";
import {AddOrganizationModalModalComponent} from "./views/panel/modals/add-organization/add-organization-modal.component";
import {CalendarPopoverComponent} from './views/panel/popovers/calendar-popover/calendar-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RequestPasswordResetComponent,
    CreateNewPasswordComponent,
    AboutComponent,
    HelpComponent,
    ContactComponent,
    PanelComponent,
    PanelSidebarComponent,
    EditProfileModalComponent,
    CollapsibleSectionComponent,
    ButtonsPopoverComponent,
    RevisionsPopoverComponent,
    NotificationsPopoverComponent,
    SettingsPopoverComponent,
    CalendarPopoverComponent,
    GroupListComponent,
    InviteUsersModalComponent,
    AddOrganizationModalModalComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    RatingModule.forRoot(),
    DatepickerModule.forRoot(),
    SplitPaneModule
  ],
  providers: [
    appRoutingProviders,
    TitleService,
    AuthInfoService,
    AuthService,
    AuthGuardService,
    HttpService,
    LocalStorageService,
    UserApiService,
    UserModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
