import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuariosArmazanados } from "./usuario.dm";

@Module({
    imports:[],
    controllers:[UsuarioController],
    providers:[UsuariosArmazanados]
})

export class UsuarioModule{}

//nesse caso o decorater precisa dessas orientações, diferente do arquivo controller