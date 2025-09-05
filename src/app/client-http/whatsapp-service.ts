import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from './model/telefone';
import { environment } from '../../environments/environment';
import { ItemPedido } from './model/item-pedido';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(
    private http: HttpClient
  ) {}

  private getTelefone(): Observable<Telefone> {
    return this.http.get<Telefone>(`${environment.apiUrl}/login`)
  }

  get(itens: ItemPedido[]): void {

    this.getTelefone().subscribe( telefone => {
      let itensMensagem = ''
      let total = 0
      itens.forEach( item => {
        if (item) {
          total += item.valorTotal!
          const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorTotal!);
          itensMensagem += `• ${item.quantidade} - ${item.nome} - ${valorFormatado}`
          itensMensagem += '\n'
        }
      })
      const totalFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)

      const mensagemWhatsapp = `
*Olá! 👋 Seu pedido foi recebido!*

Aqui está o resumo para sua conferência:

${itensMensagem}
-----------------------------------
*Total a pagar: ${totalFormatado}*

Para concluir, por favor, realize o pagamento via Pix.

*Chave Pix (Celular):*
${telefone.telefone}`
      const mensagemCodificada = encodeURIComponent(mensagemWhatsapp)
      const url = `https://api.whatsapp.com/send?phone=${telefone.telefone}&text=${mensagemCodificada}`;
      window.open(url, '_blank');
    })
  }

}
