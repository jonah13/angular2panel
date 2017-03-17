import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-collapsible-section',
  templateUrl: './collapsible-section.component.html'
})
export class CollapsibleSectionComponent {
  @Input('title') title:string = '';
  @Input('table_only') table_only:boolean = false;
  @Input('graph_only') graph_only:boolean = false;
  protected section_collapsed:boolean = false;

  onExpandCollapseClick(): boolean {
    this.section_collapsed = !this.section_collapsed;
    this.graph_only = false;
    this.table_only = false;
    return false;
  }

  onGraphTableClick(btn:string): boolean {
    if (btn === 'table') {
      if (this.table_only) {
        this.table_only = false;
      } else {
        this.table_only = true;
        this.graph_only = false;
      }
    }
    if (btn === 'graph') {
      if (this.graph_only) {
        this.graph_only = false;
      } else {
        this.graph_only = true;
        this.table_only = false;
      }
    }
    return false;
  }
}
