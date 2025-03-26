import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criarFilmeDTO{
    @IsString()
    
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @ApiProperty({
        example: 'Senhor dos Aneis',
        description: 'Esse campo vai ser utilizado como identificação do nome do Filme'
    })
    nome:string

    @IsInt()
    @ApiProperty({
        example: 90,
        description: 'Esse campo vai ser utilizado como identificação da duração do Filme em minutos'
    })
    duracao: Number;

    @IsString()
    @ApiProperty({
        example: 'O Senhor dos Anéis é um filme que conta a história de Sauron, que planeja um grande ataque a Minas Tirith, capital de Gondor. Gandalf e Pippin partem para o local na intenção de ajudar a resistência.',
        description: 'Esse campo vai ser utilizado para a descrição do Filme'
    })
    sinopse: string;

    @IsInt()
    @ApiProperty({
        example: '1994',
        description: 'Esse campo vai ser utilizado como identificação da duração do Filme em minutos'
    })
    ano: string;

    @IsString()
    @ApiProperty({
        example: 'Guerra/Ação',
        description: 'Esse campo vai ser utilizado como identificação da duração do Filme em minutos'
    })
    genero: string;
}