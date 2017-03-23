import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'app-ebitda-table',
  templateUrl: './ebitda-table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EbitdaTableComponent implements OnInit {
  @Input() rowsNumber:number = 1;
  @Input() data:Array<string[]> = [];

  content:Array<{text:string}[]> = [];

  constructor() {

  }

  ngOnInit():void {
    this.data = this.getTableData();

    if (this.data.length > 0) {
      this.rowsNumber = this.data.length - 1;

      for (let i = 1; i < this.rowsNumber + 1; i++) {
        let row:{text:string}[] = [];
        row = this.data[i].map((data, j) => {
          return {text: this.data[i][j]};
        });
        this.content.push(row);
      }
    } else {
      for (let i = 0; i < this.rowsNumber; i++) {
        let temp:{text:string}[] = [];
        this.content.push(temp);
      }
    }
  }

  private getTableData():Array<string[]> {

    return [['aa', 'bb'], ['cc', 'dd']];
  }
}
