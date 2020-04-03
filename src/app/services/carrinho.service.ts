import { Oferta } from './../models/oferta.model';
import { Injectable } from '@angular/core';
import ItemCarrinho from '../models/item-carrinho.model';
import { Operator } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public itens: Array<ItemCarrinho> = [];

  constructor() { }

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItem(oferta: Oferta): void{
    const itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao,
      oferta.valor,
      1
    );

    /**
     * Verifica se o item em questão já não existe dentro de itens
     */
    const itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id);

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    } else {
      this.itens.push(itemCarrinho);
    }
  }

  public totalCarrinhoCompras(): number {
    let total = 0;
    this.itens.map( (item: ItemCarrinho) => {
      total += (item.valor * item.quantidade);
    });
    return total;
  }

  public alterarQuantidade(itemCarrinho: ItemCarrinho, operador: string): void{

    // Incrementar quantidade
    const itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id);

    if (itemCarrinhoEncontrado && operador === '+') {
      itemCarrinhoEncontrado.quantidade += 1;
    } else {
      itemCarrinhoEncontrado.quantidade -= 1;

      // eliminar o item quando chegar a quantidade zero
      if (itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
      }

    }

  }

  public limparCarrinho(): void{
    this.itens = [];
  }

}
