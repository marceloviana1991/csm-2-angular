import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './model/login';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Telefone } from './model/telefone';
import { TokenJwt } from './model/token-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private http: HttpClient
  ) {}

  login(login: Login): Observable<TokenJwt> {
    return this.http.post<TokenJwt>(`${environment.apiUrl}/login`, login)
  }

  getTelefone(): Observable<Telefone> {
    return this.http.get<Telefone>(`${environment.apiUrl}/login`)
  }

  public estaAutenticado(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;
    return true;
  }

  public getToken(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return '';
    return token;
  }

  public logout() {
    sessionStorage.removeItem('token')
  }
  
}
