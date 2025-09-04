import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Grupo } from '../client-http/model/grupo';
import { GrupoService } from '../client-http/grupo-service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialService } from '../client-http/material-service';
import { Material } from '../client-http/model/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tela-de-cadastro',
  imports: [
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './tela-de-cadastro.html',
  styleUrl: './tela-de-cadastro.scss'
})
export class TelaDeCadastro implements OnInit {

  private placeholder = "placeholder.png"

  imagem: string = this.placeholder
  arquivo: File | null = null 
  grupoSelecionado: Grupo | null = null
  nome: string | null = null
  preco: number | null = null
  quantidadeEmEstoque: number | null = null

  grupos: Grupo[] = []

  constructor(
    private grupoService: GrupoService,
    private materialService: MaterialService,
    private snakbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.grupoService.get().subscribe( grupos => {
      this.grupos = grupos
    })
  }

  onFileSelected(event: any): void {
    const arquivo: File = event.target.files[0]
    
     if (arquivo) {
      this.arquivo = arquivo
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagem = e.target.result
      }
      reader.readAsDataURL(arquivo)
    }
  }

  onSubmit(formularioDeCadastro: NgForm): void {
    const material: Material = {
      nome: this.nome!,
      preco: this.preco!,
      quantidadeEmEstoque: this.quantidadeEmEstoque!,
      grupoId: this.grupoSelecionado!.id,
    }

    this.materialService.post(material, this.arquivo!).subscribe({
      next: () => {
        formularioDeCadastro.resetForm()
        this.imagem = this.placeholder
        this.arquivo = null
        this.openSnackBar('Material cadastrado com sucesso!')
      },
      error: () => {
        this.openSnackBar('Erro de conexão!')
      }
     })
  }

  openSnackBar(mensagem: string) {
    this.snakbar.open(mensagem, 'Fechar', {
      duration: 3000
    });
  }

}
