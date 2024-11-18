import { Serializer } from '../services/service-generico';
export interface Unidade {
    id: number;
    nome: string;
    sigla: string;
    unidadeSuperior: Unidade;
    areaGestao: AreaGestao;
    tipoUnidade: TipoUnidade;
}

export interface TipoUnidade {
    id: number;
    nome: string;
    ativo: boolean;
}

export interface AreaGestao {
    id: number;
    codigoIbge: string;
    nome: string;
    sigla: string;
    nivel: NivelGestao;
    areaGestaoSuperior: AreaGestao;
}

export interface NivelGestao {
    id: number;
    nome: string;
}

export class UnidadeSerializer implements Serializer {
    fromJson(json: any): Unidade {
        return {
            id: json.id,
            nome: json.nome,
            sigla: json.sigla,
            unidadeSuperior: json.unidadeSuperior,
            areaGestao: json.areaGestao,
            tipoUnidade: json.tipoUnidade
        };
    }

    toJson(unidade: Unidade): any {
        return {
            id: unidade.id,
            nome: unidade.nome,
            sigla: unidade.sigla,
            unidadeSuperior: unidade.unidadeSuperior,
            areaGestao: unidade.areaGestao,
            tipoUnidade: unidade.tipoUnidade
        };
    }
}

export function formatarExibicaoUnidade(unidade: Unidade) {
    return unidade.nome;
}
export const pitStoreName = "pits";

export const laboratorioStoreName = "laboratorios";