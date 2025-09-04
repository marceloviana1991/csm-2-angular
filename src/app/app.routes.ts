import { Routes } from '@angular/router';
import { TelaDeCadastro } from './tela-de-cadastro/tela-de-cadastro';
import { TelaDeLogin } from './tela-de-login/tela-de-login';
import { authGuard } from './guards/auth-guard';
import { TelaDeEdicao } from './tela-de-edicao/tela-de-edicao';

export const routes: Routes = [
    {path: "cadastrar", component: TelaDeCadastro, canActivate: [authGuard]},
    {path: "login", component: TelaDeLogin},
    {path: "editar", component: TelaDeEdicao, canActivate: [authGuard]}
];
