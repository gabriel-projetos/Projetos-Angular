export function domInject(seletor: string){


    return function(target: any, propertyKey: string) {

        let elemento: JQuery;


        const getter = function() {
            //testa se já buscamos o elemento no dom.
            if (!elemento) {

                console.log(`Buscando elemento do DOM pelo seletor ${seletor} para injetar em ${propertyKey}`);
                //recebe o seletor que recebeu do dom ('#data') ('#quantidade') etc
                elemento = $(seletor);
            }

            return elemento;
        }


        //target é o alvo que vai receber a property
        //propertyKey é o nome da property
        //como definiremos a property
        Object.defineProperty(target,  propertyKey, {
            //criando um get usando o getter criado acima
            get: getter
        });
    }
}