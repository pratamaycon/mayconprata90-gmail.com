import { Pedido } from './../models/pedido.model';
import { OrdemCompraService } from './../services/ordem-compra.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario', {static: false}) public formulario: NgForm;

  public idPedidoCompra: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
  }

  confirmarCompra(): void {
    const pedido: Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
    );


    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe( (idPedido: number) => {
        this.idPedidoCompra = idPedido;
        console.log('Pedido cadastrado com sucesso! ID do pedido: ', idPedido);
      });
  }

}
