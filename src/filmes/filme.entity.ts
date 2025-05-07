import { GENERO } from "src/genero/genero.entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

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

    @ManyToOne(() => GENERO, genero => genero.filmes)
    @JoinColumn({name: "IDGENERO", referencedColumnName:"ID"})
    GENERO: GENERO;


}