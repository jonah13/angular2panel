import {Component, Output, Input, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-list-popover',
  templateUrl: './list-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class ListPopoverComponent {
  @Input('items') items:string[] = ['item 1', 'item 2', 'item 3'];
  @Output() choiceClicked = new EventEmitter<string>();

  onChoiceClicked(type:string):boolean {
    this.choiceClicked.emit(type);
    return false;
  }

}
