import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ApiService} from '../../services/model/_api.service';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../services/http/http.service';
import {CONFIG} from '../../shared/config';

@Injectable()
export class UserApiService extends ApiService {
  /**
   * The kind-specific endpionts list.
   * For example, 'users:create'
   */
  endpoints: Endpoint = {
    token: {uri: 'UserDetails/TokenAccess', verb: 'post'},
    login: {uri: 'UserDetails/UserLogin', verb: 'post'},
    multiPartCreate: {uri: 'UserDetails/UpdateUser', verb: 'post'},
    contact: {uri: 'UserDetails/Contact', verb: 'post'},
    getById: {uri: 'UserDetails/GetUserByID', verb: 'post'},
    resetPassword: {uri: 'UserDetails/Forgotpassword', verb: 'post'},
    changePassword: {uri: 'UserDetails/ChangePassword', verb: 'post'}
  };

  /**
   * The kind-specific error endpoint.
   * Used with the base API class to register error handlers.
   */
  err: string = 'users:error';

  /**
   * The kind-specific string.
   * For example, 'users'
   */
  kind: string = 'users';

  /**
   * Registers the observer with public `observer$` property.
   * Then the kind-specific model service, for example, 'UserModel',
   * consumes this observer for listening to API changes.
   */
  observer$: Observable<Array<any>>;

  /**
   * The User API service constructor function, invoked by base classes.
   */
  constructor(protected _http: HttpService) {
    super(_http);
    this.resetObserver();
  }

  /**
   * Resets the api's observers.
   */
  resetObserver() {
    this.observer$ = new Observable(observer =>
      this._observer = observer).share();
  }

  /**
   * Hits the endpoint to send contact form.
   */
  contact(payload) {
    this._httpService.post(this.endpoints.contact.uri,
      JSON.stringify(payload))
      .subscribe((data) => this._observer.next(data),
        err => this._observer.error(err));
  }

  /**
   * Hits the endpoint to send reset user password email.
   */
  resetPassword(payload) {
    this._httpService.post(this.endpoints.resetPassword.uri,
      JSON.stringify(payload), false, CONFIG.URI.NEW)
      .subscribe((data) => this._observer.next(data),
        err => this._observer.error(err));
  }

  /**
   * Hits the endpoint to update user password.
   */
  changePassword(payload) {
    this._httpService.post(this.endpoints.changePassword.uri,
      JSON.stringify(payload), false, CONFIG.URI.NEW)
      .subscribe((data) => this._observer.next(data),
        err => this._observer.error(err));
  }

  /**
   * get user by Id.
   */
  getById(Id) {
    this._httpService.post(this.endpoints.getById.uri,
      JSON.stringify({UserID:Id}), false)
      .subscribe((data) => this._observer.next(data),
        err => this._observer.error(err));
  }

}
