import { DataSource } from 'typeorm';
import { PESSOA } from './pessoa.entity';

export const pessoaProviders = [
  {
    provide: 'PESSOA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PESSOA),
    inject: ['DATA_SOURCE'],
  },
];