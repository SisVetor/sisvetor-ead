export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
}

export class QueryOptions implements QueryBuilder {
    mapa: Map<string, string>;
    sort: string;
    order: string;
    page: number;
    size: number;
    limit: number;

    constructor(
        mapa: Map<string, string>,
        sort: string,
        order: string,
        page: number,
        size: number = 30,
        limit: number
    ) {
        this.mapa = mapa;
        this.sort = sort;
        this.order = order;
        this.page = page;
        this.size = size;
        this.limit = limit;
    }

    toQueryMap() {
        let queryMap = new Map<string, string>();

        if (this.mapa) {
            this.mapa.forEach((value: string, key: string) => {
                if (value !== undefined && value !== null && value !== "") {
                    if (Array.isArray(value)) {
                        queryMap.set(key, value);
                        return;
                    }
                    queryMap.set(key, `${value}`);
                }
            });
        }

        if (this.sort && this.order) {
            queryMap.set("sort", `${this.sort},${this.order}`);
        }

        if (this.limit) {
            queryMap.set("limit", `${this.limit}`);
        }

        if (this.page != undefined) {
            queryMap.set("page", `${this.page}`);
        }

        if (this.size != undefined) {
            queryMap.set("size", `${this.size}`);
        }

        return queryMap;
    }

    toQueryString() {
        let queryString = "";
        this.toQueryMap().forEach((value: string, key: string) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    queryString = queryString.concat(`${key}=${item}&`);
                });
                return;
            }
            queryString = queryString.concat(`${key}=${value}&`);
        });

        return queryString.substring(0, queryString.length - 1);
    }
}
