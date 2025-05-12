import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { USUARIO } from './usuario.entity';
import { criaUsuarioDTO } from './dto/usuario.dto';
import { alteraUsuarioDTO } from './dto/alteraUsuario.dto';
import { PESSOA } from 'src/pessoa/pessoa.entity';
import { PessoaService } from 'src/pessoa/pessoa.service';
import Datas from 'src/utils/data';



@Injectable()
export class USUARIOService {
  objDatas: Datas;
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
    private readonly pessoaService: PessoaService,
  ) {
    this.objDatas = new Datas();
  }

  async listar(): Promise<any[]> {

    var usuarios = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
      .addSelect('usuario.foto', 'FOTO')
      .addSelect('usuario.email', 'EMAIL')
      .leftJoin('PESSOA', 'PS', 'usuario.idpessoa = PS.id')
      .getRawMany());
    return usuarios;
  }

  async listarID(ID: string): Promise<any> {

    var usuario = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
      .addSelect('usuario.email', 'EMAIL')
      .addSelect('usuario.foto', 'FOTO')
      .leftJoin('PESSOA', 'PS', 'usuario.idpessoa = PS.id')
      .andWhere('usuario.ID = :ID', { ID: `${ID}` })
      .getRawOne());
    return usuario;
  }

  async adicionaAssinatura(id: string, dias: number) {
    const usuario = await this.localizarID(id);

    usuario.ASSINATURA = this.objDatas.adicionarDias(usuario.ASSINATURA, dias);
    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO alterado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }

  async inserir(dados: criaUsuarioDTO): Promise<RetornoCadastroDTO> {
    let usuario = new USUARIO();
    usuario.ID = uuid();

    let retornoPessoa = await this.pessoaService.inserir(dados.PESSOA)
    let pessoa = await this.pessoaService.localizarID(retornoPessoa.id)

    usuario.CIDADE = dados.CIDADE;
    usuario.EMAIL = dados.EMAIL;
    usuario.trocaSenha(dados.SENHA)
    usuario.TELEFONE = dados.TELEFONE;
    usuario.ASSINATURA = this.objDatas.dataAtual();
    usuario.PESSOA = pessoa;
    usuario.FOTO = dados.FOTO;


    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO cadastrado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      })


  }

  async localizarID(ID: string): Promise<USUARIO> {
    const objeto = await this.usuarioRepository.findOne({
      where: {
        ID,
      },
    });

    if (!objeto) {
        throw new Error(`PESSOA com ID ${ID} não encontrado`);
    }

    return objeto;
  }

  async retornaAssinatura(ID: string) {
    //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista usuario DTO)
    var usuario = await this.localizarID(ID);

    var diferenca = this.objDatas.diferencaDias(usuario.ASSINATURA)

    return {
      validadeAssinatura: diferenca
    };
  }


  async localizarEmail(EMAIL: string): Promise<USUARIO> {
    const objeto = await this.usuarioRepository.findOne({
      where: {
        EMAIL,
      },
    });

    if (!objeto) {
        throw new Error(`PESSOA com EMAIL ${EMAIL} não encontrado`);
    }

    return objeto;
  }

  async Login(email: string, senha: string) {
    //primeiro é pesquisado o usuário por meio do email
    const possivelUsuario = await this.localizarEmail(email)

    return {
      //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
      usuario: possivelUsuario ? (possivelUsuario.login(senha) ? possivelUsuario : null) : null,
      status: possivelUsuario ? possivelUsuario.login(senha): false
    };
  }

  async validaEmail(emailNovo: string) {
    const possivelUsuario = await this.localizarEmail(emailNovo)

    return (possivelUsuario == null)
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);

    return this.usuarioRepository.remove(usuario)
      .then((result) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "USUARIO excluido!"
        };
      })
      .catch((error) => {
        return <RetornoObjDTO>{
          return: usuario,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: alteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        }
        else if (chave === 'PESSOA') {
          this.pessoaService.alterar(usuario.IDPESSOA, valor)
        }
        else{
          usuario[chave] = valor;
        }
      }
    )

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: usuario.ID,
          message: "USUARIO alterado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }
}