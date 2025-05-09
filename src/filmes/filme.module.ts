//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { DatabaseModule } from 'src/database/database.module';
import { filmeProviders } from './filmes.providers';
import { FilmeService } from './filme.service';
import { generoProviders } from 'src/genero/genero.providers';
import { GeneroService } from 'src/genero/genero.service';

@Module({  
  imports: [DatabaseModule],
  controllers: [FilmeController],  
  providers: [...filmeProviders,
    FilmeService,
    ...generoProviders,
  GeneroService,
],
})
export class FilmeModule {}
