import { createSelector } from '@ngrx/store';


export const selectAutenticacaoState = state => state.autenticacao;


export const estaLogado = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.logado
);

export const selectorToken = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.token
);

export const selectorUsuario = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.usuario
);

export const selectorUnidade = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.unidade
);

export const selectorMensagemErro = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.mensagemErro
);

export const selectorLogando = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.logando
);

export const selectorUnidadesUsuario = createSelector(
    selectAutenticacaoState,
    autenticacao => autenticacao.unidadesUsuario
);

export const naoEstaLogado = createSelector(
    estaLogado,
    status => !status.logado
);
