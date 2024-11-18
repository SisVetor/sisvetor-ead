import { Serializer } from "../services/api-generico-v2.service";

export const crudGenericoStoreName = "crud-generico";
export interface CrudGenerico {
    formControlName: string;
    placeholder: string;
    createEditPageTitle: string;
    listPageTitle: string;
    inputNameForFilter: string;
    api: string;
    formatarExibicaoItem: (item: any) => string;
    inputs: GenericInput[];
}

export enum GenericInputTypeEnum {
    TEXT,
    NUMBER,
    BOOLEAN,
    DATE,
}

export class BaseSerializer implements Serializer {
    fromJson(json: any) {
        return json;
    }

    toJson(item): any {
        return item;
    }
}

export interface GenericInput {
    type: GenericInputTypeEnum;
    formControlName: string;
    placeholder: string;
    required: boolean;
    defaultValue?: any;
    showInListPage: boolean;
}

export const funcoesPadrao = {
    configurarFormGroupPadrao: (crudGenerico: CrudGenerico, values: { [key: string]: any }) => {
        const formGroup = {};
        crudGenerico.inputs.forEach((input) => {
            formGroup[input.formControlName] = [values ? values[input.formControlName] : input.defaultValue];
        });
        return formGroup;
    },
};

export const urlsPadrao = {
    listar: "gerenciar",
    cadastrar: "gerenciar/cadastrar",
    editar: "gerenciar/editar",
};

const commonValues: CrudGenerico = {
    inputNameForFilter: "nome",
    inputs: [
        {
            formControlName: "nome",
            placeholder: "Nome",
            required: false,
            type: GenericInputTypeEnum.TEXT,
            showInListPage: true,
        },
        {
            formControlName: "descricao",
            placeholder: "Descrição",
            required: false,
            type: GenericInputTypeEnum.TEXT,
            showInListPage: false,
        },
        {
            formControlName: "ativo",
            placeholder: "Ativo",
            required: false,
            type: GenericInputTypeEnum.BOOLEAN,
            showInListPage: false,
        },
    ],
    formatarExibicaoItem: (item) => {
        if (item) {
            return item["nome"];
        }
    },
} as CrudGenerico;
/**
 * Para utilizar o componente crud genérico, adicione aqui as propriedades básicas
 */
