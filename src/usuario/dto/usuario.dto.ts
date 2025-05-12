//DTO responsável por receber dados de criação de um novo usuário
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SenhaForte } from "../validacao/strongpass.validator";
import { CriaPessoaDTO } from "src/pessoa/dto/criaPessoa.dto";

export class criaUsuarioDTO{

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @ApiProperty({
        example: "joao@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    EMAIL: string;

    @MinLength(8, {message: "senha deve ter no minimo 8 digitos"})
    @ApiProperty({
        example: "Senha@444151241",
        description: "Senha do usuário, deve ter pelo menos 8 digitos, tendo numeros, letras e caracteres especiais"
    })
    @SenhaForte({message:"Senha deve ter complexidade maior. Está muito fraca"})
    SENHA:string;

    @IsString()
    @ApiProperty({
        example: "Bauru",
        description: "Cidade do usuário, deve ser informado um texto com a cidade"
    })
    CIDADE: string;

    @IsString()
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    TELEFONE: string;

    @IsNotEmpty()
    @ApiProperty({
        example: '{"NOME": "JOAO" , "NASCIMENTO": "1995-01-01", "PAIS":"BRASIL"}',
        description: "DADOS do usuário, deve ser informado um objeto com os dados descritos"
    })
    PESSOA: CriaPessoaDTO;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: '8e42a2a5-56c8-4f2f-a3ea-eed61beffe05',
        description: "ID Da foto do usuário, que deve ser inserido pelo modulo de FILES, depois enviado o ID."
    })
    FOTO: string;
    


}