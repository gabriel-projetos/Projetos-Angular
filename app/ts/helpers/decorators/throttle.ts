export function throttle(milisegundos = 500) {
    
    //recebe um target, que é a instancia no qual o decorador do metodo foi colocado
    //propertyKey retorna o nome do metodo no qual o decorador foi colocado
    //PropertyDescriptor ele sabe sobre o metodo que está sendo chamado
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //é o metodo no qual o decorador está posicionado com toda a lógica dele etc
        const metodoOriginal = descriptor.value;

        /*declaração de let timer não pode estar dentro da função passada para descriptor.value, caso contrário toda vez que o método decorador for chamado uma nova variável será criada, queremos atualizar a mesma em cada chamada, por isso ela deve ficar no escopo de throttle e não do descriptor*/
        let timer = 0;

        /**** aqui vem a lógica do decorator ****/
        //sobreescrever o metodo original, args[] são os parametros do metodo
        descriptor.value = function(...args: any[]) {
            //não tem retorno
           // A instrução if(event) event.preventDefault(); esta fora do bloco da função passada para descriptor.value.
            //testa se o metodo chamado tem um evento, para nao recarregar a página
            if(event) event.preventDefault();
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
        }

        return descriptor;
    }
}