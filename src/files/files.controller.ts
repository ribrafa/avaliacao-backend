import {Controller,Post,UseInterceptors,UploadedFile,Req, Get, Param, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';
import { FilesService } from './files.service';
  
@Controller('/files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('arquivo', multerConfig))
    async uploadArquivo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.fileService.salvarDados(file, req);
    }

    @Get(':imgid')
    async retornaArquivo(@Param('imgid') image, @Res() res){
        let img = await this.fileService.localizar(image);
        if (img)
            return res.sendFile(img.URL,{root: './upload/'})
        else
            return res.sendFile('',{root: './upload/'})
    }
}