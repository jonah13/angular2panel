import {TeamMember} from './team-member.interface';
import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ModelService} from '../../services/model/_model.service';
import {TeamMemberApiService} from './team-member.api.service';
import {Observable} from 'rxjs/Observable';
import {ObjectUtils} from '../../shared/utils/object.utils';

@Injectable()
export class TeamMemberModelService extends ModelService {
  /**
   * Registers the observer with public `observer$` property.
   * Then the components, for example, 'ConversationListComponent',
   *   consumes this observer for listening to Model changes.
   */
  observer$:Observable<Array<TeamMember>>;

  /**
   * Reference to available API endpoints from kind-specific API service.
   * Used with the base class to factory-out endpoints for each CRUD operation.
   */
  protected _APIEndpoints:Endpoint;

  /**
   * The private observer holder, stores the observer for later use.
   */
  protected _observer:any;

  /**
   * The private data store, stores the retrieved messages for later use.
   */
  protected _dataStore:TeamMember[] = [];

  /**
   * The TeamMemberModel service constructor function, invokes the base Model.
   */
  constructor(protected _api:TeamMemberApiService) {
    super(_api);
  }

  /**
   * Subscribes with given handlers.
   */
  subscribe(success:any, error:any) {
    this._api.resetObserver();
    this._api.observer$.subscribe(success, error);
  }

  /**
   * list all team members
   * @param userData
   */
  listAll() {
    this._api.listAll();
  }

}
