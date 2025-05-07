//DTO responsável por receber dados de criação de um novo usuário
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criaFilmeDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiProperty({
        example: "A volta dos que não foram",
        description: "Nome do filme, deve ser informado um texto contendo o nome"
    })
    nome: string;

    @IsNumber()
    @ApiProperty({
        example: "120",
        description: "Duração do filme em minutos, deve ser informado como number"
    })
    duracao: number;

    @IsString()
    @ApiProperty({
        example: "Um filme que conta a historia de ......",
        description: "Sinopse do filme que está sendo inserido"
    })
    sinopse: string;

    @IsString()
    @ApiProperty({
        example: "1990",
        description: "Ano de lançamento do filme, deve ser informado como texto"
    })
    ano: string;

    @IsString()
    @ApiProperty({
        example: "Ação",
        description: "Genero do filme a ser inserido"
    })
    genero: string;
}