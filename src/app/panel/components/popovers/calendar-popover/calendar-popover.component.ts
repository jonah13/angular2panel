import {Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-calendar-popover',
  templateUrl: './calendar-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class CalendarPopoverComponent {
  @Output() confirmClicked = new EventEmitter<void>();
  public dt: Date = new Date();

  onConfirmClicked():boolean {
    this.confirmClicked.emit();
    return false;
  }

}
