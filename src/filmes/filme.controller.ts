//classe controller do módulo de usuário
//Classe controller é responsável por receber as requisições de fora da API, ele adminstra as requisições recebendo e respondendo elas.

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { criaFilmeDTO } from "./dto/filme.dto";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import { ListaFilmeDTO, ListagemFilmesDTO } from "./dto/listaFilme.dto";
import { FilmeService } from "./filme.service";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { atorFilmeDTO } from "./dto/atorFilme.dto";
import { RetornoElencoDTO } from "src/filme_pessoa/dto/retornoElenco.dto";

@ApiTags('filme')
//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/filmes')
export class FilmeController{
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private readonly filmeService: FilmeService){
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
    async criaFilme(@Body() dadosFilme: criaFilmeDTO): Promise <RetornoCadastroDTO>{       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        var retorno = this.filmeService.inserir(dadosFilme);                       
        return retorno        
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async alteraFilme(@Body() dadosNovos: alteraFilmeDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.filmeService.alterar(id,dadosNovos)
        //criação do padrão de retorno   
        return retornoAlteracao;       
        
    }

    @Delete('/:id')//linha que define o método vai ser de exclusão (delete), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    async removeFilme(@Param('id') id: string){//aqui é definido que vai receber dados da URL(param)
        //aqui é chamada a função de exclusão de usuário, onde ja é feita toda a exclusão do usuário
        var retornoExclusao = await this.filmeService.remover(id)   
        return retornoExclusao;               
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    async retornaFilmeId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do filme, depois é criado mapeado os dados desse usuário para um retorno padrão (lista filme DTO)
        var filmesListados = await this.filmeService.Compartilhar(ID);
        return {
                Filme: filmesListados
            };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    async retornaFilme(): Promise <ListaFilmeDTO[]>{
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaFilmeDTO)
        return this.filmeService.listar();
    }


    @Post('/ator/')
    async addAtor( @Body() dados: atorFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.addAtor(dados);        
    }

    @Delete('/ator/')
    async removeAtor( @Body() dados: atorFilmeDTO):Promise<RetornoCadastroDTO>{
        return this.filmeService.removeAtor(dados);        
    }

    @Get('/ator/:id')
    async listaElencoFilme( @Param('id') id: string):Promise<RetornoElencoDTO>{
        return this.filmeService.listarAtor(id);        
    }
}