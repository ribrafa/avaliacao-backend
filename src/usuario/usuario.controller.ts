import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenado } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criarUsuarioDTO } from "./dto/usurio.dto";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
 
@Controller('/usuarios')
export class UsuarioController{
constructor(private clsUsuariosArmazenados: UsuarioArmazenado){
 
}
    @Post()
    async criaUsuario(@Body() dadosUsuario: criarUsuarioDTO){
 
        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade,
            dadosUsuario.cidade, dadosUsuario.email, dadosUsuario.telefone, dadosUsuario.senha);
        this.clsUsuariosArmazenados.AdicionarUsuario(novoUsuario);
 
        var usuario = {
            dadosUsuario : dadosUsuario,
            status: "Usuario Criado"
        }
        return usuario;
    }
 
    @Get()
    async listaUsuarios(){
       
        const usuariosListados = this.clsUsuariosArmazenados.usuario;
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );
       
        return listaRetorno;
    }
 
    @Put ('/:id')
    async atualizaUsuario(@Param ('id') id:string, @Body() novosDados: alteraUsuarioDTO){
        const usuarioAtualizado = await this.clsUsuariosArmazenados.atualizaUsuario(id, novosDados)
 
        return{
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const UsuarioRemovido = await this.clsUsuariosArmazenados.removeUsuario(id)

        return{
            usuario: UsuarioRemovido,
            message: 'Usuario Removido'
        }
    }
}

//sempre que tem @ é um decoretor. definnir um padrão para o que vem depois dele
// sempre que chamar o link/usuario vai cair nessa pagina.

//