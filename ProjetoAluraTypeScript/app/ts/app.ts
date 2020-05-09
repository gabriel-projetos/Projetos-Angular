import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

//Passando um evento do controller para o submit, e usando o bind para manter o this com a instancia do controller
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));



