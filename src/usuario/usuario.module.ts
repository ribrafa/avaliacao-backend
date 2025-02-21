import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";

@Module({
    imports:[],
    controllers:[UsuarioController],
    providers:[]
})

export class UsuarioModule{}

//nesse caso o decorater precisa dessas orientações, diferente do arquivo controller