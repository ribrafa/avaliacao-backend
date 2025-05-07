//DTO de resposta padrão, onde é utilizado como padrão para retornos de alteração, exclusão ou inclusão de dados de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { FilmeEntity } from "../filme.entity";

export class RetornoFilmeDTO{
    constructor(
        readonly status: string,
        readonly filme: FilmeEntity
        ){}
}