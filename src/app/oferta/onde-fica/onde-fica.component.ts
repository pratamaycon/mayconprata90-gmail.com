import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public idRotaPai: number;
  public ondeFica = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe( ( parametros: Params ) => {
    this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
      .then( (descricao) => {
        this.ondeFica = descricao;
      });
    });
  }
}
