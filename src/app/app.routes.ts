import { Routes } from '@angular/router';
import { TelaDeCadastro } from './tela-de-cadastro/tela-de-cadastro';
import { TelaDeLogin } from './tela-de-login/tela-de-login';

export const routes: Routes = [
    {path: "cadastrar", component: TelaDeCadastro},
    {path: "login", component: TelaDeLogin}
];
