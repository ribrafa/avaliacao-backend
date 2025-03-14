import { Injectable } from '@nestjs/common';
import { FilmeEntity } from './filmes.entity'

@Injectable()
export class FilmeArmazanado {
  private filmes: FilmeEntity[] = [];

    todosFilmes() {
    return this.filmes;
  }

  filmePorID(id: string): FilmeEntity {
    const filme = this.filmes.find(f => f.id === id);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }
    return filme;
  }


  adicionarFilme(filme: FilmeEntity) {
    this.filmes.push(filme);
    return filme;
  }


  atualizaFilme(id: string, dadosAtualizacao: Partial<FilmeEntity>){
    const usuario = this.buscarID(id);

    Object.entries(dadosAtualizacao).forEach(
        ([chave,valor]) => {
            if(chave === 'id'){
                return
            }
            if (valor === undefined){
                return
            }

            usuario[chave] = valor;
        }
    )
    return usuario;
}

private buscarID(id: string){
    const possivelFilme = this.filmes.find(
        filmeSalvo => filmeSalvo.id === id
    )

    if (!possivelFilme){
        throw new Error('Filme nao econtrado')
    }
    return possivelFilme
}
  excluirFilme(id: string) {
    const filme = this.buscarID(id);

        this.filmes = this.filmes.filter(
            filmeSalvo => filmeSalvo.id !== id
        )

        return filme;
    }

}

