import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { SenhaForte } from "src/validacao/senha-forte.validator";

export class criarUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiProperty({
        example: 'Roberto Silva',
        description: 'Esse campo vai ser utilizado como identificação do nome usuario'
    })
    nome:string

    @IsInt()
    @ApiProperty({
        example: 19,
        description: 'Esse campo vai ser utilizado como identificação da idade do usuario'
    })
    idade: Number;

    @IsString()
    @ApiProperty({
        example: '1700000',
        description: 'CEP precisa ter no minimo 8 caracteres'
    })
    cep: string;

    @IsString()
    @ApiProperty({
        example: 'Apartamento 42',
        description: 'Esse campo vai ser utilizado como identificação do Complemento'
    })
    complemento: string;

    // @IsString()
    // @ApiProperty({
    //     example: 'Bauru,SP',
    //     description: 'Esse campo vai ser utilizado como identificação da cidade do usuario'
    // })
    // cidade: string;

    @IsEmail(undefined,{message: "email é invalido"})
    @ApiProperty({
        example: 'robertosilva@email.com',
        description: 'Esse campo vai ser utilizado como identificação do email do usuario'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '123456789',
        description: 'Esse campo vai ser utilizado como identificação do numero do celular do usuario'
    })
    telefone: string;

    @MinLength(8,{message: "Senha precisa de pelo menos 8 digitos"})
    @SenhaForte({message:"Senha muito fraca. Tente Novamente"})
    @ApiProperty({
        example: 'Senha@123456',
        description: 'A senha deve conter numeros, letras maiusculas e minuscula e pelo menos um caractere especial, como exemplo(.,/!@#) '
    })
    senha: string;
}


