import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao>{

    /*Propriedades da classe
    private _data: any; caso n digite nada é do tipo any*/
    
    //Underlide porque as propriedades não podem ser alteradas fora dos metodos da propria classe
    constructor(readonly data: Date,
        readonly quantidade: number,
        readonly valor: number){
        
            
        //Quando uma classe filha tem o número diferente de parametros no construtor é necessário chamar a o construturo da classe PAI    
        //super();    
        /*if (!data){
            throw new Error('Data deve ser preenchida.');
        } 
        console.log(typeof(nome)) pegar o tipo da variavel */
    }

    /*
    constructor(private _data: Date,
        private _quantidade: number,
        private _valor: number){
        
        if (!data){
            throw new Error('Data deve ser preenchida.');
        } 
        console.log(typeof(nome)) pegar o tipo da variavel 
    }


    get data(){
        return this._data;
    }

    
    get quantidade(){
        return this._quantidade;
    }

    
    get valor(){
        return this._valor;
    }*/

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('\nImpressssão');
        console.log(
            `Data: ${this.data}
Quantidade: ${this.quantidade}, 
Valor: ${this.valor}, 
Volume: ${this.volume}`
        );
    }

    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate() && 
                this.data.getMonth() == negociacao.data.getMonth() &&
                this.data.getFullYear() == negociacao.data.getFullYear();
    }
}