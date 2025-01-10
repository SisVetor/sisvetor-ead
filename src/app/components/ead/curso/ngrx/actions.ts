import { createAction, props } from "@ngrx/store";

import Usuario from "src/app/components/model/Usuario";
import { UsuarioCurso } from "../config";

export const ListarLocalmente = createAction(
    "[Curso] Listar do localStorage",
    props<{ query: Map<string, string>; sort: string; order: string; page: number; size: number; limit: number,  usuario: Usuario  }>()
);

export const ListadoLocalmenteComSucesso = createAction(
    "[Curso] Listado com Sucesso",
    props<{ entityList: UsuarioCurso[]; totalElements: number,  usuario: Usuario  }>()
);


export const ListadoLocalmenteComErro = createAction("[Curso] Listado com Erro", props<{ erro: any }>());

export const ListarNuvem = createAction(
    "[Curso] Listar do backend",
    props<{ query: Map<string, string>; sort: string; order: string; page: number; size: number; limit: number }>()
);

export const ListarNuvemSucesso = createAction(
    "[Curso] Listado Nuvem com Sucesso",
    props<{ entityList: UsuarioCurso[]; totalElements: number,  usuario: Usuario  }>()
);

export const ListarNuvemErro = createAction("[Curso] Listado Nuvem com Erro", props<{ erro: any }>());


export const Inscrever = createAction(
    "[Curso] Inscrever",
    props<{ usuarioCurso: UsuarioCurso}>()
);

export const InscreverSucesso = createAction(
    "[Curso] Inscrever com Sucesso",
    props<{ usuarioCurso: UsuarioCurso }>()
);

export const InscreverErro = createAction("[Curso] Inscrever com Erro", props<{ usuarioCurso: UsuarioCurso, erro: any }>());

export const ContinuarCurso = createAction(
    "[Curso] Continuar Curso",
    props<{ usuarioCurso: UsuarioCurso }>()
);

export const ContinuarCursoSucesso = createAction(
    "[Curso] Continuar Curso com Sucesso",
    props<{ usuarioCurso: UsuarioCurso  }>()
);

export const ContinuarCursoErro = createAction("[Curso] Continuar Curso com Erro", props<{ erro: any }>());