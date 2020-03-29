import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.idRotaPai = this.route.parent.snapshot.params.id;
    this.ofertasService.getOndeFicaOfertaPorId(this.idRotaPai)
      .then( (descricao) => {
        this.ondeFica = descricao;
      });
  }

}
