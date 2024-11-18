import { Atividade } from "../../atividade/config";
import { Imovel, Territorio } from "../../imovel/config";
import { Formulario } from "../../model/Formulario";
import Usuario from "../../model/Usuario";
import { RegistroAtividade } from "../../registros-atividades/config";
import Unidade from "../../unidade/config";
import {
    checarSeRespostaArray,
    clonarArrayComJSONstringify,
    compararParaOrdenarTabela,
    converterRegistroAtividadeParaJSONCSV,
    formatarDataDDMMYYYY,
    formatarSemanaEpidemiologica,
    gerarCorRGBAleatoria,
    gerarDiferencasEntreJsons,
    gerarPlanilhaDasRespostas,
    gerarStringData,
    gerarStringDataHora,
    processCsvWithHeaderLine,
} from "./util";

describe("Util", () => {
    it("formatarSemanaEpidemiologica", () => {
        const semana = formatarSemanaEpidemiologica(2, 2021);
        expect(semana).toEqual("02/2021");
    });

    it("converterRegistroAtividadeParaJSONCSV", () => {
        const imovel: Imovel = {
            id: 1,
            codigo: "codigo1",
            logradouro: "logradouro1",
            numero: "numero1",
            territorio: { id: 200, nome: "Territorio1" } as Territorio,
        } as any;
        const unidade: Unidade = { id: 1 } as Unidade;
        const formulario: Formulario = { id: 1, titulo: "Formulario1" } as Formulario;
        const atividade: Atividade = { id: 2, unidade } as Atividade;
        const usuarioCriador: Usuario = { id: { pessoaId: 10, unidadeId: 20 }, nome: "João" } as Usuario;
        const registroAtividade: RegistroAtividade = {
            id: 1,
            uuid: "1abc",
            dataHora: "2021-01-01",
            respostas: { campo2: "valor2", campo1: "valor1" },
            imovel,
            formulario,
            atividade,
            latitude: "1",
            longitude: "2",
            registroAtividadePai: null,
            tag: "TAG",
            usuarioCriador,
        } as any;
        const questionOrder = { campo1: 2, campo2: 1 };
        const jsonCSV = converterRegistroAtividadeParaJSONCSV(registroAtividade, atividade, questionOrder, "");
        expect(jsonCSV).toEqual({
            imovel_id: 1,
            imovel_tag: "TAG",
            imovel_codigo: "codigo1",
            imovel_logradouro: "logradouro1",
            imovel_numero: "numero1",
            imovel_territorio: "Territorio1",
            imovel_territorio_id: 200,
            atividade: 2,
            unidade_id: 1,
            unidade_nome: undefined,
            registro_latitude: "1",
            registro_longitude: "2",
            registro_id: 1,
            registro_uuid: "1abc",
            registro_data_hora: "2021-01-01",
            formulario_id: 1,
            formulario_titulo: "Formulario1",
            pessoa_cadastro_id: 10,
            pessoa_unidade_cadastro_id: 20,
            pessoa_cadastro_nome: "João",
            campo2: "valor2",
            campo1: "valor1",
        });
    });

    it("converterRegistroAtividadeParaJSONCSV Basico", () => {
        const atividade: Atividade = { id: 2 } as Atividade;
        const registroAtividadeA: RegistroAtividade = {
            id: 1,
            uuid: "1abc",
            dataHora: "2021-01-01",
            respostas: null,
            latitude: "1",
            longitude: "2",
            registroAtividadePai: null,
            tag: "TAG",
        } as RegistroAtividade;
        const questionOrder = { campo1: 2, campo2: 1 };
        const jsonCSV = converterRegistroAtividadeParaJSONCSV(registroAtividadeA, atividade, questionOrder, "");
        expect(jsonCSV).toEqual({
            atividade: 2,
            registro_latitude: "1",
            registro_longitude: "2",
            registro_id: 1,
            registro_uuid: "1abc",
            registro_data_hora: "2021-01-01",
            campo2: null,
            campo1: null,
        });
        const registroAtividadeB: RegistroAtividade = {
            id: 1,
            uuid: "1abc",
            dataHora: "2021-01-01",
            respostas: { campo1: "valor1", campo2: "valor2" },
            latitude: "1",
            longitude: "2",
            registroAtividadePai: null,
            tag: "TAG",
        } as any;
        const jsonCSV2 = converterRegistroAtividadeParaJSONCSV(registroAtividadeB, atividade, null, "");
        expect(jsonCSV2).toEqual({
            atividade: 2,
            registro_latitude: "1",
            registro_longitude: "2",
            registro_id: 1,
            registro_uuid: "1abc",
            registro_data_hora: "2021-01-01",
            campo1: "valor1",
            campo2: "valor2",
        });

        const imovel: Imovel = {
            id: 1,
            territorio: {} as Territorio,
        } as any;

        const registroAtividadeC: RegistroAtividade = {
            id: 1,
            uuid: "1abc",
            dataHora: "2021-01-01",
            respostas: { campo1: "valor1", campo2: "valor2" },
            latitude: null,
            longitude: null,
            registroAtividadePai: null,
            tag: null,
            imovel,
        } as any;
        const jsonCSV3 = converterRegistroAtividadeParaJSONCSV(registroAtividadeC, atividade, null, "");
        expect(jsonCSV3).toEqual({
            imovel_id: 1,
            imovel_tag: "-",
            imovel_codigo: undefined,
            imovel_logradouro: undefined,
            imovel_numero: undefined,
            imovel_territorio: "",
            imovel_territorio_id: "",
            atividade: 2,
            registro_latitude: "-",
            registro_longitude: "-",
            registro_id: 1,
            registro_uuid: "1abc",
            registro_data_hora: "2021-01-01",
            campo1: "valor1",
            campo2: "valor2",
        });
    });

    it("processCsvWithHeaderLine", () => {
        const csv = processCsvWithHeaderLine("1,2");
        expect(csv).toEqual([["1,2"]]);
    });

    it("gerarDiferencasEntreJsons", () => {
        const diferenca = gerarDiferencasEntreJsons({ a: 1 }, { b: 2 });
        expect(diferenca).toEqual([
            { caminhoPropriedade: "a", operacao: "Remoção", valorDe: 1, valorPara: undefined },
            { caminhoPropriedade: "b", operacao: "Inclusão", valorDe: undefined, valorPara: 2 },
        ]);
    });

    it("gerarCorRGBAleatoria", () => {
        const cor = gerarCorRGBAleatoria();
        expect(cor.length).toEqual(7);
        expect(cor[0]).toEqual("#");
    });

    it("clonarArrayComJSONstringify", () => {
        const clone = clonarArrayComJSONstringify([1, 2]);
        expect(clone).toEqual([1, 2]);
    });

    it("checarSeRespostaArray", () => {
        const checagem = checarSeRespostaArray("a", ["b", "c"], "");
        expect(checagem).toEqual({ "0_0": "b", "0_1": "c" });
    });

    it("gerarPlanilhaDasRespostas", () => {
        const imovel: Imovel = {
            id: 1,
            codigo: "codigo1",
            logradouro: "logradouro1",
            numero: "numero1",
            territorio: { id: 200, nome: "Territorio1" } as Territorio,
        } as any;
        const unidade: Unidade = { id: 1 } as Unidade;
        const formulario: Formulario = { id: 1, titulo: "Formulario1" } as Formulario;
        const atividade: Atividade = { id: 2, unidade } as Atividade;
        const usuarioCriador: Usuario = { id: { pessoaId: 10, unidadeId: 20 }, nome: "João" } as Usuario;
        const registrosAtividade: RegistroAtividade[] = [
            {
                id: 1,
                uuid: "1abc",
                dataHora: "2021-01-01",
                respostas: { campo2: "valor2", campo1: "valor1" },
                imovel,
                formulario,
                atividade,
                latitude: "1",
                longitude: "2",
                registroAtividadePai: null,
                tag: "TAG",
                usuarioCriador,
            } as any,
        ];
        const questionOrder = { campo1: 2, campo2: 1 };
        gerarPlanilhaDasRespostas(registrosAtividade, [{ id: 1 } as any], atividade, questionOrder);
    });

    it("Deve formatar data YYYY-MM-DD para DD/MM/YYYY", () => {
        const dataFormatada = formatarDataDDMMYYYY("2019-10-15");
        expect(dataFormatada).toEqual("15/10/2019");
    });

    it("Deve formatar data nula como string vazia", () => {
        const dataFormatada = formatarDataDDMMYYYY(null);
        expect(dataFormatada).toEqual("");
    });

    it("Deve gerar data no formato dd/MM/yyyy", () => {
        const data = new Date(2020, 0, 30);
        const dataFormatada = gerarStringData(data);
        expect(dataFormatada).toEqual("30/01/2020");
        const data2 = new Date(2020, 11, 30);
        const dataFormatada2 = gerarStringData(data2);
        expect(dataFormatada2).toEqual("30/12/2020");
    });

    it("Deve gerar data no formato dd/MM/yyyy HH:mm", () => {
        const data = new Date(2020, 0, 30, 23, 12);
        const dataFormatada = gerarStringDataHora(data);
        expect(dataFormatada).toEqual("30/01/2020 23:12");
        const data2 = new Date(2020, 0, 1, 1, 2);
        const dataFormatada2 = gerarStringDataHora(data2);
        expect(dataFormatada2).toEqual("01/01/2020 01:02");
    });

    it("Deve ordenar lista corretamente - crescente", () => {
        let caso1 = ["019", "014", "1"];
        let crescente = true;
        caso1 = caso1.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso1).toEqual(["1", "014", "019"]);

        let caso2 = ["x", "014", "1"];
        caso2 = caso2.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso2).toEqual(["1", "014", "x"]);

        let caso3 = ["x", null, "1"];
        caso3 = caso3.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso3).toEqual(["1", "x", null]);

        let caso4 = ["01-50-02-001", "01-20-02-001", "01-10-02-001"];
        caso4 = caso4.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso4).toEqual(["01-10-02-001", "01-20-02-001", "01-50-02-001"]);

        let caso5 = ["01-50-02-001", "01-50-02-001", "01-10-02-001"];
        caso5 = caso5.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso5).toEqual(["01-10-02-001", "01-50-02-001", "01-50-02-001"]);

        let caso6 = ["c", "b", "a"];
        caso6 = caso6.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso6).toEqual(["a", "b", "c"]);

        let caso7 = ["a", "b", "c"];
        caso7 = caso7.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso7).toEqual(["a", "b", "c"]);
    });

    it("Deve ordenar lista corretamente - decrescente", () => {
        let caso1 = ["019", "014", "1"];
        let crescente = false;
        caso1 = caso1.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso1).toEqual(["019", "014", "1"]);

        let caso2 = ["x", "014", "1"];
        caso2 = caso2.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso2).toEqual(["x", "014", "1"]);

        let caso3 = ["x", null, "1"];
        caso3 = caso3.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso3).toEqual([null, "x", "1"]);

        let caso4 = ["01-50-02-001", "01-20-02-001", "01-10-02-001"];
        caso4 = caso4.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso4).toEqual(["01-50-02-001", "01-20-02-001", "01-10-02-001"]);

        let caso5 = ["01-50-02-001", "01-50-02-001", "01-10-02-001"];
        caso5 = caso5.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso5).toEqual(["01-50-02-001", "01-50-02-001", "01-10-02-001"]);

        let caso6 = [1, 2, 3];
        caso6 = caso6.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso6).toEqual([3, 2, 1]);

        let caso7 = ["c", "b", "a"];
        caso7 = caso7.sort((a, b) => {
            return compararParaOrdenarTabela(a, b, crescente);
        });
        expect(caso7).toEqual(["c", "b", "a"]);
    });
});
