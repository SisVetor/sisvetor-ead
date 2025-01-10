import { Validators } from "@angular/forms";

import Usuario from "../../model/Usuario";
import { Serializer } from "../../services/api-generico-v2.service";
import { CursoPerfilUsuario } from "../curso-perfil-usuario/config";
import { ModuloCurso } from "../modulo/config";

export interface Curso {
    id: number;
    nome: string;
    sigla: string;
    descricao: string;
    cargaHoraria: number;
    perfisUsuario: CursoPerfilUsuario[];
    modulos: ModuloCurso[]
}



export interface Material {
    id: number;
    modulo: ModuloCurso;
    nome: string;
    sigla: string;
    descricao: string;
    cargaHoraria: number;
    tipoMaterial: TipoMaterial;
}

export interface UsuarioCurso {
    id: number;
    dataInscricao: Date;
    curso: Curso;
    usuario: Usuario;
    dataUltimoAcesso: Date;
    status:StatusUsuarioCurso;
    numeroTentativas: number;
}
export interface UsuarioModulo {
    id: number;
    modulo: ModuloCurso;
    usuarioCurso: UsuarioCurso;
    dataUltimoAcesso: Date;
    status: StatusUsuarioCurso;
}

export interface UsuarioMaterial {
    id: number;
    material: Material;
    usuarioModulo: UsuarioModulo;
    dataAcesso: Date;
}

export enum StatusUsuarioCurso {
    NAO_INICIADO,
    EM_ANDAMENTO,
    REPROVADO,
    CONCLUIDO
}

export class UsuarioCursoSerializer implements Serializer {
    fromJson(json: any): UsuarioCurso {
        return {
            id: json.id,
            dataInscricao: json.dataInscricao,
            curso: json.curso,
            usuario: json.usuario,
            dataUltimoAcesso: json.dataUltimoAcesso,
            status: json.status,
            numeroTentativas: json.numeroTentativas
        };
    }

    toJson(usuarioCurso: UsuarioCurso): any {
        return {
            id: usuarioCurso.id,
            dataInscricao: usuarioCurso.dataInscricao,
            curso: usuarioCurso.curso,
            usuario: usuarioCurso.usuario,
            dataUltimoAcesso: usuarioCurso.dataUltimoAcesso,
            status: usuarioCurso.status,
            numeroTentativas: usuarioCurso.numeroTentativas
        };
    }
}

export class CursoSerializer implements Serializer {
    fromJson(json: any): Curso {
        return {
            id: json.id,
            nome: json.nome,
            descricao: json.descricao,
            sigla: json.sigla,
            cargaHoraria: json.cargaHoraria,
            perfisUsuario: json.perfisUsuario,
            modulos: json.modulos
        };
    }

    toJson(curso: Curso): any {
        return {
            id: curso.id,
            nome: curso.nome,
            sigla: curso.sigla,
            cargaHoraria: curso.cargaHoraria,
            descricao: curso.descricao,
            perfisUsuario: curso.perfisUsuario
        };
    }
}

enum TipoMaterial {
    PDF,
    PPT,
    LINK,
    VIDEO,
    IMAGEM
}

export function configurarFormGroupPadrao(curso: Curso) {
    
    return {
        nome: [curso?.nome ?? ""],
        sigla: [curso?.sigla ?? ""],
        descricao: [curso?.descricao ?? ""],
        cargaHoraria: [curso?.cargaHoraria ?? ""],
        itinerariosFormativos: [curso?.perfisUsuario ?? []],
        modulos: [curso?.modulos ?? []],
        id: [curso?.id ?? null, curso?.id ? Validators.required : []]
    };
}

export function formatarExibicaoItem(curso: Curso) {
    return curso.sigla + " - "+curso.nome ;
}

export function formatarExibicaoItemDropdown(curso: Curso) {
    return curso.sigla + " - "+curso.nome ;
}

export const usuarioCursoStoreName = "usuarioscursos";

export const urlsPadrao = {
    api: "api/v1/usuario-cursos",
    listar: "usuario-cursos",
    cadastrar: "usuario-cursos/cadastrar",
    editar: "usuario-cursos/editar"
};
