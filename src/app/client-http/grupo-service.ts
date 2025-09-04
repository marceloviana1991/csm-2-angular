import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from './model/grupo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(
    private http: HttpClient
  ) {}

  get(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${environment.apiUrl}/grupos`)
  }
  
}
