import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ElementsModelService} from '../../../models/elements/elements.model.service';

@Component({
  selector: 'app-panel-sidebar',
  templateUrl: './panel-sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../../assets/styles/components/panel/sidebar.component.scss']
})
export class PanelSidebarComponent implements OnInit {
  public elements:any[];
  public rate:number = 3;
  public prio_type:string = 'graphical';
  public currentComment:string = '';
  public hierarchy_menu:string[];
  public lead_menu:string[];
  public placeHolder:number[] = Array(30);

  constructor(private _elementsModuleService:ElementsModelService) {
  }

  ngOnInit():void {
    this.placeHolder.fill(1);
    this.elements = this._elementsModuleService.getElements();
    this.hierarchy_menu = ['nested order (standard)', 'alphabetical order', 'sort by category'];
    this.lead_menu = ['Sort', 'Filter', 'Select'];
  }

  onExpandCollapseClick(i:number):void {
    if (this.elements[i].state === 'expanded') {
      this.elements[i].state = 'collapsed';
    } else {
      this.elements[i].state = 'expanded';
    }
    let level = this.elements[i].level, j = i + 1;
    while (j < this.elements.length && level < this.elements[j].level) {
      this.elements[j].hide = !this.elements[j].hide;
      j++;
    }
  }

  onClick():boolean {
    return false;
  }
}
