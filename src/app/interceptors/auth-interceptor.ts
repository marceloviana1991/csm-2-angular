import { HttpInterceptorFn } from '@angular/common/http';
import { AutenticacaoService } from '../client-http/autenticacao-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const login = inject(AutenticacaoService)

  if (login.estaAutenticado()) {
    const newReq = req.clone({
      setHeaders: {Authorization: `Bearer ${login.getToken()}`}
    })
    return next(newReq)
  }
  return next(req)
};
