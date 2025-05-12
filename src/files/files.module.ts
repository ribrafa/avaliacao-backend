import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { filesProviders } from "./files.providers";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports: [DatabaseModule],
    controllers:[FilesController],
    providers: [...filesProviders,
        FilesService,]
})

export class FilesModule{
    
}
