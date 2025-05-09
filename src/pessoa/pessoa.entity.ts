
import { FILME } from "src/filmes/filme.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class PESSOA {
    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    NOME: string;

    @Column()
    NASCIMENTO: Date;

    @Column({length: 255})
    PAIS: string;

    @ManyToMany(
      () => FILME, 
      filme => filme.atores, //optional
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
      @JoinTable({
        name: 'filme_pessoa',
        joinColumn: {
          name: 'IDPESSOA',
          referencedColumnName: 'ID',
        },
        inverseJoinColumn: {
          name: 'IDFILME',
          referencedColumnName: 'ID',
        },
      })
    filmes?: FILME[];
}