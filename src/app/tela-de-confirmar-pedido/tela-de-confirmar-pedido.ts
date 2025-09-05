import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PedidoService } from '../client-http/pedido-service';
import { Pedido } from '../client-http/model/pedido';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ItemPedido } from '../client-http/model/item-pedido';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tela-de-confirmar-pedido',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './tela-de-confirmar-pedido.html',
  styleUrl: './tela-de-confirmar-pedido.scss'
})
export class TelaDeConfirmarPedido implements OnInit {

  private today = new Date()
  
  mes: number | null = null
  ano: number | null = null

  pedidos: Pedido[] = []

  displayedColumns: string[] = ['nome', 'quantidade', 'valor']

  constructor(
    private pedidoService: PedidoService,
    private snakbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.mes = this.today.getMonth() + 1
    this.ano = this.today.getFullYear()
    this.pedidoService.getByMesAndAno(this.mes, this.ano).subscribe( pedidos => {
      this.pedidos = pedidos
    })
  }

  listarPedidos() {
    if (!this.ano || !this.mes) {
      this.openSnackBar('Informo mês e ano para listar pedidos!');
      return
    }
    this.pedidoService.getByMesAndAno(this.mes, this.ano).subscribe( pedidos => {
      this.pedidos = pedidos
    })
  }

  cancelarPedido(id: number) {
    this.pedidoService.deleteCancelar(id).subscribe( () => {
      this.pedidoService.getByMesAndAno(this.mes!, this.ano!).subscribe( pedidos => {
        this.pedidos = pedidos
      })
    })
    
  }

  confirmarPedido(id: number) {
    this.pedidoService.pathConfirmar(id).subscribe( () => {
      this.pedidoService.getByMesAndAno(this.mes!, this.ano!).subscribe( pedidos => {
        this.pedidos = pedidos
      })
    })
  }

  openSnackBar(mensagem: string) {
    this.snakbar.open(mensagem, 'Fechar', {
      duration: 3000
    });
  }

  getTotalValue(itens: ItemPedido[]): number {
    return itens.map(item => item.valorTotal!).reduce((acc, value) => acc + value, 0)
  }




}
