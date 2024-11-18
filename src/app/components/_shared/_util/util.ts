import { formatDate } from "@angular/common";
import * as jsonpatch from "fast-json-patch";
import * as XLSX from "xlsx";

import Usuario from "../../model/Usuario";

export function formatarDataDDMMYYYY(dataString: string) {
    if (!dataString) {
        return "";
    }
    return dataString.split("-").reverse().join("/");
}

export function gerarStringDataHora(data: Date): string {
    const stringData = gerarStringData(data);

    const hora = data.getHours();
    const min = data.getMinutes();
    let minString;
    if (min < 10) {
        minString = "0" + min;
    } else {
        minString = "" + min;
    }
    const stringHora = hora.toString().padStart(2, "0") + ":" + minString;

    return stringData + " " + stringHora;
}
export function getLocalRepositoryName(nomePadrao: string, usuario: Usuario) {
    return nomePadrao+usuario?.id?.pessoaId+"-"+usuario?.id?.unidadeId;
}
export function gerarStringData(data: Date): string {
    const dd = data.getDate();
    const mm = data.getMonth() + 1;
    const yyyy = data.getFullYear();

    let dataAtualString: string;
    let diaString: string = dd.toString();
    let mesString: string = mm.toString();
    const anoString: string = yyyy.toString();

    if (dd < 10) {
        diaString = `0${dd}`;
    }

    if (mm < 10) {
        mesString = `0${mm}`;
    }

    dataAtualString = diaString + "/" + mesString + "/" + anoString;
    return dataAtualString;
}

export function formatarSemanaEpidemiologica(nrSemana: number, ano: number) {
    return `${nrSemana.toLocaleString("pt-BR", { minimumIntegerDigits: 2, useGrouping: false })}/${ano}`;
}



export function gerarArquivoParaDownload(registrosAtividadeJSONPlano: Object[], nomeArquivo: string) {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(registrosAtividadeJSONPlano);
    const teste = workSheet["!rows"];
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "registros");
    XLSX.writeFile(workBook, `${nomeArquivo}.xlsx`);
}

function gerarNomeArquivoExportacaoRegistrosCSV() {
    const dataHora = formatDate(new Date(), "yyyy-MM-dd HH:mm", "en");
    return `${dataHora} registros_sisvetor`;
}

export function checarSeRespostaArray(nomeQuestao, valor, valorCasoNulo: string) {
    if (Array.isArray(valor)) {
        const valorExpandido = {};
        valor.forEach((subValor, index) => {
            Object.keys(subValor).forEach((key) => {
                valorExpandido[`${key}_${index}`] = subValor[key];
            });
        });
        return valorExpandido;
    }
    const valorRetorno = {};
    valorRetorno[nomeQuestao] = valor ?? valorCasoNulo;
    return valorRetorno;
}
export function compararParaOrdenarTabela(a: any, b: any, isAsc: boolean) {
    if (a === b) {
        return 0;
    } else if (a === null || typeof a === "undefined") {
        return 1 * (isAsc ? 1 : -1);
    } else if (b === null || typeof b === "undefined") {
        return -1 * (isAsc ? 1 : -1);
    }
    if (!isNaN(a) && !isNaN(b)) {
        return (parseFloat(a) < parseFloat(b) ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
export function clonarArrayComJSONstringify(lista: any[]) {
    return lista.map((item) => JSON.parse(JSON.stringify(item)));
}

// Monta o JSON a partir do CSV
export function processCsvWithHeaderLine(csv) {
    const allTextLines = csv.split(/\r\n|\n/);
    const lines = [];
    for (let i = 0; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(";");
        const tarr = [];
        for (let j = 0; j < data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    return lines;
}

export function gerarDiferencasEntreJsons(jsonA, jsonB) {
    const operacao = { replace: "Alteração", add: "Inclusão", remove: "Remoção" };

    return jsonpatch.compare(jsonA, jsonB).map((result) => {
        return {
            caminhoPropriedade: result.path.substring(1),
            operacao: operacao[result.op],
            valorDe: jsonpatch.getValueByPointer(jsonA, result.path),
            valorPara: result["value"],
        };
    });
}

export function gerarCorRGBAleatoria() {
    var letras = "0123456789ABCDEF";
    var corRGB = "#";
    for (var i = 0; i < 6; i++) {
        corRGB += letras[Math.floor(Math.random() * 16)];
    }
    return corRGB;
}
