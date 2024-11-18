import Usuario from "../../model/Usuario";
import Unidade from "../../unidade/config";
import {
    AutenticacaoActionTypes,
    ListarUnidadesPorCPF,
    LogadoAction,
    LoginAction,
    LoginErroAction,
    LogoutAction,
    SolicitarRecuperacaoSenhaAction,
    UnidadesListadasComSucesso,
    UnidadeTrocarAction,
} from "./actions";

describe("LoginAction", () => {
    it("Deve criar Action", () => {
        const action = new LoginAction({ cpf: "", senha: "", unidadeId: 1 });
        expect({ ...action }).toEqual({
            type: AutenticacaoActionTypes.LOGIN_ACTION,
            payload: { cpf: "", senha: "", unidadeId: 1 },
        });
    });
});

describe("LogadoAction", () => {
    it("Deve criar Action", () => {
        const action = new LogadoAction({ token: "", unidade: <Unidade>{ nome: "" }, usuario: <Usuario>{ nome: "" } });
        expect(action.type).toBe(AutenticacaoActionTypes.LOGADO_ACTION);
    });
});

describe("LoginErroAction", () => {
    it("Deve criar Action", () => {
        const action = new LoginErroAction({ mensagem: "Exemplo" });
        expect(action.type).toBe(AutenticacaoActionTypes.LOGIN_ERRO_ACTION);
    });
});

describe("LogoutAction", () => {
    it("Deve criar Action", () => {
        const action = new LogoutAction();
        expect(action.type).toBe(AutenticacaoActionTypes.LOGOUT_ACTION);
    });
});

describe("UnidadeTrocarAction", () => {
    it("Deve criar Action", () => {
        const action = new UnidadeTrocarAction({ unidade: <Unidade>{ nome: "Unidade Teste" } });
        expect(action.type).toBe(AutenticacaoActionTypes.UNIDADE_TROCAR_ACTION);
    });
});

describe("SolicitarRecuperacaoSenhaAction", () => {
    let action: SolicitarRecuperacaoSenhaAction;

    it("Deve ser do tipo correto", () => {
        action = new SolicitarRecuperacaoSenhaAction({ unidadeId: 1, userCpf: "" });
        expect(action.type).toBe(AutenticacaoActionTypes.SOLICITAR_RECUPERACAO_SENHA_ACTION);
    });
});

describe("ListarUnidadesPorCPF", () => {
    it("Deve criar Action", () => {
        const action = new ListarUnidadesPorCPF({ cpf: "" });
        expect(action.type).toEqual(AutenticacaoActionTypes.LISTAR_UNIDADES_POR_CPF_ACTION);
    });
});

describe("UnidadesListadasComSucesso", () => {
    let action: any;

    it("Deve ser do tipo correto", () => {
        action = new UnidadesListadasComSucesso({ unidades: [] });
        expect(action.type).toEqual(AutenticacaoActionTypes.UNIDADES_LISTADAS_COM_SUCESSO_ACTION);
    });
});
