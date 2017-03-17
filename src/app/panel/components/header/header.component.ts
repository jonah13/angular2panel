import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input('user') user:{} ;

}
