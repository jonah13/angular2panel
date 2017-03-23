import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  organization:any;
  /**
   * Injecting needed services
   * @param _localStorage
   */
  constructor(private _localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.organization = this._localStorage.get('org');
  }
}
