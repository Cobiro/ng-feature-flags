import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$ = of([
    {
      name: 'Awesome product',
      price: '$50'
    },
    {
      name: 'So-so product',
      price: '$10'
    },
    {
      name: 'Great product',
      price: '$40'
    }
  ]);
  constructor() { }

  ngOnInit(): void {
  }

}
