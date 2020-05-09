System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInject(seletor) {
        return function (target, propertyKey) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    console.log(`Buscando elemento do DOM pelo seletor ${seletor} para injetar em ${propertyKey}`);
                    elemento = $(seletor);
                }
                return elemento;
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        };
    }
    exports_1("domInject", domInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
