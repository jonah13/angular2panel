import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ApiService} from '../../services/model/_api.service';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../services/http/http.service';

@Injectable()
export class OrganizationApiService extends ApiService {
  /**
   * The kind-specific endpionts list.
   * For example, 'users:create'
   */
  endpoints: Endpoint = {
    multiPartCreate: {uri: 'UserDetails/AdminSetUp', verb: 'post'}
  };

  /**
   * The kind-specific error endpoint.
   * Used with the base API class to register error handlers.
   */
  err: string = 'organizations:error';

  /**
   * The kind-specific string.
   * For example, 'users'
   */
  kind: string = 'organizations';

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
}
