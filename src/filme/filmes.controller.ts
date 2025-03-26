import { Body, Controller, Get, Post, Param, Put, Delete } from "@nestjs/common";
import { FilmeArmazanado } from "./filmes.dm"
import { FilmeEntity } from "./filmes.entity";
import { v4 as uuid } from "uuid";
import { criarFilmeDTO } from "./filmes.dto/filmes.dto";
import { alterarFilmeDTO } from "./filmes.dto/alteraFilme.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('filme')
@Controller('filmes')
export class FilmesController {
    constructor(private clsFilmesArmazanados: FilmeArmazanado){}

    @Post()
    async adicionarFilme(@Body() dadosFilme: criarFilmeDTO){
 
        var novoFilme = new FilmeEntity(uuid(), dadosFilme.nome, dadosFilme.duracao,
            dadosFilme.sinopse, dadosFilme.ano, dadosFilme.genero);
        this.clsFilmesArmazanados.adicionarFilme(novoFilme);
 
        var filmes = {
            dadosFilme : dadosFilme,
            status: "Filme Criado"
        }
        return filmes;
    }

    @Get()
    todosFilmes(){
        return this.clsFilmesArmazanados.todosFilmes();
    }

    @Get(':id')
    filmePorId(@Param('id') id: string) {
    return this.clsFilmesArmazanados.filmePorID(id);
    }

    @Get(':id/compartilhar')
    filmeDetalhado(@Param('id') id: string) {
    const filme = this.clsFilmesArmazanados.filmePorID(id);
    if (!filme) {
    throw new Error('Filme não encontrado');
    }

    return {
        message: `Você está assistindo ao filme ${filme.nome} com a sinopse ${filme.sinopse}. Esse filme é do ano de ${filme.ano} e tem o genero ${filme.genero}`
        }
    }


    @Put(':id')
    atualizaFilme(@Param('id') id: string, @Body() dadosAtualizados: alterarFilmeDTO) {
        const filmeAtualizado = this.clsFilmesArmazanados.atualizaFilme(id, dadosAtualizados)
 
        return{
            filmes: filmeAtualizado,
            message: 'Filme Atualizado'
        }
    }


    @Delete(':id')
    excluirFilme(@Param('id') id: string) {
        const FilmeExcluido = this.clsFilmesArmazanados.excluirFilme(id)

        return{
            filmes: FilmeExcluido,
            message: 'Filme Excluido'
        }
        
    }
}


