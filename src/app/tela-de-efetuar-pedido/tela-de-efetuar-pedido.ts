import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GrupoService } from '../client-http/grupo-service';
import { MaterialService } from '../client-http/material-service';
import { Grupo } from '../client-http/model/grupo';
import { Material } from '../client-http/model/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ItemPedido } from '../client-http/model/item-pedido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PedidoService } from '../client-http/pedido-service';
import { WhatsappService } from '../client-http/whatsapp-service';

@Component({
  selector: 'app-tela-de-efetuar-pedido',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './tela-de-efetuar-pedido.html',
  styleUrl: './tela-de-efetuar-pedido.scss'
})
export class TelaDeEfetuarPedido implements OnInit {

  @ViewChild('tabelaDeItens') tabelaDeItens!: ElementRef

  grupos: Grupo[] = []
  materiaisProGrupo: Material[] = []

  nome: string = ''
  telefone: string = ''

  grupoSelecionado: Grupo | null = null
  materialSelecionado: Material | null = null
  imagem: string | null = null

  quantidadeInput: number = 1

  itensDoPedido: ItemPedido[] = []

  displayedColumns: string[] = ['produto', 'quantidade', 'valor', 'remover']

  constructor(
    private grupoService: GrupoService,
    private materialService: MaterialService,
    private pedidoService: PedidoService,
    private whatsappService: WhatsappService,
    private snakbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.grupoService.get().subscribe( grupos => {
      this.grupos = grupos
    })
  }

  onGrupoSelecionado() {
    this.materialService.getByGrupoIdVenda(this.grupoSelecionado!.id).subscribe( materiaisProGrupo => {
      this.materiaisProGrupo = materiaisProGrupo
    })
    this.quantidadeInput = 1
    this.materialSelecionado = null
  }

  onMaterialSelecionado() {
    this.materialService.getImagemById(this.materialSelecionado!.id!).subscribe( imagem => {
      this.imagem = URL.createObjectURL(imagem)
    })
    this.quantidadeInput = 1
  }

  adicionar() {
    const itemJaAdicionado = this.itensDoPedido.find(itemDoPedido => itemDoPedido.materialId == this.materialSelecionado?.id)
    if (itemJaAdicionado) {
      const quantidadeTotalDoItem = itemJaAdicionado.quantidade + this.quantidadeInput
      if (this.materialSelecionado && this.materialSelecionado.quantidadeEmEstoque < quantidadeTotalDoItem) {
        this.openSnackBar('Quantidade indisponível!')
        return
      }
      itemJaAdicionado.quantidade = quantidadeTotalDoItem
      itemJaAdicionado.valorTotal = quantidadeTotalDoItem * this.materialSelecionado!.preco
      this.itensDoPedido = [...this.itensDoPedido]
    } else {
      if (this.materialSelecionado && this.materialSelecionado.quantidadeEmEstoque < this.quantidadeInput) {
        this.openSnackBar('Quantidade indisponível!')
        return
      }
      const itemDoPedido = {
        materialId: this.materialSelecionado?.id,
        nome: this.materialSelecionado?.nome,
        quantidade: this.quantidadeInput,
        valorTotal: (this.quantidadeInput * this.materialSelecionado!.preco)
      }
      this.itensDoPedido.push(itemDoPedido)
      this.itensDoPedido = [...this.itensDoPedido]
    }

    setTimeout(() => {
      this.tabelaDeItens.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })
  }

  removerItem(itemParaRemover: ItemPedido) {
    this.itensDoPedido = this.itensDoPedido.filter(item => item !== itemParaRemover)
  }

  finalizarPedido() {
    const itensDoPedido = this.itensDoPedido.map(item => {
      return {
        materialId: item.materialId,
        quantidade: item.quantidade
      }
    })
    const pedido = {
      cliente: this.nome,
      telefone: this.telefone,
      itens: itensDoPedido
    }
    this.pedidoService.post(pedido).subscribe({
      next: () => {
        this.whatsappService.get(this.itensDoPedido)
        this.openSnackBar('Pedido cadastrado com sucesso!')
        this.grupoSelecionado = null
        this.materialSelecionado = null
        this.itensDoPedido = []
        
      },
      error: () => {
        this.openSnackBar('Erro de conexão!')
      }
    })
  }

  openSnackBar(mensagem: string) {
    this.snakbar.open(mensagem, 'Fechar', {
      duration: 3000
    });
  }

  getTotalCost() {
    return this.itensDoPedido.map(item => item.valorTotal!).reduce((acc, value) => acc + value, 0);
  }

}
