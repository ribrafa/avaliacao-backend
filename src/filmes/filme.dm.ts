//data module do modulo de usuário, responsável por guardar os dados de usuários e manipular os dados armazenados
import { Injectable } from "@nestjs/common";
import { FilmeEntity } from "./filme.entity";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";

//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class FilmesArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #filmes: FilmeEntity[] = [];  
  

    //funçaço responsável por guardar o usuário no vetor
    AdicionarFilme(filme: FilmeEntity){
        this.#filmes.push(filme);
    }

    //função responsável por remover o usuário
    async removeFilme(id:string){
        //pesquisa usuário pelo id passado para retornar ele 
        const filme = this.pesquisaId(id);

        //filtra removendo o usário informado
        this.#filmes = this.#filmes.filter(
            filmesalvo => filmesalvo.id !== id
        )

        return filme
    }

    //função responsável por pesquisar usuário que tenham o ID especificado
    pesquisaId(id:string){
        const possivelfilme = this.#filmes.find(
            filmesalvo => filmesalvo.id === id
        );

        if(!possivelfilme){
            throw new Error('filme não encontrado');//cria um erro quando o usuário não é encontrado
        }

        return possivelfilme
    }

    //função responsável por alterar o usuário
    alteraFilme(id:string,dadosNovos: alteraFilmeDTO){
        //pesquisa o usuário que vai ser alterado
        const filme = this.pesquisaId(id);

        //aqui os dados que são recebidos no JSon são convertidos para uma tabela de chave e valor, para isolar os dados recebidos
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                //aqui é validado se o campo a ser alterado vai ser o ID, se for ele ignora, pois não se pode alterar o ID
                if(chave === 'id'){
                    return
                }

                //caso não seja nenhum campo especial, é feito só a alteração direta do valor do campo com base no valor passado 
                filme[chave] = valor;
            }
        )

        return filme;
        
    }

    
    //função para retornar todos os filmes
    get filmes(){        
        return this.#filmes;
    }
}