import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private _baseUrl: string = 'http://localhost:3001/products'

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-succecss']
    })
  }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(this._baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }


  read(): Observable<Product[]> {
    return this._http.get<Product[]>(this._baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: string): Observable<Product> {
    const url = `${this._baseUrl}/${id}`
    return this._http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(product: Product): Observable<Product> {
    const url = `${this._baseUrl}/${product.id}`
    return this._http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  deleteById(id: string): Observable<Product> {
    const url = `${this._baseUrl}/${id}`
    return this._http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);    
    return EMPTY
  }
}
