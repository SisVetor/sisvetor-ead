import { PerfilUsuario } from '../../model/PerfilUsuario';
import Usuario from '../../model/Usuario';
import { Serializer } from '../../services/api-generico-v2.service';
import { Curso } from "../curso/config";

export const cursoPerfilUsuarioStoreName = "CursoPerfilUsuario";
export interface CursoPerfilUsuario {
    id: { cursoId: number; perfilUsuarioId: number };
    curso: Curso;
    perfilUsuario: PerfilUsuario;
    dataCriacao: string;
    dataUltimaModificacao: string;
    criadoPor: Usuario;
    ultimaModificacaoPor: Usuario;
}

export class BaseSerializer implements Serializer {
    fromJson(json: any): CursoPerfilUsuario {
        return {
            id: json.id,
            curso: json.curso,
            perfilUsuario: json.perfilUsuario,
            dataCriacao: json.dataCriacao,
            dataUltimaModificacao: json.dataUltimaModificacao,
            criadoPor: json.criadoPor,
            ultimaModificacaoPor: json.ultimaModificacaoPor
        };
    }

    toJson(item: CursoPerfilUsuario): any {
        return {
            id: item.id,
            curso: item.curso,
            perfilUsuario: item.perfilUsuario,
            dataCriacao: item.dataCriacao,
            dataUltimaModificacao: item.dataUltimaModificacao,
            criadoPor: item.criadoPor,
            ultimaModificacaoPor: item.ultimaModificacaoPor
        };
    }
}

export const nomesPadrao = {
    dropdownNomeFormControl: "cursoPerfilUsuario",
    dropdownPlaceholder: "CursoPerfilUsuario",
    formTitulo: "CursoPerfilUsuario",
    listarTitulo: "CursoPerfilUsuarios",
    storeNome: "cursoPerfilUsuario",
    configurarFormGroupPadrao: (item: any) => {
        return {
            curso: [item && item.curso ? item.curso : null],
            perfilUsuario: [item && item.perfilUsuario ? item.perfilUsuario : null]
        };
    },
    toString: (item: any) => {
        return item.demanda.titulo;
    }
};

export const urlsPadrao = {
    api: "api/v1/curso-perfil-usuario",
    listar: "curso-perfil-usuario",
    cadastrar: "curso-perfil-usuario/cadastrar",
    editar: "curso-perfil-usuario/editar"
};
