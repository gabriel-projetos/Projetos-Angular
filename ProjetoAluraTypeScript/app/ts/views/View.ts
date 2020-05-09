import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {
    protected _elemento: JQuery;
    private _escapar: boolean;

    constructor(selector: string, escapar: boolean = true){
        this._elemento = $(selector);
        this._escapar = escapar;
    }
    //document.querySelector = $ no Jquery
    //Pega o template e atribui ao innerHtml que converte em elementos do DOM
    @logarTempoDeExecucao(true)
    update(modelo: T){
        let template = this.template(modelo);
        if (this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        }

        this._elemento.html(template);
        //this._elemento.innerHTML = .html
    } 

    abstract template(modelo: T): string;
}