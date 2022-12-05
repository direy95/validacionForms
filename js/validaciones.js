export function valida(input){
    //Con dataset conseguimos la conexion de todos los datas e tipo es lo que sigue al guion en lo definido en html. En nuestro caso data-tipo
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput])
        validadores[tipoDeInput](input);

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
        
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
        
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email:{
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "La contraseña debe tener entre 8 a 12 caracteres"
    },
    nacimiento:{
        valueMissing: "La fecha no puede estar vacía",
        customError: "Debes tener al menos 18 años"
    },
    numero:{
        valueMissing: "El numero no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion:{
        valueMissing: "La dirección no puede estar vacía",
        patternMismatch: "Debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "La ciudad no puede estar vacía",
        patternMismatch: "Debe contener entre 1 y 20 caracteres"
    },
    estado:{
        valueMissing: "El estado no puede estar vacío",
        patternMismatch: "Debe contener entre 1 y 20 caracteres"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(input);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    //Decimos que fecha va a ser del tipo Date
    const fechaCliente = new Date(input.value);
    mayorEdad(fechaCliente);
    let mensaje = "";
    if(!mayorEdad(fechaCliente))
        mensaje = "Debes tener al menos 18 años"
    //Define regla validacion personalizado para elemento seleccionado. El pop up tendrá el mensaje que nosostors elijamos
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return fechaActual >= diferenciaFechas;
}