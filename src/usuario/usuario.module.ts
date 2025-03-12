import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenado } from "./usuario.dm";

@Module({
    imports:[],
    controllers:[UsuarioController],
    providers:[UsuarioArmazenado]
})

export class UsuarioModule{}

//nesse caso o decorater precisa dessas orientações, diferente do arquivo controller