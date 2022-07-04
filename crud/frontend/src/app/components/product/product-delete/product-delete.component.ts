import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this._productService.readById(id!).subscribe(product => {
      this.product = product
    });
  }

  deleteProduct(id: string) {
    this._productService.deleteById(id).subscribe(() => {
      this._productService.showMessage('Produto deletado com sucesso!')
      this._router.navigate(['/products'])
    })
  }

  cancel(): void {
    this._router.navigate(['/products'])
  }
}
