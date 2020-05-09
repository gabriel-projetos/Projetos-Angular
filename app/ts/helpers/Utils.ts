import { Imprimivel } from "../models/index";

/* FUNÇÕES UTILITARIAS */
export function imprime(...objetos: Imprimivel[]) {

    objetos.forEach(objeto => objeto.paraTexto());
}