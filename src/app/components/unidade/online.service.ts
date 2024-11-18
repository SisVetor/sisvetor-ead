import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "src/app/ConfigService";
import { ResourceService } from "../services/service-generico";
import { Unidade, UnidadeSerializer } from "./config";

@Injectable({
    providedIn: "root"
})
export class UnidadeOnlineService extends ResourceService<Unidade> {
    constructor(httpClient: HttpClient, configService: ConfigService) {
        super(httpClient, configService, "api/v1/unidades", new UnidadeSerializer());
    }
}
