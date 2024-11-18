import { Formulario } from "src/app/components/model/Formulario";

import { Atividade } from "../../atividade/config";
import { Curso, StatusUsuarioCurso, UsuarioCurso } from "../../ead/curso/config";
import { CrudGenerico, Imovel, Territorio, TipoPE, TipoZona } from "../../imovel/config";
import { TipoAtividadeFormulario } from "../../model/TipoAtividadeFormulario";
import { ControleEnvioRegistroImovel, RegistroAtividade } from "../../registros-atividades/config";

export const formulario = <Formulario>{
    id: 123,
    titulo: "form title",
    descricao: "form desc",
    questoesExibidasNaPesquisa: [{ nome: "test", titulo: "asdasd" }],
    configuracaoGeoLocalizacao: null,
    surveyJS: {
        locale: "pt",
    },
};

export const imovel = <Imovel>{
    id: "1234",
    logradouro: "a",
    numero: "123",
    complemento: "a",
    pontoReferencia: "a",
    cep: "123123",
    latitude: "-12.3",
    longitude: "48.2",
    googlePlusCode: "1231231236666",
    poligono: "a",
    croqui: "a",
    sequencia: "a",
    lado: "a",
    estrato: "a",
    addedToActivityAt: new Date(),
    tipoImovel: <CrudGenerico>{
        nome: "imvoel",
        descricao: "tip",
        ativo: true,
    },
    tipoPontoEstrategico: <TipoPE>{
        descricao: "desc",
    },
    territorio: <Territorio>{},
    tipoZona: <TipoZona>{},
    enviado: { registroAtividadeStatus: undefined, imovelStatus: undefined },
};

export const tipoAtividadeFormulario = <TipoAtividadeFormulario>{
    formulario,
    principal: true,
    tipoAtividade: null,
};

export const atividade = <Atividade>{
    id: 2131,
    tipoAtividade: {
        id: 1231,
        nome: "Teste",
        descricao: "sem descricao",
        formulario,
        tiposAtividadesFormularios: [tipoAtividadeFormulario],
    },
    descricao: "nova atividade de teste",
    imoveis: [imovel],
    formulario: null,
    atividadesVinculos: [
        {
            agente: true,
            supervisor: false,
            vinculo: null,
        },
    ],
};


export const curso = <Curso>{
    id: 12342,
    nome: "Curso",
    sigla: "C",
    descricao: "Curso",
    cargaHoraria: 10
    
};

export const usuarioCurso = <UsuarioCurso>{
    id: 2131,
    dataInscricao: null,
    curso: curso,
    usuario: null,
    dataUltimoAcesso: null,
    status:StatusUsuarioCurso.EM_ANDAMENTO,
    numeroTentativas: 0
};

export const registroAtividadePai = <RegistroAtividade>{
    atividade,
    imovel,
    enviado: false,
    formulario,
    id: 78790,
};

export const registroAtividade = <RegistroAtividade>{
    atividade,
    imovel,
    enviado: false,
    formulario,
    id: 467,
    registroAtividadePai,
};

export const controle = <ControleEnvioRegistroImovel>{
    enviado: { registroAtividadeStatus: false, imovelStatus: false },
    imovelId: imovel.id,
    registrosAtividade: [
        {
            id: 565,
            formulario,
        },
    ],
};

export const respostasSurveyjs = {
    a1_eliminado: 1,
    a1_inspecionado: 1,
    a1_positivo: 1,
    a1_tratado: 1,
    a2_eliminado: 1,
    a2_inspecionado: 1,
    a2_positivo: 1,
    a2_tratado: 1,
    atividade_data_inspecao: "2021-02-09",
    atividade_hora_entrada: "16:57",
    atividade_hora_saida: "16:57",
    atividade_tipo_atividade: "LI+T: Levantamento de Índice + Tratamento",
    atividade_tipo_visita: "Recuperada",
    atividade_total_inspecionado: 7,
    b_eliminado: 1,
    b_inspecionado: 1,
    b_positivo: 1,
    b_tratado: 1,
    c_eliminado: 1,
    c_inspecionado: 1,
    c_positivo: 1,
    c_tratado: 1,
    coleta_amostra_numero_final: 3,
    coleta_amostra_numero_inicial: 1,
    coleta_amostra_qtde_tubitos: 5,
    d1_eliminado: 1,
    d1_inspecionado: 1,
    d1_positivo: 1,
    d1_tratado: 1,
    d2_eliminado: 1,
    d2_inspecionado: 1,
    d2_positivo: 1,
    d2_tratado: 1,
    depositos_total_eliminado: 7,
    depositos_total_positivo: 7,
    depositos_total_tratado: 7,
    e_eliminado: 1,
    e_inspecionado: 1,
    e_positivo: 1,
    e_tratado: 1,
    tratamento_larvicida_total_tratado: 0,
    _agente: "agente",
    _supervisor: "supervisor",
};
