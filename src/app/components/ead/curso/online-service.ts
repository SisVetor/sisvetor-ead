import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ConfigService } from "src/app/ConfigService";
import { Page } from "../../model/Page";
import { ResourceService } from "../../services/api-generico-v2.service";
import { QueryOptions } from "../../services/query-options";
import { CursoSerializer, UsuarioCurso } from "./config";

@Injectable({
    providedIn: "root"
})
export class UsuarioCursoOnLineService extends ResourceService<UsuarioCurso> {
    constructor(httpClient: HttpClient, configService: ConfigService) {
        super(httpClient, configService, "api/v1/usuario-cursos", new CursoSerializer());
    }
    listarCursos(queryOptions: QueryOptions): Observable<Page<UsuarioCurso>> {
        const href = `${this.configService.config.defaultUrl}/api/v1/usuario-cursos/lista-cursos-usuario?${queryOptions.toQueryString()}`;

        return this.httpClient.get(href).pipe(map((data: any) => data));
    }
}