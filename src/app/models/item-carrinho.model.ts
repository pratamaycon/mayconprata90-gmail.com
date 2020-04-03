export default class ItemCarrinho {
  constructor(
    public id: number,
    public img: any,
    public titulo: string,
    public descricao: string,
    public valor: number,
    public quantidade: number
  ) {}
}
