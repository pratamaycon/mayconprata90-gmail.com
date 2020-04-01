import { OfertasService } from 'src/app/services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Oferta } from '../models/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Observable, of as observableOf, Subject } from 'rxjs';
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
        .pipe(
        debounceTime(1000), // executa a ação do switchMap após um 1s
        distinctUntilChanged(), // para fazer pesquisas distintas
        catchError((error: any) => {
          return observableOf<Oferta[]>([]);
        }),
        switchMap( (termo: string) => {
          console.log('requisição http para api');
          if (termo.trim() === '') {
            /**
             * retorna um observable de um array vazio
             */
            return observableOf<Oferta[]>([]);
          }
          return this.ofertasService.pesquisarOfertas(termo);
        })
      );
  }

   public pesquisa(termoDaBusca: string): void {
      this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa() {
    this.subjectPesquisa.next('');
  }

}
