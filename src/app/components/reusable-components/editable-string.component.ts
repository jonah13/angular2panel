import {Input, Output, Component, Renderer, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-editable-string',
  templateUrl: './editable-string.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../assets/styles/components/reusable-components/editable-string.scss']
})
export class EditableStringComponent {

  @ViewChild('input') input;
  @Input() text:string = '';
  @Input() name:string = 'input';
  @Input() placeholder:string = '';
  @Output() changed = new EventEmitter<string>();

  constructor(private _renderer:Renderer) {
  }

  onChange(text:string) {
    this.text = text;
    this.changed.emit(this.text);
    //this._renderer.setElementStyle(this.input.nativeElement, 'width', (this.text.length + 1) + 'px');
  }

  onFocus() {
  }

}
