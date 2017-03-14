import {Observable} from 'rxjs/Observable';

export interface HttpUri {
  uri: string;
  verb: string;
}

export interface Endpoint {
  list?: HttpUri;
  create?: HttpUri;
  update?: HttpUri;
  destroy?: HttpUri;
  logout?: HttpUri;
  token?: HttpUri;
  login?: HttpUri;
  contact?: HttpUri;
  getById?: HttpUri;
  updateUser?: HttpUri;
  resetPassword?: HttpUri;
  changePassword?: HttpUri;
  multiPartCreate?: HttpUri;
  multiPartUpdate?: HttpUri;
  verify?: HttpUri;
  view?: HttpUri;
  query?: HttpUri;
}

export interface AuthToken {
  token: string;
}

export interface ApiServiceInterface {
  endpoints: Endpoint;
  observer$: Observable<Array<any>>;
  list?(obj: any): void;
  create?(obj: any): void;
  update?(obj: any): void;
  destroy?(id:any, obj: any): void;
  view?(id:any, obj: any): void;
  query?(params:any):void;
}

export interface Token {
  token: string;
  type: string;
  expiresIn: number;
}
