import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AlteraGeneroDTO{
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: "Descrição não pode ser vazio"})
    DESCRICAO: string;
}