import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AutenticacaoService } from '../client-http/autenticacao-service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../client-http/model/login';
import { Token } from '../client-http/model/token';


@Component({
  selector: 'app-tela-de-login',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './tela-de-login.html',
  styleUrl: './tela-de-login.scss'
})
export class TelaDeLogin {

  login: string | null = null
  senha: string | null = null

  constructor(
    private autenticacaoService: AutenticacaoService,
    private snakbar: MatSnackBar
  ) {}

  onSubmit(formularioDeLogin: NgForm) {
    const login: Login = {
      login: this.login!,
      password: this.senha!
    }
    this.autenticacaoService.login(login).subscribe({
      next: (token: Token) => {
        this.openSnackBar('Autenticação realizada com sucesso!')
        sessionStorage.setItem('token', token.token)
        formularioDeLogin.resetForm()
      },
      error: () => {
        this.openSnackBar('Falha na autenticação!')
      }
    })

  }

  openSnackBar(mensagem: string) {
    this.snakbar.open(mensagem, 'Fechar', {
      duration: 3000
    });
  }

}
