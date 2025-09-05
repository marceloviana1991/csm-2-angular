import { Routes } from '@angular/router';
import { TelaDeCadastro } from './tela-de-cadastro/tela-de-cadastro';
import { TelaDeLogin } from './tela-de-login/tela-de-login';
import { authGuard } from './guards/auth-guard';
import { TelaDeEdicao } from './tela-de-edicao/tela-de-edicao';
import { TelaDeEfetuarPedido } from './tela-de-efetuar-pedido/tela-de-efetuar-pedido';
import { TelaDeConfirmarPedido } from './tela-de-confirmar-pedido/tela-de-confirmar-pedido';

export const routes: Routes = [
    {path:'', redirectTo:'/efetuar-pedido', pathMatch:'full'},
    {path: "cadastrar", component: TelaDeCadastro, canActivate: [authGuard]},
    {path: "login", component: TelaDeLogin},
    {path: "editar", component: TelaDeEdicao, canActivate: [authGuard]},
    {path: "efetuar-pedido", component: TelaDeEfetuarPedido},
    {path: "confirmar-pedido", component: TelaDeConfirmarPedido, canActivate: [authGuard]},
];
