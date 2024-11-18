
import { Serializer } from "../../services/api-generico-v2.service";
import { Curso } from "../curso/config";
export const moduloCursoStoreName = "moduloCurso";
export interface ModuloCurso {
    id: number;
    curso: Curso;
    nome: string;
    descricao: string;
    cargaHoraria: number;
    introducao: string;
    ordem: number;
}

export class ModuloCursoSerializer implements Serializer {
    fromJson(json: any): ModuloCurso {
        return {
            id: json.id,
            curso: json.curso,
            nome: json.nome,
            descricao: json.descricao,
            cargaHoraria: json.cargaHoraria,
            ordem: json.ordem,
            introducao: json.introducao
        };
    }

    toJson(item: ModuloCurso): any {
        return {
            id: item.id,
            nome: item.nome,
            curso: item.curso,
            descricao: item.descricao,
            cargaHoraria: item.cargaHoraria,
            ordem: item.ordem,
            introducao: item.introducao
        };
    }
}

export function configurarFormGroupPadrao(item: ModuloCurso) {
    return {
        nome: [item && item.nome ? item.nome : ""],
        curso: [item && item.curso ? item.curso : null],
        descricao: [item && item.descricao ? item.descricao : ""],
        ordem: [item && item.ordem ? item.ordem : ""],
        introducao: [item && item.introducao ? item.introducao : ""],
        cargaHoraria: [item && item.cargaHoraria ? item.cargaHoraria : ""]
    };
}



export const urlsPadrao = {
    api: "api/v1/modulos-cursos"
};
