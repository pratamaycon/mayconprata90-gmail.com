import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { Observable } from 'rxjs';
import { URL_API } from '../app.api';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {
  constructor(private http: HttpClient) {}

  public efetivarCompra(pedido: Pedido): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(`${URL_API}/pedidos`, JSON.stringify(pedido), {headers})
      .pipe(
        map( (resposta: any) => resposta.id)
      );
  }
}
