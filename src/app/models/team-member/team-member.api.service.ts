import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ApiService} from '../../services/model/_api.service';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../services/http/http.service';

@Injectable()
export class TeamMemberApiService extends ApiService {
  /**
   * The kind-specific endpionts list.
   * For example, 'team-members:create'
   */
  endpoints:Endpoint = {
    create: {uri: 'Team/AddMember', verb: 'post'},
    listAll: {uri: 'Team/GetAllMembers', verb: 'post'},
    listAllByOrganizationId: {uri: 'Team/GetAllMembersByID', verb: 'post'},
  };

  /**
   * The kind-specific error endpoint.
   * Used with the base API class to register error handlers.
   */
  err:string = 'team-members:error';

  /**
   * The kind-specific string.
   * For example, 'team-members'
   */
  kind:string = 'team-members';

  /**
   * Registers the observer with public `observer$` property.
   * Then the kind-specific model service, for example, 'TeamMemberModel',
   * consumes this observer for listening to API changes.
   */
  observer$:Observable<Array<any>>;

  /**
   * The TeamMember API service constructor function, invoked by base classes.
   */
  constructor(protected _http:HttpService) {
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
   * list All.
   */
  listAll() {
    this._httpService.post(this.endpoints.listAll.uri,
        '', false)
        .subscribe((data) => this._observer.next(data),
            err => this._observer.error(err));
  }

  /**
   * list All By Organization Id
   */
  listAllByOrganizationId(params) {
    this._httpService.post(this.endpoints.listAllByOrganizationId.uri,
        params, false)
        .subscribe((data) => this._observer.next(data),
            err => this._observer.error(err));
  }


}
