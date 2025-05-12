import { FILME } from "src/filmes/filme.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class GENERO {
    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    NOME: string;

    @Column({length: 255})
    DESCRICAO: string;

    @OneToMany(() => FILME, filme=>filme.genero)
    filmes:FILME[];
}