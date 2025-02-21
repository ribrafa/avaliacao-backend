import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('/usuarios')
export class UsuarioController{
    @Post()
    async criaUsuario(@Body() dadosUsuario){
        var usuario = {
            dadosUsuario : dadosUsuario,
            status: "Usuario criado!"
        }
        return usuario;
    }
}

//sempre que tem @ é um decoretor. definnir um padrão para o que vem depois dele
// sempre que chamar o link/usuario vai cair nessa pagina.

//