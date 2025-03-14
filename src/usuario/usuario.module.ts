import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenado } from "./usuario.dm";
import { FilmesModule } from "src/filme/filmes.module";

@Module({
    imports:[],
    controllers:[UsuarioController],
    providers:[UsuarioArmazenado]
})

export class UsuarioModule{}

//nesse caso o decorater precisa dessas orientações, diferente do arquivo controller