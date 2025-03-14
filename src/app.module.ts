//gerencia o que esta sendo transitado, faz a comunicação entre o controler e o service

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmesModule } from './filme/filmes.module';

@Module({
  imports: [UsuarioModule, FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
