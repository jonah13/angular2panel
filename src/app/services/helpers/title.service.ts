import {Injectable} from '@angular/core';
@Injectable()
export class TitleService {
  private title;

  constructor() {
    this.title = document.title;
  }

  public setTitle(title:string):void {
    document.title = 'Beckway Group | ' + title;
  }
}
