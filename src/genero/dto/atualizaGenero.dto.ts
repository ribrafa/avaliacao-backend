import { Optional } from "@nestjs/common";
import { IsString, IsNotEmpty } from "class-validator";



export class AlteraGeneroDTO{
    @IsString()
    @Optional()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    @Optional()
    @IsNotEmpty({message: "Descrição não pode ser vazio"})
    DESCRICAO: string;

}