import { Module } from "@nestjs/common";
import { GeneroController } from "./genero.controller";
import { generoProviders } from "./genero.providers";
import { GeneroService } from "./genero.service";
import { DatabaseModule } from "../database/database.module"

@Module({
    imports: [DatabaseModule],
    controllers: [GeneroController],
    providers: [
        ...generoProviders,
        GeneroService,
    ],
})

export class GeneroModule {}