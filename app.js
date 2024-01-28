let numSecreto;
let intentos;
let listaNumerosUsados = [];
let numeroMax = 5;

function NumeroAleatorio() { //Generar el numero a adivinar
    console.log(listaNumerosUsados); //<- Recibir la lista de numeros usados en la consola. Para probar;
    let numeroGenerado = Math.floor(Math.random()*numeroMax)+1;
    //Ya se usaron todos los numeros posibles?
    if (listaNumerosUsados.length == numeroMax){
        asignarTextoElemento('p', `Ya se sortearon todos los números posibles`);
    } else {
        // Si el numero está en la lista:
        if (listaNumerosUsados.includes(numeroGenerado)) {
            return NumeroAleatorio();
        } //Si el numero no está en la lista, se agrega a la lista y se devuelve el numero generado
            else{
                listaNumerosUsados.push(numeroGenerado);
                return numeroGenerado;
            }
        }
};

function configuracionInicial() { //A mostrar al inico de cada juego
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMax}`);
    //Generar nuevo numero secreto aleatorio:
    numSecreto = NumeroAleatorio();
    console.log(numSecreto); //<- Recibir el numero secreto en la consola. Para probar;
    //Reiniciar intentos:
    intentos = 1;
}
 
function asignarTextoElemento(elemento, texto){ //Cambiar texto a "El num es mayor/menor"
    let elemntHTML = document.querySelector(elemento); //var que guarda el tipo de elemento a usar  
    elemntHTML.innerHTML = texto; //asignar texto al elemento seleccionado usando "innerHTML"
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); //Obtiene el valor ingresado en el input
     
    if (numeroUsuario === numSecreto){
        //El usuario acerta:
        asignarTextoElemento('p', `Acertaste en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } 
        else {
            //El usuario no acertó:
            if (numeroUsuario > numSecreto){
                asignarTextoElemento('p', 'El número es menor');
            } else{
                asignarTextoElemento('p', 'El número es mayor');
            }
            intentos ++;
            limpiarCaja();
        }
return;
};

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego() {
    //Limpiar la caja:
    limpiarCaja();
    //Reiniciar la configuracion de incio del juego (mensajes, intentos, numero secreto):
    configuracionInicial();
    //Deshabilitar el botón nuevo juego:
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

configuracionInicial();