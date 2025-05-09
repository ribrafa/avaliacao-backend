import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PessoaController } from './pessoa.controller';
import { pessoaProviders } from './pessoa.providers';
import { PessoaService } from './pessoa.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PessoaController],
  providers: [
    ...pessoaProviders,
    PessoaService,
  ],
})
export class PessoaModule {}