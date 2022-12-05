import { valida } from "./validaciones.js";

//Selecciono todos los elementos de tipo input. Devuelve un arreglo
const inputs = document.querySelectorAll("input");

//A todos los input les va a agregar un event listener
inputs.forEach(input =>{
    input.addEventListener("blur", (input) =>{
        //Cuando salga del input, va a llamar a la funcion valida.
        valida(input.target);
    });
});