import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()

export class UsuariosArmazanados{
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){
        return this.#usuarios;
    }

    validaUsuario(dadosUsuario){
        var validacoes: string[] = [];
        if(!(dadosUsuario.id != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.nome != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.idade != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.cidade != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.email != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.telefone != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.senha != null)){
            validacoes.push("Id não pode ser nulo");
        }
        return validacoes
    }

}

