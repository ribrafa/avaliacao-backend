import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenado } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criarUsuarioDTO } from "./dto/usurio.dto";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { get } from "http";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { log } from "console";
import { ApiBadRequestResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
 

@ApiTags('usuario')
@Controller('/usuarios')
export class UsuarioController{
constructor(private clsUsuariosArmazenados: UsuarioArmazenado){}
    @Post()
    @ApiResponse({status: 201, description: "Retorna que houve sucesso"})
    @ApiBadRequestResponse({description: "Retorna que faltou alguma informação"})
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
                usuario.idade,
                usuario.cidade,
                usuario.email,
                usuario.telefone,
                usuario.senha

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

    @Post('/login')
    async login(@Body() dadosLogin: LoginUsuarioDTO){
        var login = this.clsUsuariosArmazenados.validarLogin(dadosLogin.email,dadosLogin.senha);
        return {
            status: login.login,
            usuario: login.login?login.usuario:null,
            message: login.login?"login efetuado":"usuario ou senhas invalidos",
            
        }
    }
}

//sempre que tem @ é um decoretor. definnir um padrão para o que vem depois dele
// sempre que chamar o link/usuario vai cair nessa pagina.

//