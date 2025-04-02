import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { SenhaForte } from "src/validacao/senha-forte.validator";

export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    @ApiProperty({
        example: 'Roberto Silva',
        description: 'Esse campo vai ser utilizado como identificação do nome usuario'
    })
    nome:string

    @IsInt()
    @IsOptional()
    @ApiProperty({
        example: 19,
        description: 'Esse campo vai ser utilizado como identificação da idade do usuario'
    })
    idade: Number;


    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '1700000',
        description: 'Esse campo vai ser utilizado como identificação do CEP'
    })
    cep: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Apartamento 42',
        description: 'Esse campo vai ser utilizado como identificação do Complemento'
    })
    complemento: string;

    @IsEmail(undefined,{message: "email é invalido"})
    @IsOptional()
    @ApiProperty({
        example: 'robertosilva@email.com',
        description: 'Esse campo vai ser utilizado como identificação do email do usuario'
    })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '123456789',
        description: 'Esse campo vai ser utilizado como identificação do numero do celular do usuario'
    })
    telefone: string;

    @MinLength(8,{message: "Senha precisa de pelo menos 8 digitos"})
    @SenhaForte({message:"Senha muito fraca. Tente Novamente"})
    @IsOptional()
    @ApiProperty({
        example: 'Senha@123456',
        description: 'A senha deve conter numeros, letras maiusculas e minuscula e pelo menos um caractere especial, como exemplo(.,/!@#) '
    })
    senha: string;
}