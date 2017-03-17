import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input('group_url') group_url:string = '/team-view';
  @Input('user') user:{};
  @Input('user_temp') user_temp:any[] = [];
}
