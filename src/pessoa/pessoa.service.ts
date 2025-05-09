import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { PESSOA } from './pessoa.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { CriaPessoaDTO } from './dto/criaPessoa.dto';
import { AlteraPessoaDTO } from './dto/atualizaPessoa.dto';


@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
  ) {}

  async listar(): Promise<PESSOA[]> {
    return this.pessoaRepository.find();
  }

  async inserir(dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{
    let pessoa = new PESSOA();
        pessoa.ID = uuid();
        pessoa.NOME = dados.NOME;
        pessoa.NASCIMENTO = dados.NASCIMENTO;
        pessoa.PAIS = dados.PAIS;
        

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
        message: "Pessoa cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  async localizarID(ID: string): Promise<PESSOA> {
    const objeto = await this.pessoaRepository.findOne({
      where: {
        ID,
      },
    });

    if (!objeto) {
        throw new Error(`PESSOA com ID ${ID} não encontrado`);
    }

    return objeto;
  }

  async localizarNome(NOME: string): Promise<PESSOA> {

    const objeto = await this.pessoaRepository.findOne({
      where: {
        NOME,
      },
    });

    if (!objeto) {
        throw new Error(`PESSOA com ID ${NOME} não encontrado`);
    }

    return objeto;
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.pessoaRepository.remove(pessoa)
    .then((result) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Pessoa excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraPessoaDTO): Promise<RetornoCadastroDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
        message: "Pessoa alterado!"
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