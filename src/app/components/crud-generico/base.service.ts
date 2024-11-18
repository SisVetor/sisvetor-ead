import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "src/app/ConfigService";

import { ResourceService } from "../services/api-generico-v2.service";
import { BaseSerializer } from "./base.config";
import { EntidadeBase } from "./base.model";

@Injectable({
    providedIn: "root",
})
export class CrudGenericoOnlineService extends ResourceService<EntidadeBase> {
    constructor(httpClient: HttpClient, configService: ConfigService) {
        super(httpClient, configService, "crud-generico-deve-ser-implementado", new BaseSerializer());
    }
}
