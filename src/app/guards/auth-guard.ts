import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AutenticacaoService } from '../client-http/autenticacao-service';

export const authGuard: CanActivateFn = (route, state) => {
  const autenticacao = inject(AutenticacaoService)
  return autenticacao.estaAutenticado();
};
