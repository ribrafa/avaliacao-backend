import { Optional } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AlteraPessoaDTO{
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiPropertyOptional({
        example: "Joao",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;


    @IsDate()
    @IsNotEmpty({message: "Nascimento não pode ser vazio"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "2010-02-18",
        description: "Data de nascimento do usuário, deve ser informado como date(2010-02-18)"
    })
    NASCIMENTO: Date;

    @IsString()
    @IsNotEmpty({message: "Pais não pode ser vazio"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "BRASIL",
        description: "Pais do usuário, deve ser informado um texto apenas o nome do pais"
    })
    PAIS: string;
}