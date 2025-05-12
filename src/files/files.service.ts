import { Inject, Injectable } from '@nestjs/common';
import { FILES } from './files.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO } from 'src/dto/retorno.dto';
import * as path from 'path';

@Injectable()
export class FilesService {
    constructor(
        @Inject('FILES_REPOSITORY')
        private filesRepository: Repository<FILES>
        ) {}  
  
  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new FILES();
    
    var nome = file.filename.split('_id_');

    arquivo.ID = nome[0];
    arquivo.FILENAME = file.originalname;
    arquivo.CONTENTLENGTH = file.size;
    arquivo.CONTENTTYPE = file.mimetype;
    arquivo.URL = `${file.filename}`;

    return this.filesRepository.save(arquivo)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: arquivo.ID,
            message: "Arquivo inserido!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
  }

  async validaArquivo(ID: string){
    const possivelArquivo = this.filesRepository.findOne(
        {where: 
            {ID}
        }
    );
    return(possivelArquivo!==undefined)
  }

  async localizar(ID: string){
    const possivelArquivo = await this.filesRepository.findOne(
        {where: 
            {ID}
        }
    );
    return possivelArquivo
  }


}