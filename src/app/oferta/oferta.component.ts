import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../services/ofertas.service';
import { Oferta } from '../models/oferta.model';
import { CarrinhoService } from '../services/carrinho.service';
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit(): void {
     this.route.params.subscribe( ( parametros: Params ) =>{
      this.ofertasService.getOfertasPorId(parametros.id)
      .then( (oferta: Oferta) => {
        this.oferta = oferta;
      });
     });
  }

  ngOnDestroy() {
  }

  public adicionarItemCarrinho(oferta: Oferta): void{
    this.carrinhoService.incluirItem(this.oferta);
  }

}
