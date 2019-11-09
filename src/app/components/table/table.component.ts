import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  Object = Object;

  @Input()
  items = new Array();

  @Input()
  currentPage: number;

  @Input()
  total: number;

  @Output()
  changePageEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {
      this.total = changes.total.currentValue;
    } else if (changes['currentPage']) {
      this.currentPage = changes.currentPage.currentValue;
    } else if (changes['items']) {
      this.items = changes.items.currentValue;
    }
  }

  changePage(page: number) {

    this.changePageEvent.emit(page);
  }

  ngOnInit() {

  }

}
