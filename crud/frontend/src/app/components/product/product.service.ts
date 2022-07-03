import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private _baseUrl: string = 'http://localhost:3001/products'

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) { }

  showMessage(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(this._baseUrl, product)
  }
}
