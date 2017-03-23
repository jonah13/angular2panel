import {Injectable} from '@angular/core';
import {CONFIG} from '../../shared/config';
import {Http, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthInfoService} from '../auth/auth.info.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  private baseUri: String;

  /**
   * The kind-specific endpionts list.
   * For example, 'messages:create'.
   */
  constructor(private _http: Http,
              private _authInfoService: AuthInfoService) {
    this.baseUri = CONFIG.URI.BASE;
  }

  /**
   * Sets the auth header by default if any RequestOptionArgs is not defined
   * @param options
   * @returns {{headers: (Headers|{})}|RequestOptionsArgs}
   */
  requestOptionsArgs(options?: RequestOptionsArgs): any {
    let headers = this._authInfoService.getAuthHeaders();
    return _.isEmpty(options) ? {headers} : options;
  }

  /**
   * Sends a get request.
   * @param uri
   * @param options
   * @returns {Observable<R>}
   */
  get(uri: string, options?: RequestOptionsArgs): Observable<any> {
    return this._http.get(this.endPointFullUrl(uri), this.requestOptionsArgs(options))
      .map(response => {
        try {
          return response.json();
        } catch (err) {
          /*In case if response body is empty, 200 response code also invokes
           error handlers as empty 'response.json()' throws exception.
           This way an undefined object is returned as the response object
           which can easily be handled in the success observers down the chain.
           */
        }
      });
  }

  /**
   * Sends a post request.
   * @param uri
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  post(uri: string, body: string, options?: RequestOptionsArgs, custom_url = ''): Observable<any> {
    let url = this.endPointFullUrl(uri);
    if (custom_url) {
      url = CONFIG.URI.NEW.concat(uri);
    }
    return this._http.post(url, body, this.requestOptionsArgs(options))
      .map(response => {
        try {
          return response.json();
        } catch (err) {
          /*In case if response body is empty, 200 response code also invokes
           error handlers as empty 'response.json()' throws exception.
           This way an undefined is returned as the response object
           which can easily be handled in the success observers down the chain.
           */
        }
      });
  }

  /**
   *
   * @param uri
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  put(uri: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this._http.put(this.endPointFullUrl(uri), body, this.requestOptionsArgs(options))
      .map(response => {
        try {
          return response.json();
        } catch (err) {
          /* In case if response body is empty, 200 response code also invokes
           error handlers as empty 'response.json()' throws exception.
           This way an undefined object is returned as the response object
           which can easily be handled in the success observers down the chain.
           */
        }
      });
  }

  /**
   * @param uri
   * @param options
   * @returns {Observable<R>}
   */
  destroy(uri: string, options?: RequestOptionsArgs): Observable<any> {
    return this._http.delete(this.endPointFullUrl(uri), this.requestOptionsArgs(options))
      .map(response => response.json());
  }

  /**
   * Sends a multipart post request.
   * @param uri
   * @param formData
   * @returns {Promise<T>|Promise}
   */
  multiPartPost(uri:string, formData:FormData):Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', this.endPointFullUrl(uri), true);
      xhr.setRequestHeader('Authorization', this._authInfoService.getAuthBearer());
      xhr.send(formData);
    });
  }

  /**
   * Sends a multipart put request.
   * @param uri
   * @param formData
   * @returns {Promise<T>|Promise}
   */
  multiPartPut(uri:string, formData:FormData):Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('PUT', this.endPointFullUrl(uri), true);
      xhr.setRequestHeader('Authorization', this._authInfoService.getAuthBearer());
      xhr.send(formData);
    });
  }

  /**
   * concatenates the uri with baseUri
   * @param uri
   * @returns {string}
   */
  endPointFullUrl(uri: string): string {
    return this.baseUri.concat(uri);
  }
}
