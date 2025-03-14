import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class criarFilmeDTO{
    @IsString()
    
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome:string

    @IsInt()
    duracao: Number;

    @IsString()
    sinopse: string;

    @IsEmail()
    ano: string;

    @IsString()
    genero: string;
}