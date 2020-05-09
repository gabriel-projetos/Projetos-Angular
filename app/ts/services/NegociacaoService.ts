import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService {
    
    //handler = manipulador
    obterNegociacoes(handler: HandlerFunction) : Promise<Negociacao[]> {
        //o Retorno do fetch é uma promisse
        //No primeiro then, ta convertendo os dados para json
        //no segundo then, temos acesso ao dados convertidos em json porque o retorno do then fica acessivel na proxima chamada encadeada
        return fetch('http://localhost:8080/dados')
        .then(resposta => handler(resposta))
        .then(resposta => resposta.json())
        .then((dados: NegociacaoParcial[]) => 
            dados //mapenado as informas da api para o server, => retorno implicido da aerrow function
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))                
        )
        .catch(err => {
            console.log(err);
            throw new Error('Não foi possivel importar as negociações');
        });         
    }
}

export interface HandlerFunction {
    
    //Quem implementar essa função é obrigado a passar qualquer função.
    //Mas que seja do tipo response e que retorne uma response
    (res: Response) : Response
}