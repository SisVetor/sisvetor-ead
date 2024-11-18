import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { QueryOptions } from "./query-options";
import { Page } from "../model/Page";
import { ConfigService } from "src/app/ConfigService";

export interface Serializer {
    fromJson(json: any): Resource;
    toJson(resource: Resource): any;
}

export class Resource {
    id: any;
    parentId?: number;
}

export class ResourceService<T extends Resource> {
    constructor(
        public httpClient: HttpClient,
        public configService: ConfigService,
        public endpoint: string,
        public serializer: Serializer
    ) {}

    public create(item: T): Observable<T> {
        return this.httpClient
            .post<T>(
                `${this.configService.config.defaultUrl}/${this.endpoint}`,
                this.serializer.toJson(item)
            )
            .pipe(map(data => this.serializer.fromJson(data) as T));
    }

    public update(item: T): Observable<T> {
        return this.httpClient
            .put<T>(
                `${this.configService.config.defaultUrl}/${this.endpoint}/${item.id}`,
                this.serializer.toJson(item)
            )
            .pipe
            // TODO: Caso o backend retorne o item atualizado
            // map(data => this.serializer.fromJson(data) as T)
            ();
    }

    read(id: number): Observable<T> {
        return this.httpClient
            .get(`${this.configService.config.defaultUrl}/${this.endpoint}/${id}`)
            .pipe(map((data: any) => this.serializer.fromJson(data) as T));
    }

    list(queryOptions: QueryOptions): Observable<Page<T>> {
        return this.httpClient
            .get(`${this.configService.config.defaultUrl}/${this.endpoint}?${queryOptions.toQueryString()}`)
            .pipe(map((data: any) => data));
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.configService.config.defaultUrl}/${this.endpoint}/${id}`);
    }
}
