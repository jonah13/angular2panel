import {Component, Output, Input, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class PanelHeaderComponent {
  @Input('group_url') group_url:string = '/group-list';
  @Input('user') user:{};
  @Input('user_temp') user_temp:any[] = [];
  
}
