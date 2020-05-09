import { Negociacao } from './Negociacao';
import { MeuObjeto } from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes> {
    //array do tipo negociacao
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void{

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log('\nImpressão');
        //Ojbeto javascript para texto
        console.log(JSON.stringify(this._negociacoes));
    }


    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}