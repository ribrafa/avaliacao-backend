import { DataSource } from 'typeorm';
import { FILES } from './files.entity';


export const filesProviders = [
  {
    provide: 'FILES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FILES),
    inject: ['DATA_SOURCE'],
  },
];