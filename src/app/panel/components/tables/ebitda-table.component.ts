import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'app-ebitda-table',
  templateUrl: './ebitda-table.component.html',
  encapsulation: ViewEncapsulation.None,
  //styleUrls: ['../../../../assets/styles/components/panel/sidebar.component.scss']
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

    console.log(this.content);

  }

  private getTableData():Array<string[]> {

    return [
      ['1', 'Implement', 'Incremental Salaries', '-$45', '-$30', '-$27', '-$45', '-$40', '-$20', '10 U', '33%U', 'CFO confirmed projections'],
      ['2', 'Design', 'Sublet Culver Office', '$300', '$400', '$500', '$500', '$550', '$600', '150 F', '38%F', ''],
      ['3', '', '', '', '', '', '', '', '', '0', '', ''],
      ['4', '', '', '', '', '', '', '', '', '0', '', '3 of 10 will not relo'],
      ['5', '', '', '', '', '', '', '', '', '0', '', ''],
      ['Unplnd', '', '', '', '', '', '', '', '', '-', '--', '3 of the team will not relo; need to recruit'],
    ];
  }
}
