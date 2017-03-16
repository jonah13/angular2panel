import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {RequestPasswordResetComponent} from './views/reset-password/request-password-reset.component';
import {CreateNewPasswordComponent} from './views/reset-password/create-new-password.component';
import {AboutComponent} from './views/about/about.component';
import {HelpComponent} from './views/help/help.component';
import {ContactComponent} from './views/contact/contact.component';
import {PanelComponent} from './views/panel/panel.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {GroupListComponent} from "./views/panel/group-list/group-list.component";

const appRoutes:Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  //TODO: MOVE INTO CHILD ROUTER UNDER A CHILD MODULE FOR THE PANEL
  {
    path: 'panel',
    canActivate: [AuthGuardService],
    component: PanelComponent
  },
  {
    path: 'group-list',
    canActivate: [AuthGuardService],
    component: GroupListComponent
  },
  {
    path: 'request-password-reset',
    component: RequestPasswordResetComponent
  },
  {
    path: 'create-new-password',
    component: CreateNewPasswordComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

export const appRoutingProviders:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
