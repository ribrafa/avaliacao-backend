import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { GENERO } from './genero.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { CriaGeneroDTO } from './dto/criaGenero.dto';
import { AlteraGeneroDTO } from './dto/atualizaGenero.dto';
//import { AlteraGeneroDTO } from './dto/atualizaGenero.dto';


@Injectable()
export class GeneroService {
  constructor(
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<GENERO>,
  ) {}


  async listar(): Promise<GENERO[]> {
    return this.generoRepository.find();
  }

  async inserir(dados: CriaGeneroDTO): Promise<RetornoCadastroDTO>{
    let genero = new GENERO();
        genero.ID = uuid();
        genero.NOME = dados.NOME;
        genero.DESCRICAO = dados.DESCRICAO;

    return this.generoRepository.save(genero)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: genero.ID,
        message: "Genero cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })
  }

  async localizarID(ID: string): Promise<GENERO> {
    const genero = await this.generoRepository.findOne({
      where: {
        ID,
      },
    });

    if (!genero) {
        throw new Error(`Gênero com ID ${ID} não encontrado`);
    }

    return genero;
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const genero = await this.localizarID(id);
    
    return this.generoRepository.remove(genero)
    .then((result) => {
      return <RetornoObjDTO>{
        return: genero,
        message: "Genero excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: genero,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraGeneroDTO): Promise<RetornoCadastroDTO> {
    const genero = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          genero[chave] = valor;
      }
    )

    return this.generoRepository.save(genero)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: genero.ID,
        message: "Genero alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}