import { URL_API } from './../app.api';
import { Oferta } from './../models/oferta.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }

  /**  efetuar uma requisicao http  e retornar uma Promisse Oferta[] */
  public getOfertas(): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then( (resposta: Oferta[]) => resposta );
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then( (resposta: Oferta[]) => resposta );
  }

  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then( (resposta: any) => {
        return resposta.shift();
      });
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then( (resposta: any) => {
        return resposta[0].descricao;
      });
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then( (resposta: any) => {
        return resposta[0].descricao;
      });
  }

}
