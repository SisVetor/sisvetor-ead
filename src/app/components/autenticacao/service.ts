import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { ConfigService } from 'src/app/ConfigService';

export interface RespostaAutenticacao {
    token: any,
    usuario: any
}

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {

    constructor(private http: HttpClient, private configService: ConfigService) {}

    login(cpf: string, senha: string, unidadeId: number): Observable<RespostaAutenticacao> {
        console.log("Efetuar Login");
        return this.http.post<RespostaAutenticacao>(`${this.configService.config.defaultUrl}/api/auth`, { "cpf": cpf, "password": senha, "unidadeId": unidadeId });
    }

    solicitarRecuperacaoSenha(userCpf: string, unidadeId: number) {
        console.log("Solicitar recuperação de senha");
        return this.http.put(`${this.configService.config.defaultUrl}/api/auth/solicitar-recuperacao-senha`, { "cpf": userCpf, "unidadeId": unidadeId });
    }

    redefinirSenha(password: string, pessoaId, unidadeId, token) {
        console.log("Definir senha");
        return this.http.put(`${this.configService.config.defaultUrl}/api/auth/alterar-senha?pessoaId=${pessoaId}&unidadeId=${unidadeId}&token=${token}`, { "novaSenha": password });
    }

    checarSeTokenValido(pessoaId, unidadeId, token) {
        console.log("Checar Token");
        return this.http.get(`${this.configService.config.defaultUrl}/api/auth/checar-token?pessoaId=${pessoaId}&unidadeId=${unidadeId}&token=${token}`);
    }

    pesquisarUnidadesPorCPF(cpf: string) {
        const href = `${this.configService.config.defaultUrl}/api/auth/pesquisar-unidades-por-cpf`;
        const requestUrl =
            `${href}?cpf=${cpf}`;
        return this.http.get(requestUrl);
    }

}
