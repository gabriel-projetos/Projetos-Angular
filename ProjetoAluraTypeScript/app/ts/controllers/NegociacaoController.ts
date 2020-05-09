import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';


let timer = 0;

export class NegociacaoController {

    //HTMLInputElement = JQuery
    //Injeção de dependencia com leazy loading
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _textH1: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    //private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    
    private _service = new NegociacaoService();

    //document.querySelector = $ no JQuery
    constructor(){
        //Casting de um tipo generico (element) para um tipo mais especifico
        this._textH1 = $('h1');
        this._negociacoesView.update(this._negociacoes);
    }
    @throttle(500)
    adiciona(){
        
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        
        if(!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor.');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        
        /*
        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });
        console.log(this._textH1.textContent);
        console.log(negociacao);
        console.log(this)
        */

        this._mensagemView.update('Negociação adicionada com sucesso!');
    }


    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    //acelerador de tempo
    @throttle()
    async importaDados() {

        try {

           // usou await antes da chamada de this.service.obterNegociacoes()
            //negociacoesParaImportar OBTEM OS DADOS NECESSARIOS
            //O RESTO DA FUNÇÃO SÓ SERA EXECUTADO DEPOIS DESSA PROMISSE SER PROCESSADA
            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {

                    if(res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                });

                //SÓ CONTINUA A EXECUCAO DEPOIS DO negociacoesParaImportar
            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch(err) {
            //ERRO DA PROMISSE
            this._mensagemView.update(err.message);
        }
    }


}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}