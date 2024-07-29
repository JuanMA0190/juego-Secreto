let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
condicionesIniciales();

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroAleatorio();
    intentos = 1;
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);    
    if((numeroSecreto === numeroUsuario)){
        //El usuario acerto
        asignarTextoElemento('p',`Acertaste el número secreto es ${numeroUsuario}. Felicidades lo adivinaste en ${intentos} ${intentos > 1 ? 'intentos' : 'intento'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        //El usuario no acerto
        if(numeroUsuario > numeroSecreto){
            asignarTextoElemento('p','Fallaste el número secreto es menor. Intentalo de nuevo!');
        }else{
            asignarTextoElemento('p','Fallaste el número secreto es mayor. Intentalo de nuevo!');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//Vacia la caja de texto donde el usuario digita el número
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
    return;
}

function generarNumeroAleatorio(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    if(listaNumerosSorteados.length === numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        document.querySelector('#intento').setAttribute('disabled', 'true');
        return;
    }else{
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroAleatorio();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

    
}

//Función que reinicia el juego devolviendo al valor inicial todas las funciones y valores del juego.
function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    return;
}
