import { ItemPedido } from './item-pedido';

export interface Pedido {
    id?: number
    cliente: string
    telefone: string
    data?: string
    confirmado?: boolean
    itens: ItemPedido[]
}