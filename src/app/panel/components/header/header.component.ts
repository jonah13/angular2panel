import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';
import {AuthInfoService} from '../../../services/auth/auth.info.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input('group_url') group_url:string = '/team-view';
  @Input('user') user:any = null;
  @Input('user_temp') user_temp:any[] = [];

  /**
   * Injecting needed services
   * @param _authInfoService
   * @param _authService
   * @param _router
   */
  constructor(private _authInfoService: AuthInfoService,
              private _authService: AuthService,
              private _router: Router) {
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
    console.log(this.user);
  }

  onClickLogout():boolean {
    this._authService.logout();
    this._router.navigate(['/login']);
    return false;
  }

}
