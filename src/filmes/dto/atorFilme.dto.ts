import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional,IsString } from "class-validator";

export class atorFilmeDTO{
    @IsString()
    @IsNotEmpty({message: "ID Não pode ser vazio"})
    @ApiPropertyOptional({
        example: '',
        description: `Deve ser inforado o ID do ator a ser vinculado ao filme.`,
    })
    IDATOR:string;
    
    @IsString()
    @ApiPropertyOptional({
        example: '',
        description: `Deve ser informado o ID do filme a vincular com o ATOR.`,
    })
    IDFILME: string;

    @IsString()
    @ApiPropertyOptional({
        example: 'ATOR',
        description: `Deve ser informado a função no filme, como ATOR, DIRETOR.`,
    })
    FUNCAO: string;

}