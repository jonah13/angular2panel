import {Component, ViewEncapsulation, Input} from '@angular/core';
@Component({
  selector: 'app-colors-scheme',
  templateUrl: './colors-scheme.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ColorsSchemeComponent {
  @Input('scheme') scheme:string = '';

  getClass():string {
    if (this.scheme.toLowerCase().indexOf('green') !== -1) {
      return 'green';
    }
    return '';
  }
}
