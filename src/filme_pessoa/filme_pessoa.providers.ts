import { DataSource } from "typeorm";
import { FILME_PESSOA } from "./filme_pessoa.entity";

export const filme_pessoaProviders = [
    {
        provide: 'FILME_PESSOA_REPOSITORY',
        useFactory: (dataSouce: DataSource) => dataSouce.getRepository(FILME_PESSOA),
        inject: ['DATA_SOURCE'],
    },
];