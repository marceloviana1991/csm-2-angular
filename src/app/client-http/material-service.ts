import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from './model/material';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  
  constructor(
    private http: HttpClient
  ) {}
  
  post(material: Material, imagem: File): Observable<void> {
    const formData = new FormData();
    if (imagem) {
      formData.append('imagem', imagem, imagem.name);
    }
    formData.append('requestDto', new Blob([JSON.stringify(material)], { type: "application/json" }));
    return this.http.post<void>(`${environment.apiUrl}/materiais`, formData)
  }
}
