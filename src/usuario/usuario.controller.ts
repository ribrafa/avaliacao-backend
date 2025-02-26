import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosArmazanados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";

@Controller('/usuarios')


export class UsuarioController{
    constructor(private clsUsuariosArmazenados: UsuariosArmazanados){
    }

    @Post()
    async criarUsuario(@Body() dadosUsuario){

        var validacoes = this.clsUsuariosArmazenados.validaUsuario(dadosUsuario);

        if(validacoes.length > 0){
            return {
                status: "Erro",
                validacoes: validacoes
            }
        }

        var novoUsuario = new UsuarioEntity(dadosUsuario.id, dadosUsuario.nome,
                                            dadosUsuario.idade, dadosUsuario.cidade,
                                            dadosUsuario.email, dadosUsuario.telefone,
                                            dadosUsuario.senha);
        this.clsUsuariosArmazenados.AdicionarUsuario(novoUsuario);

        var usuario = {
            dadosUsuario : novoUsuario,
            status: "Usuario Criado"
        }
        return usuario;
    }

    @Get()
    async listaUsuarios(){
        return this.clsUsuariosArmazenados.Usuarios;
    }

}

//sempre que tem @ é um decoretor. definnir um padrão para o que vem depois dele
// sempre que chamar o link/usuario vai cair nessa pagina.

//