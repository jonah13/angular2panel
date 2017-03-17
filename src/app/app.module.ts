import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';

//services
import {TitleService} from './services/helpers/title.service';
import {UserModelService} from './models/user/user.model.service';
import {UserApiService} from './models/user/user.api.service';
import {LocalStorageService} from './services/storage/storage.service';
import {HttpService} from './services/http/http.service';
import {AuthService} from './services/auth/auth.service';
import {AuthInfoService} from './services/auth/auth.info.service';
import {AuthGuardService} from './services/auth/auth-guard.service';

//panel module
import {PanelModule} from './panel/panel.module';

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
    ContactComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    PanelModule
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

