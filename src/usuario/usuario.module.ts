import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenado } from "./usuario.dm";
import { FilmesModule } from "src/filme/filmes.module";
import { StrongPassValidator } from "src/validacao/senha-forte.validator";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports:[HttpModule],
    controllers:[UsuarioController],
    providers:[UsuarioArmazenado, StrongPassValidator]
})

export class UsuarioModule{}

//nesse caso o decorater precisa dessas orientações, diferente do arquivo controller