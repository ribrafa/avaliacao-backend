//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { filmeProviders } from './filme.providers';
import { generoProviders } from 'src/genero/genero.provider';
import { GeneroService } from 'src/genero/genero.service';
import { FilmeService } from './filme.service';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from 'src/pessoa/pessoa.providers';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { filme_pessoaProviders } from 'src/filme_pessoa/filme_pessoa.providers';
import { FILME_PESSOAService } from 'src/filme_pessoa/filme_pessoa.service';

@Module({  
  imports: [DatabaseModule],
  controllers: [FilmeController],  
  providers: [
    ...filmeProviders,
    FilmeService,
    ...pessoaProviders,
    PessoaService,
    ...filme_pessoaProviders,
    FILME_PESSOAService,
    ...generoProviders,
    GeneroService,
    ],
})
export class FilmeModule {}