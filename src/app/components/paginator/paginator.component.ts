import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild,
  ElementRef, Renderer2
} from '@angular/core';

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
  size: number = 10;

  @Output()
  changePageEvent = new EventEmitter<number>();

  numbers = [];

  range = [];

  constructor() {
  }

  updateRange() {
    if (this.currentPage < 5) {
      this.range = [...this.numbers].slice(0, 9);
      console.log(this.range);
    } else if (this.currentPage + 5 >= this.total) {
      this.range = [...this.numbers].slice(this.total - 9, this.total)
      console.log(this.range);
    } else {
      this.range = [...this.numbers].slice(this.currentPage - 4, this.currentPage + 5);
      console.log(this.range);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {
      this.total = changes.total.currentValue / this.size;
      for (let i = 1; i <= this.total; i++)this.numbers.push(i);
    } else if (changes['currentPage']) {
      this.currentPage = changes.currentPage.currentValue;
      this.updateRange();
    }
  }

  previous() {
    this.changePage(this.currentPage - 1);
  }
  next() {
    this.changePage(this.currentPage + 1)
  }

  changePage(page: number) {
    this.changePageEvent.emit(page);
  }

  ngOnInit() {
    this.updateRange();
  }

}
