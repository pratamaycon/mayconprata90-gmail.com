import { OfertasService } from './../../services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {

  public idRotaPai: number;
  public comoUsar = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe( ( parametros: Params ) => {
    this.ofertasService.getComoUsarOfertaPorId(parametros.id)
      .then( (descricao) => {
        this.comoUsar = descricao;
      });
    });
  }
}
