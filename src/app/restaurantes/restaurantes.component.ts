import { Oferta } from './../models/oferta.model';
import { OfertasService } from './../services/ofertas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertasService.getOfertasPorCategoria('restaurante')
      .then( (ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      });
  }

}
