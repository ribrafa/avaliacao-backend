import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import e from "express";


@Injectable()

export class UsuarioArmazenado{
    #usuario: UsuarioEntity [] = [];
 
    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuario.push(usuario);
    }
 
    get usuario(){
        return this.#usuario;
    }

    async removeUsuario(id: string){
        const usuario = this.buscarPorID(id);

        this.#usuario = this.#usuario.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario;
    }


    atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>){
        const usuario = this.buscarPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave,valor]) => {
                if(chave === 'id'){
                    return
                }
                else if (chave === 'senha'){
                    return
                }
            
                if (valor === undefined){
                    return
                }

            usuario[chave] = valor;
            }
        )
        return usuario;
    }

    private buscarPorID(id: string){
        const possivelUsuario = this.#usuario.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if (!possivelUsuario){
            throw new Error('Usuario nao econtrado')
        }
        return possivelUsuario
    }

    private buscarPorEmail(email: string){
        const possivelUsuario = this.#usuario.find(
            usuarioSalvo => usuarioSalvo.email === email
        )

        if (!possivelUsuario){
            throw new Error('Usuario nao econtrado')
        }
        return possivelUsuario
    }

    validarLogin(email:string,senha:string){
        const usuario = this.buscarPorEmail(email)
        return{
            login: usuario.Login(senha),
            usuario: usuario
        };
        
    }
 
    async validarEmail(email: string): Promise<boolean>{
        const possivelUsuario = this.#usuario.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
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




