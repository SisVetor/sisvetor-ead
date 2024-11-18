import { Questao } from "./Questao";

export interface Formulario {
    id: number;
    titulo: string;
    descricao: string;
    questoesExibidasNaPesquisa: Questao[];
    configuracaoGeoLocalizacao: ConfiguracaoGeoLocalizacao;
    questoesRepetirUltimoValor: any[];
    surveyJS: any;
}
export interface ConfiguracaoGeoLocalizacao {
    questaoLatitude: Questao;
    questaoLongitude: Questao;
    questaoPlusCode: Questao;
}
