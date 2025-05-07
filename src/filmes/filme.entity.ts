import { Column, PrimaryColumn } from "typeorm";

export class FILME{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column('int')
    DURACAO: number;

    @Column()
    SINOPSE: string;

    @Column('int')
    ANO: number;

    @Column()
    GENERO: string;
}