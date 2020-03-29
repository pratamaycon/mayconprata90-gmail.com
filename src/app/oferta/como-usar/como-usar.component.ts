import { OfertasService } from './../../services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    this.idRotaPai = this.route.parent.snapshot.params.id;
    this.ofertasService.getComoUsarOfertaPorId(this.idRotaPai)
      .then( (descricao) => {
        this.comoUsar = descricao;
      });
  }

}
