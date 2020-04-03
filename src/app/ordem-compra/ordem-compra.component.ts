import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../services/ordem-compra.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pedido } from '../models/pedido.model';
import { CarrinhoService } from '../services/carrinho.service';
import ItemCarrinho from '../models/item-carrinho.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  public itensCarrinho: Array<ItemCarrinho> = [];

  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    numero: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    complemento: new FormControl(null),
    formaPagamento: new FormControl(null,  [Validators.required]),
  });

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public getCarrinhoService(): CarrinhoService {
    return this.carrinhoService;
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    }

    if (this.carrinhoService.exibirItens().length === 0){
      console.log('Voce nao selecionou nenhum item');
    } else {
      const pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.nummero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
    );

      this.ordemCompraService.efetivarCompra(pedido)
      .subscribe( (idPedido: number) => {
        this.idPedidoCompra = idPedido;
        this.carrinhoService.limparCarrinho();
      });
    }
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(item, '+');
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(item, '-');
  }
}
