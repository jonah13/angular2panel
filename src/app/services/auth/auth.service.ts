import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {HttpService} from '../http/http.service';
import {UserApiService} from '../../models/user/user.api.service';
import {Observable} from 'rxjs/Observable';
import {AuthInfoService} from './auth.info.service';

@Injectable()
export class AuthService {

  /**
   *
   * @param _httpService
   * @param _userApiService
   * @param _authInfoService
   */
  constructor(
    private _httpService: HttpService,
    private _userApiService: UserApiService,
    private _authInfoService: AuthInfoService) {
  }

  /**
   * get the access token by email and password
   * @param email
   * @param password
   * @returns {Observable<R>}
   */
  getToken(email, password): Observable<any> {
    this._authInfoService.clearSession();

    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    return this._httpService
      .post(this._userApiService.endpoints.token.uri, JSON.stringify({username: email, password}), {headers})
      .map(res => {
        if (res['access_token']) {
          this._authInfoService.setAuthToken(res['access_token']);
          return;
        } else {
          console.log(res);
          return {error: 'Authentication failed, please double check that your email and password are correct.'};
        }
      });
  }
  /**
   * Login the user by email and password (and access token from LS)
   * @param email
   * @param password
   * @returns {Observable<>}
   */
  login(email, password): Observable<any> {
    return this._httpService
      .post(this._userApiService.endpoints.login.uri, JSON.stringify({Email: email, password}))
      .map(res => {
        if (res && res['User_ID'] && res['User_Role']) {
          let user = {user_ID: res['User_ID'], user_Role: res['User_Role']};
          this._authInfoService.setCurrentUser(JSON.stringify(user));
          return;
        } else {
          let error = res['ResponseMessage'] || 'user_ID and user_Role were not returned as part of the response object';
          return {error: error};
        }
      });
  }

  /**
   * Logouts the user by clearing the tokens
   */
  logout(): void {
    this._authInfoService.clearSession();
    //TODO: Once a logout api is implemented, uncomment and test the code below
    /*
    let authToken = this._authInfoService.getAuthBearer();
    let headers = new Headers();
    headers.append('Authorization', authToken);
    this._httpService.get(
      this._userApiService.endpoints.logout.uri,
      {headers}
    ).subscribe(response => {
      this._authInfoService.clearSession();
    });
    */
  }
}
