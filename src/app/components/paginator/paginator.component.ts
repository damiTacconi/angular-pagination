import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { PaginatorSettings } from 'src/app/models/paginator-settings';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input()
  paginatorSettings: PaginatorSettings;

  @Output()
  changePageEvent = new EventEmitter<number>();

  private numbers = [];

  private range = [];

  private shortcuts = 0;

  constructor() {
  }

  updateRange() {
    //START
    if (this.paginatorSettings.currentPage <= this.paginatorSettings.range) { //5
      this.range = [...this.numbers].slice(0, this.paginatorSettings.range * 2 + (this.shortcuts || 1)); //0,10
      //END
    } else if (this.paginatorSettings.currentPage + this.paginatorSettings.range + this.shortcuts + 1 > this.paginatorSettings.total) {//6
      this.range = [...this.numbers].slice(this.paginatorSettings.total - (this.paginatorSettings.range * 2 + (this.shortcuts || 1)), this.paginatorSettings.total)//10
      //MIDDLE
    } else {
      this.range = [...this.numbers].slice(this.paginatorSettings.currentPage - this.paginatorSettings.range, this.paginatorSettings.currentPage + this.paginatorSettings.range + 1);//4,5
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginatorSettings']) {
      const paginator = changes.paginatorSettings.currentValue;
      this.paginatorSettings.total = Math.ceil(paginator.total / paginator.pageSize);
      for (let i = 1; i <= paginator.total; i++)this.numbers.push(i);
      this.updateRange();
    }
  }

  previous() {
    this.changePage(this.paginatorSettings.currentPage - 1);
  }
  next() {
    this.changePage(this.paginatorSettings.currentPage + 1)
  }

  changePage(page: number) {
    this.changePageEvent.emit(page);
  }

  ngOnInit() {
    this.shortcuts = this.paginatorSettings.withShortcuts ? 2 : 0;
    this.updateRange();
  }

}
