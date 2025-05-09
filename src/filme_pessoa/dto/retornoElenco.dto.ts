import { listaPessoaDTO } from "src/pessoa/dto/listaPessoa.dto";

export class RetornoElencoDTO{
    IDFILME: string;
    elenco: listaPessoaDTO[];
}