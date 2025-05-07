//classe controller do módulo de usuário
//Classe controller é responsável por receber as requisições de fora da API, ele adminstra as requisições recebendo e respondendo elas.

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";
import {v4  as uuid} from 'uuid'
import { FilmesArmazenados } from "./filme.dm";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { criaFilmeDTO } from "./dto/filme.dto";
import { RetornoFilmeDTO } from "./dto/retornoFilme.dto";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import { ListaFilmeDTO, ListagemFilmesDTO } from "./dto/listaFilme.dto";

@ApiTags('filme')
//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/filmes')
export class FilmeController{
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private Filmes : FilmesArmazenados){

    }

    //POST - Recebe dados, pode ou não retornar informações, mas em geral recebe dados e retorna uma resposta
    //GET - Recebe apenas parametros, mas retorna dados variados, normalmente utilizado para consulta de dados
    //PUT - recebe dados, utilizado para fazer alterações de registros
    //DELETE - recebe dados, utilizado para remover registros ----


    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async criaFilme(@Body() dadosFilme: criaFilmeDTO): Promise <RetornoFilmeDTO>{       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        var novoFilme = new FilmeEntity(uuid(), dadosFilme.nome, dadosFilme.duracao, dadosFilme.sinopse,
                                        dadosFilme.ano,dadosFilme.genero)
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        this.Filmes.AdicionarFilme(novoFilme);

        //criação do padrão de retorno, para depois ser retornado como resposta do método, também é retornado os dados do usuário logado
        var retorno = new RetornoFilmeDTO('Filme criado',novoFilme);        
        return retorno        
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async alteraFilme(@Body() dadosNovos: alteraFilmeDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.Filmes.alteraFilme(id,dadosNovos)
        //criação do padrão de retorno
        var retorno = new RetornoFilmeDTO('Alteração Efetuada',retornoAlteracao);        
        return retorno;       
        
    }

    @Delete('/:id')//linha que define o método vai ser de exclusão (delete), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    async removeFilme(@Param('id') id: string){//aqui é definido que vai receber dados da URL(param)
        //aqui é chamada a função de exclusão de usuário, onde ja é feita toda a exclusão do usuário
        var retornoExclusao = await this.Filmes.removeFilme(id)
        //criação do padrão de retorno
        var retorno = new RetornoFilmeDTO('Exclusão Efetuada',retornoExclusao);        
        return retorno;               
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    async retornaFilmeId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista filme DTO)
        var filmesListados = this.Filmes.pesquisaId(ID);
        const ListaRetorno = new ListaFilmeDTO(filmesListados.id,
                                                filmesListados.nome,
                                                filmesListados.duracao,
                                                filmesListados.sinopse
        )

        return {
                Filme: ListaRetorno
            };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    async retornaFilme(): Promise <ListagemFilmesDTO>{
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaFilmeDTO)
        var filmesListados = this.Filmes.filmes;
        const ListaRetorno = filmesListados.map(
            filme => new ListaFilmeDTO(
                filme.id,
                filme.nome,
                filme.duracao,
                filme.sinopse
            )
        );

        const retorno = new ListagemFilmesDTO(ListaRetorno);


        return retorno
    }
}