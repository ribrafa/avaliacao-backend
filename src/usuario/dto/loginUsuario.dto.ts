import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUsuarioDTO{

    @IsEmail(undefined,{message: "email é invalido"})
    email: string;

    @MinLength(6,{message: "Senha precisa de pelo menos 6 digitos"})
    senha: string;
}