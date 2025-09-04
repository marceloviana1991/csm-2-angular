import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../client-http/grupo-service';
import { MaterialService } from '../client-http/material-service';
import { Grupo } from '../client-http/model/grupo';
import { Material } from '../client-http/model/material';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tela-de-edicao',
  imports: [
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './tela-de-edicao.html',
  styleUrl: './tela-de-edicao.scss'
})
export class TelaDeEdicao implements OnInit {

  imagem: string | null = null
  arquivo: File | null = null 
  grupoSelecionado: Grupo | null = null
  materialSelecionado: Material | null  = null

  grupos: Grupo[] = []
  materiaisPorGrupo: Material[] = []

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

  onGrupoSelecionado(event: MatSelectChange): void {
    this.grupoSelecionado = event.value
    this.materialService.getByGrupoId(event.value).subscribe( materiaisPorGrupo => {
      this.materiaisPorGrupo = materiaisPorGrupo
      this.materialSelecionado = null
      this.arquivo = null
      this.imagem = null
    })
  }

  onMaterialSelecionado(event: MatSelectChange): void {
    this.materialSelecionado = { ...event.value }
    this.materialService.getImagemById(this.materialSelecionado!.id!).subscribe( imagem => {
      this.imagem = URL.createObjectURL(imagem)
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

  cancelarEdicao(): void {
    this.arquivo = null
    this.materialSelecionado = this.materiaisPorGrupo.find(material => material.id == this.materialSelecionado!.id)!
    this.materialService.getImagemById(this.materialSelecionado!.id!).subscribe( imagem => {
      this.imagem = URL.createObjectURL(imagem)
    })
  }

  onSubmit(formularioDeEdicao: NgForm): void {
    const material = {
      nome: this.materialSelecionado!.nome,
      preco: this.materialSelecionado!.preco,
      quantidadeEmEstoque: this.materialSelecionado!.quantidadeEmEstoque,
      grupoId: this.materialSelecionado!.grupoId,
    };
    const materialId = this.materialSelecionado!.id!;
    this.materialService.put(material, materialId).subscribe({
      next: () => {
        if (this.arquivo) {
          this.materialService.putImagem(materialId, this.arquivo).subscribe({
            next: () => {
              this.openSnackBar('Material editado com sucesso!');
            },
            error: () => {
              this.openSnackBar('Erro de conexão!');
            }
          });
        } else {
          this.openSnackBar('Material editado com sucesso!');
        }
      },
      error: () => {
        this.openSnackBar('Erro de conexão!');
      }
    });
  }

  openSnackBar(mensagem: string) {
    this.snakbar.open(mensagem, 'Fechar', {
      duration: 3000
    });
  }


}
