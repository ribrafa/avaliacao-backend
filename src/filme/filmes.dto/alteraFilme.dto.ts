import { IsEmail, IsInt, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class alterarFilmeDTO{
    
    
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome:string

    @IsInt()
    @IsOptional()
    duracao: Number;

    @IsString()
    @IsOptional()
    sinopse: string;

    @IsEmail()
    @IsOptional()
    ano: string;

    @IsString()
    @IsOptional()
    genero: string;
}