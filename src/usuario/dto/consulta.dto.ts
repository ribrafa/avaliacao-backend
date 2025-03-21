export class ListaUsuarioDTO{
    constructor(
        readonly id: String,
        readonly nome: string,
        readonly idade: Number,
        readonly cidade: String,
        readonly email: String,
        readonly telefone: string,
        readonly senha: string
    ){}
}