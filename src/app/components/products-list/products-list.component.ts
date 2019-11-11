import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { PaginatorSettings } from 'src/app/models/paginator-settings';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList = new Array<Product>();
  paginatorSettings: PaginatorSettings;

  pageSize: number = 8;

  constructor(private productsService: ProductsService) { }

  loadPage(page: number) {

    this.productsService.getProducts({
      'size': this.pageSize,
      'page': page
    }).subscribe(response => {
      this.productList = response.items;
      this.paginatorSettings = new PaginatorSettings();
      this.paginatorSettings.pageSize = this.pageSize;
      this.paginatorSettings.total = response.total;
      this.paginatorSettings.currentPage = page;
      this.paginatorSettings.range = 3;
      this.paginatorSettings.withShortcuts = true;
    })
  }

  ngOnInit() {

    this.loadPage(0);
  }

}
