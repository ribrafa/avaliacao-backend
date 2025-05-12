
//classe DTO para retorno de listagem padronizada de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
export class ListaUsuarioDTO{
    //dtos de resposta normalmente não tem nenhuma validação, apenas o constructor com os campos a serem retornados
    constructor(
            readonly id: string, 
            readonly nome:string,
            readonly email: string,
            readonly foto:string
    ){}
}

export class ListagemUsuariosDTO{
    constructor(
        readonly usuario: ListaUsuarioDTO[],
    ){}
}