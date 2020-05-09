export function logarTempoDeExecucao(emSegundos: boolean = false) {
    
    //recebe um target, que é a instancia no qual o decorador do metodo foi colocado
    //propertyKey retorna o nome do metodo no qual o decorador foi colocado
    //PropertyDescriptor ele sabe sobre o metodo que está sendo chamado
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //é o metodo no qual o decorador está posicionado com toda a lógica dele etc
        const metodoOriginal = descriptor.value;

        /**** aqui vem a lógica do decorator ****/
        //sobreescrever o metodo original, args[] são os parametros do metodo
        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }

            console.log('----------------------------');
            console.log(`Os parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            //aply permite chamar o metodo no contexto(o objeto no qual o metodo foi chamado) e com os parametros que queremos passar que foram recebidos pelo args
            const resultado = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(resultado)}`);
            console.log(`O método ${propertyKey} demoroou ${(t2 - t1) / divisor} ${unidade}`);
            return resultado;
        }

        return descriptor;
    }
}