//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class alteraFilmeDTO{

    //decorators de tipo e validação, são responsáveis por darem padrão e validar informações importantes nos DTOs
    //podem ser prédefinidos ou podem ser criados de forma customizada(exemplo email unico)
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "A volta dos que não foram",
        description: "Nome do filme, deve ser informado um texto contendo o nome"
    })
    nome: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: "120",
        description: "Duração do filme em minutos, deve ser informado como number"
    })
    duracao: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Um filme que conta a historia de ......",
        description: "Sinopse do filme que está sendo inserido"
    })
    sinopse: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "1990",
        description: "Ano de lançamento do filme, deve ser informado como texto"
    })
    ano: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Ação",
        description: "Genero do filme a ser inserido"
    })
    genero: string;


}