export const recursos: { [key: string]: CrudGenerico } = {
    vetor: {
        api: "api/v1/vetores",
        createEditPageTitle: "Vetor",
        listPageTitle: "Vetores",
        placeholder: "Vetor",
        formControlName: "vetor",
        ...commonValues,
    },
    "tipo-vinculo": {
        api: "api/v1/tipos-vinculo",
        createEditPageTitle: "Tipo de Vínculo",
        listPageTitle: "Tipos de Vínculo",
        placeholder: "Tipo de Vínculo",
        formControlName: "tipoVinculo",
        ...commonValues,
    },
    "agentes-ativos": {
        api: "api/v1/vinculos/agentes-ativos",
        createEditPageTitle: "Agente",
        listPageTitle: "Agentes",
        placeholder: "Agente",
        formControlName: "agente",
        ...commonValues,
        inputNameForFilter: "pessoa.nome",
    },
    "codigos-ibge": {
        api: "api/v1/unidades/codigos-ibge",
        createEditPageTitle: "Código Ibge",
        listPageTitle: "Códigos Ibge",
        placeholder: "Código Ibge",
        formControlName: "codigoIbge",
        ...commonValues,
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["ibge"];
            }
        },
        inputNameForFilter: "ibge",
    },
    "tipo-zona": {
        api: "api/v1/tipos-zona",
        createEditPageTitle: "Tipo de Zona",
        listPageTitle: "Tipos de Zona",
        placeholder: "Tipo de Zona",
        formControlName: "tipoZona",
        ...commonValues,
    },
    "tipo-unidade": {
        api: "api/v1/tipos-unidade",
        createEditPageTitle: "Tipo de Unidade",
        listPageTitle: "Tipos de Unidade",
        placeholder: "Tipo de Unidade",
        formControlName: "tipoUnidade",
        ...commonValues,
    },
    "tipo-imovel": {
        api: "api/v1/tipos-imovel",
        createEditPageTitle: "Tipo de Imóvel",
        listPageTitle: "Tipos de Imóvel",
        placeholder: "Tipo de Imóvel",
        formControlName: "tipoImovel",
        ...commonValues,
    },
    "tipo-territorio": {
        api: "api/v1/tipos-territorio",
        createEditPageTitle: "Tipo de Território",
        listPageTitle: "Tipos de Território",
        placeholder: "Tipo de Território",
        formControlName: "tipoTerritorio",
        ...commonValues,
    },
    "origem-demanda": {
        api: "api/v1/origens-demanda",
        createEditPageTitle: "Origem Demanda",
        listPageTitle: "Origens de Demanda",
        placeholder: "Origem Demanda",
        formControlName: "origemDemanda",
        ...commonValues,
    },
    solicitante: {
        api: "api/v1/solicitantes",
        createEditPageTitle: "Solicitante",
        listPageTitle: "Solicitantes",
        placeholder: "Solicitante",
        formControlName: "solicitante",
        inputNameForFilter: "nome",
        ...commonValues,
    },
    "categoria-demanda": {
        api: "api/v1/categorias-demanda",
        createEditPageTitle: "Categoria Demanda",
        listPageTitle: "Categorias de Demanda",
        placeholder: "Categoria Demanda",
        formControlName: "categoriaDemanda",
        ...commonValues,
    },
    abrangencia: {
        api: "api/v1/abrangencias",
        createEditPageTitle: "Abrangência",
        listPageTitle: "Abrangências",
        placeholder: "Abrangência",
        formControlName: "abrangencia",
        ...commonValues,
    },
    "prioridade-demanda": {
        api: "api/v1/prioridades-demanda",
        createEditPageTitle: "Prioridade de Demanda",
        listPageTitle: "Prioridades de Demanda",
        placeholder: "Prioridade de Demanda",
        formControlName: "prioridadeDemanda",
        ...commonValues,
    },
    "situacao-demanda": {
        api: "api/v1/situacoes-demanda",
        createEditPageTitle: "Situação de Demanda",
        listPageTitle: "Situações de Demanda",
        placeholder: "Situação de Demanda",
        formControlName: "situacaoDemanda",
        ...commonValues,
    },
    "situacao-atividade": {
        api: "api/v1/situacoes-atividade",
        createEditPageTitle: "Situação de Atividade",
        listPageTitle: "Situações de Atividade",
        placeholder: "Situação de Atividade",
        formControlName: "situacaoAtividade",
        ...commonValues,
    },
    "tipo-ponto-estrategico": {
        api: "api/v1/tipos-pontos-estrategicos",
        createEditPageTitle: "Tipo de Ponto Estratégico",
        listPageTitle: "Tipos de Ponto Estratégico",
        placeholder: "Tipo de Ponto Estratégico",
        formControlName: "tipoPontoEstrategico",
        ...commonValues,
    },
    recurso: {
        api: "api/v1/recursos",
        createEditPageTitle: "Recurso",
        listPageTitle: "Recursos",
        placeholder: "Recurso",
        formControlName: "recurso",
        ...commonValues,
    },
    "nivel-gestao": {
        api: "api/v1/niveis-gestao",
        createEditPageTitle: "Nível de Gestão",
        listPageTitle: "Níveis de Gestão",
        placeholder: "Nível de Gestão",
        formControlName: "nivelGestao",
        inputNameForFilter: "nome",
        inputs: [
            {
                formControlName: "nome",
                placeholder: "Nome",
                required: false,
                type: GenericInputTypeEnum.TEXT,
                showInListPage: true,
            },
            {
                formControlName: "codigo",
                placeholder: "Código",
                required: false,
                type: GenericInputTypeEnum.TEXT,
                showInListPage: false,
            },
        ],
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    },
    cargo: {
        api: "api/v1/cargos",
        createEditPageTitle: "Cargo",
        listPageTitle: "Cargos",
        placeholder: "Cargo",
        formControlName: "cargo",
        inputNameForFilter: "nome",
        inputs: [
            {
                formControlName: "nome",
                placeholder: "Nome",
                required: false,
                type: GenericInputTypeEnum.TEXT,
                showInListPage: true,
            },
            {
                formControlName: "cbo",
                placeholder: "CBO",
                required: false,
                type: GenericInputTypeEnum.TEXT,
                showInListPage: false,
            },
            {
                formControlName: "sigla",
                placeholder: "Sigla",
                required: false,
                type: GenericInputTypeEnum.TEXT,
                showInListPage: false,
            },
        ],
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    },
    // Somente para o dropdown
    topico: {
        api: "api/v1/topicos",
        placeholder: "Tópico",
        formControlName: "topico",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "topico-relatorio": {
        api: "api/v1/topicos/relatorios",
        placeholder: "Tópico Relatório",
        formControlName: "topicoRelatorio",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    "formulario-topico": {
        api: "api/v1/topicos/formularios",
        placeholder: "Formulário",
        formControlName: "formularioTopico",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "grupo-territorio": {
        api: "api/v1/grupos-territorio",
        placeholder: "Grupo do Território",
        formControlName: "grupoTerritorio",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "tipo-atividade": {
        api: "api/v1/tipos-atividades",
        placeholder: "Tipo de Atividade",
        formControlName: "tipoAtividade",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "tipo-etiqueta": {
        api: "api/v1/tipos-etiqueta",
        placeholder: "Tipo de Etiqueta",
        formControlName: "tipoEtiqueta",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    pit: {
        api: "api/v1/pits",
        placeholder: "Ponto de Identificacao Triatomineo",
        formControlName: "pit",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "perfil-usuario": {
        api: "api/v1/perfis-usuarios",
        placeholder: "Perfil de Usuário",
        formControlName: "perfilUsuario",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    formulario: {
        api: "api/v1/formularios",
        placeholder: "Formulário",
        formControlName: "formulario",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    relatorio: {
        api: "api/v1/relatorios",
        placeholder: "Relatório",
        formControlName: "relatorio",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    unidade: {
        api: "api/v1/unidades",
        placeholder: "Unidade",
        formControlName: "unidade",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    laboratorio: {
        api: "api/v1/unidades",
        placeholder: "Unidade",
        formControlName: "unidade",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "pits-usuario": {
        api: "api/v1/unidades/unidades-usuario-marcador/PIT",
        placeholder: "PIT",
        formControlName: "pit",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "laboratorios-usuario": {
        api: "api/v1/unidades/unidades-usuario-marcador/LABORATORIO",
        placeholder: "Lboratório",
        formControlName: "laboratorio",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    dashboard: {
        api: "api/v1/dashboards",
        placeholder: "Dashboard",
        formControlName: "dashboard",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    "area-gestao": {
        api: "api/v1/areas-gestao",
        placeholder: "Área de Gestão",
        formControlName: "areaGestao",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    pessoa: {
        api: "api/v1/pessoas",
        placeholder: "Pessoa",
        formControlName: "pessoa",
        inputNameForFilter: "pessoa.nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    "dashboard-item": {
        api: "api/v1/dashboard-itens",
        placeholder: "Dashboard Item",
        formControlName: "dashboardItem",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    "template-importacao": {
        api: "api/v1/template-importacao",
        placeholder: "Template",
        formControlName: "template",
        inputNameForFilter: "nome",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["nome"];
            }
        },
    } as CrudGenerico,
    atividade: {
        api: "api/v1/atividades",
        placeholder: "Atividade",
        formControlName: "atividade",
        inputNameForFilter: "titulo",
        formatarExibicaoItem: (item) => {
            if (item) {
                return item["titulo"];
            }
        },
    } as CrudGenerico,
    "calendario-epidemiologico": {
        api: "api/v1/calendarios-epidemiologicos",
        placeholder: "Calendario",
        formControlName: "ano",
        inputNameForFilter: "ano",
        formatarExibicaoItem: (item) => {
            if (item) {
                return `${item.ano} - ${item.ativo ? "Ativo" : "Inativo"}`;
            }
        },
    } as CrudGenerico,
    "semana-epidemiologica": {
        api: "api/v1/semanas-epidemiologicas",
        placeholder: "Semana",
        formControlName: "semanaEpidemiologica",
        inputNameForFilter: "nrSemana",
        formatarExibicaoItem: (item) => {
            if (item) {
                return `${item.nrSemana} - de ${item.dataInicio.substring(0, 5)} a ${item.dataFim.substring(0, 5)}`;
            }
        },
    } as CrudGenerico,
    "porte-imovel": {
        api: "api/v1/portes-imovel",
        createEditPageTitle: "Porte do Imóvel",
        listPageTitle: "Portes de Imóvel",
        placeholder: "Porte do Imóvel",
        formControlName: "porteImovel",
        ...commonValues,
    },
};
