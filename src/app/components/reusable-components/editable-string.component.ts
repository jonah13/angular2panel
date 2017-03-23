import {Input, Output, Component, Renderer, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-editable-string',
  templateUrl: './editable-string.component.html',
  encapsulation: ViewEncapsulation.None//,
  //styleUrls: ['../../assets/styles/pages/editable-string.scss']
})
export class EditableStringComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild('textarea') textarea;
  @Input() text:string = '';
  @Input() name:string = 'textarea';
  @Input() placeholder:string = 'Enter some text...';
  @Output() changed = new EventEmitter<string>();

  constructor(private _renderer:Renderer) {
  }

  ngAfterViewInit() {
    this._adjustHeight();
  }

  ngAfterViewChecked() {
    this._adjustHeight();
  }

  onChange(text:string) {
    this.text = text;
    this.changed.emit(this.text);
    this._adjustHeight();
  }

  onFocus() {
    this._adjustHeight();
  }

  private _adjustHeight() {
    this._renderer.setElementStyle(this.textarea.nativeElement, 'height', '24px');
    this._renderer.setElementStyle(this.textarea.nativeElement, 'height', this.textarea.nativeElement.scrollHeight + 4 + 'px');
  }
}
