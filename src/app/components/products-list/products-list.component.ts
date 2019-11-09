import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList = new Array<Product>();
  total: number = 0;
  currentPage = 0;

  constructor(private productsService: ProductsService) { }

  changePage(page: number) {
    this.productsService.getProducts({
      'size': 10,
      'page': page
    }).subscribe(response => {
      this.productList = response.items;
      this.total = response.total;
      this.currentPage = page;
    })
  }
  ngOnInit() {
    this.productsService.getProducts({
      'size': 10,
      'page': 0
    }).subscribe(response => {
      console.log(response);
      this.productList = response.items;
      this.total = response.total;

    })
  }

}
