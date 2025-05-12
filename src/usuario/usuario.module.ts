//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { emailUnicoValidator } from './validacao/email-unico.validator';
import { USUARIOService } from './usuario.service';
import { usuarioProviders } from './usuario.providers';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from 'src/pessoa/pessoa.providers';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Module({  
  imports: [DatabaseModule],
  controllers: [UsuarioController],  
  providers: [...usuarioProviders,
    USUARIOService,
    ...pessoaProviders,
    PessoaService,
    emailUnicoValidator],
})
export class UsuarioModule {}
