import { Module } from "@nestjs/common";
import { FilmesController } from './filmes.controller'
import { FilmeArmazanado } from './filmes.dm'

@Module({
    controllers: [FilmesController],
    providers: [FilmeArmazanado]
})

export class FilmesModule {}