export class FilmeEntity {
    id: string;
    nome: string;
    duracao: Number;
    sinopse: string;
    ano: string;
    genero: string;
    constructor(id: string, nome: string, duracao: Number, sinopse: string, ano: string, genero: string){
        this.id = id;
        this.nome = nome;
        this.duracao = duracao;
        this.sinopse = sinopse;
        this.ano = ano;
        this.genero = genero;
    }
  }