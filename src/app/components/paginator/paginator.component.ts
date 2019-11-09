import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input()
  total: number;

  @Input()
  currentPage: number = 1;

  @Input()
  size: number = 5;

  @Output()
  changePageEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {
      this.total = changes.total.currentValue;
    } else if (changes['currentPage']) {
      this.currentPage = changes.currentPage.currentValue;
    }
  }
  changePage(page: number) {
    this.changePageEvent.emit(page);
  }

  ngOnInit() {
  }

}
