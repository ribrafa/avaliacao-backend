import { DataSource } from 'typeorm';
import { FILME } from './filme.entity';

export const filmeProviders = [
  {
    provide: 'FILME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FILME),
    inject: ['DATA_SOURCE'],
  },
];