import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './model/pedido';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  constructor(
    private http: HttpClient
  ) {}

  post(pedido: Pedido): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/pedidos`, pedido)
  }

  getByMesAndAno(mes: number, ano: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.apiUrl}/pedidos?mes=${mes}&ano=${ano}`)
  }

  pathConfirmar(id: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/pedidos/confirmar/${id}`, {})
  }

  deleteCancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/pedidos/cancelar/${id}`)
  }
}
