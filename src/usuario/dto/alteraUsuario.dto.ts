import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome:string

    @IsInt()
    @IsOptional()
    idade: Number;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsEmail(undefined,{message: "email é invalido"})
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    telefone: string;

    @MinLength(6,{message: "Senha precisa de pelo menos 6 digitos"})
    @IsOptional()
    senha: string;
}