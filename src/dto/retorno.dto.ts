import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RetornoCadastroDTO{
    id: string;
    message: string;
}

export class RetornoObjDTO{
    return: any;
    message: string;
}