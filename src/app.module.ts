import { Module } from '@nestjs/common';

import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filmes/filme.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [GeneroModule,FilmeModule,PessoaModule,UsuarioModule,FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
