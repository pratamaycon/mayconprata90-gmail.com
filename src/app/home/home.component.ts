import { Oferta } from './../models/oferta.model';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {

    this.ofertasService.getOfertas()
    .then( (ofertas: Oferta[] ) => {
      console.log('a função resolve() foi resolvida depois de 3 segundos');
      this.ofertas = ofertas;
    })
    .catch( ( param : any) =>{
      console.log(param);
    });
  }
}
