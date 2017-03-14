import {User} from './user.interface';
import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ModelService} from '../../services/model/_model.service';
import {UserApiService} from './user.api.service';
import {Observable} from 'rxjs/Observable';
import {ObjectUtils} from '../../shared/utils/object.utils';

@Injectable()
export class UserModelService extends ModelService {
  /**
   * Registers the observer with public `observer$` property.
   * Then the components, for example, 'ConversationListComponent',
   *   consumes this observer for listening to Model changes.
   */
  observer$: Observable<Array<User>>;

  /**
   * Reference to available API endpoints from kind-specific API service.
   * Used with the base class to factory-out endpoints for each CRUD operation.
   */
  protected _APIEndpoints: Endpoint;

  /**
   * The private observer holder, stores the observer for later use.
   */
  protected _observer: any;

  /**
   * The private data store, stores the retrieved messages for later use.
   */
  protected _dataStore: User[] = [];

  /**
   * The UserModel service constructor function, invokes the base Model.
   */
  constructor(protected _api: UserApiService) {
    super(_api);
  }

  /**
   * Subscribes with given handlers.
   */
  subscribe(success: any, error: any) {
    this._api.resetObserver();
    this._api.observer$.subscribe(success, error);
  }

  /**
   * sends contact form
   * @param payload
   */
  contact(payload) {
    return this._api.contact(payload);
  }

  /**
   * initiates sending an email to reset the user's password
   * @param payload
   */
  resetPassword(payload) {
    return this._api.resetPassword(payload);
  }

  /**
   * updates the user's password
   * @param payload
   */
  changePassword(payload) {
    return this._api.changePassword(payload);
  }

  /**
   * get user details by ID
   * @param id
   */
  getById(id) {
    return this._api.getById(id);
  }

  /**
   * update user
   * @param userData
   */
  updateUser(userData) {
    let formData = new FormData();
    ObjectUtils.forEach(userData, (value, key) => {
      formData.append(key, value);
    });
    this._api.multiPartCreate(formData);
  }
}
