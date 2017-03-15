import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-comment-popover',
  templateUrl: './comment-popover.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../../assets/styles/components/popover.components.scss',]
})
export class CommentPopoverComponent {
  @Input('title') title: string = 'Description';
  @Input('comment') comment: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate';
  @Output() confirmClicked = new EventEmitter<void>();

  onConfirmClicked():boolean {
    this.confirmClicked.emit();
    return false;
  }

}
