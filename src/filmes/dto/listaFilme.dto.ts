
//classe DTO para retorno de listagem padronizada de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
export class ListaFilmeDTO{
    //dtos de resposta normalmente não tem nenhuma validação, apenas o constructor com os campos a serem retornados
    constructor(
            readonly id: string, 
            readonly nome:string,
            readonly duracao: number,
            readonly sinopse: string
    ){}
}

export class ListagemFilmesDTO{
    constructor(
        readonly filme: ListaFilmeDTO[],
    ){}
}