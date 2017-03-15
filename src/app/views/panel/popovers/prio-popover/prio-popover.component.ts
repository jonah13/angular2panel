import {Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-prio-popover',
  templateUrl: './prio-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class PrioPopoverComponent {
  @Output() choiceClicked = new EventEmitter<string>();

  onChoiceClicked(type:string):boolean {
    this.choiceClicked.emit(type);
    return false;
  }

}
