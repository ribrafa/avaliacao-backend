import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { SenhaForte } from "src/validacao/senha-forte.validator";

export class criarUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome:string

    @IsInt()
    idade: Number;

    @IsString()
    cidade: string;

    @IsEmail(undefined,{message: "email é invalido"})
    email: string;

    @IsString()
    telefone: string;

    @MinLength(8,{message: "Senha precisa de pelo menos 8 digitos"})
    @SenhaForte({message:"Senha muito fraca. Tente Novamente"})
    senha: string;
}


