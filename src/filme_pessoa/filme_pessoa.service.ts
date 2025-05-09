import { Inject, Injectable } from "@nestjs/common";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { listaPessoaDTO } from "src/pessoa/dto/listaPessoa.dto";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { Repository } from "typeorm";
import {v4  as uuid} from 'uuid'
import { RetornoElencoDTO } from "./dto/retornoElenco.dto";
import { FILME_PESSOA } from "./filme_pessoa.entity";
import { FILME } from "src/filmes/filme.entity";

@Injectable()
export class FILME_PESSOAService {
  constructor(
    @Inject('FILME_PESSOA_REPOSITORY')
    private filme_pessoaRepository: Repository<FILME_PESSOA>
  ) {}
  
    async inserir(filme: FILME,pessoa:PESSOA,funcao:string): Promise<RetornoCadastroDTO>{
        let filme_pessoa = new FILME_PESSOA();
        filme_pessoa.ID = uuid()
        filme_pessoa.IDFILME = filme.ID;
        filme_pessoa.IDPESSOA = pessoa.ID;
        filme_pessoa.FUNCAO = funcao;

        return this.filme_pessoaRepository.save(filme_pessoa)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: filme_pessoa.ID,
            message: "FILME_PESSOA cadastrado!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })

        
    }

    async remover(filme: FILME,pessoa:PESSOA): Promise<RetornoCadastroDTO>{
        let filme_pessoa = await this.localizar(filme,pessoa);


        return this.filme_pessoaRepository.remove(filme_pessoa)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: filme_pessoa.ID,
            message: "FILME_PESSOA REMOVIDO!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })

        
    }

    async localizar(filme: FILME, pessoa:PESSOA): Promise<FILME_PESSOA>{
        let retorno = await this.filme_pessoaRepository.findOne({where: 
            {IDFILME:filme.ID, IDPESSOA:pessoa.ID }
        });


      
          if (!retorno) {
              throw new Error(`NÂO FOI ENCONTRADO RELAÇÃO ENTRE ${filme.NOME} E ${pessoa.NOME}`);
          }
      
        return retorno;
    }

    async listarElenco(filme:FILME){
        
        let retorno = new RetornoElencoDTO();
        retorno.IDFILME = filme.ID;

        var elenco = await (this.filme_pessoaRepository 
            .createQueryBuilder('filme_pessoa')
            .select('pes.ID', 'ID')
            .addSelect('pes.NOME','NOME')
            .addSelect('pes.NASCIMENTO','NASCIMENTO')
            .addSelect('pes.PAIS','PAIS')
            .leftJoin('PESSOA', 'pes','filme_pessoa.IDPESSOA = pes.id')      
            .andWhere('filme_pessoa.IDFILME = :ID',{ ID: `${filme.ID}` })               
            .getRawMany());


        retorno.elenco = elenco.map(
            pessoa => new listaPessoaDTO(
                pessoa.ID,
                pessoa.NOME,
                pessoa.NASCIMENTO,
                pessoa.PAIS
            ))
        return retorno;

    }

}