import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaGeneroDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    @IsNotEmpty({message: "Descrição não pode ser vazio"})
    DESCRICAO: string;
}