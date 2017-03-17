import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-buttons-popover',
  templateUrl: './buttons-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class ButtonsPopoverComponent {
  @Input('confirm_text') confirm_text: string = 'CONFIRM CHANGES';
  @Input('cancel_text') cancel_text: string = 'CANCEL CHANGES';
  @Output() confirmClicked = new EventEmitter<void>();

  onConfirmClicked():boolean {
    this.confirmClicked.emit();
    return false;
  }

}
