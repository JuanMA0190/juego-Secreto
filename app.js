/*let titulo = document.querySelector('h1'); //Esta variable tiene almacenada un objeto que representa al h1 del html.
titulo.innerHTML = 'Juego del número secreto';

//let contenidoH1 = titulo.innerHTML; //Devuelve el valor que tenga h1 como tipo String y lo almacena en la variable.


let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';
*/
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
    return; //return se coloca por buena práctica aun asi esta no devuelva nada.
}

function verificarIntento(){
    //Por más que la etiqueta input tenga la propiedad number y solo se coloque números al obtener el valor este se convierte en String, por tanto, si queremos tener un number debemos castearlo.
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);//La función getElementById() sirve para buscar un objeto por el id, cuando lo encuentra devuelve un valor object por tanto si necesitamos el valor del mismo ocupamos el atributo value para traer el mismo.
    
    /*
    console.log(numeroUsuario);
    console.log(numeroSecreto);
    console.log(numeroSecreto === numeroUsuario);//El triple igual a diferencia del doble igual, compara tipo de dato y valor, mientras que el doble igual solo compara el valor más no el tipo. Retorna un booleano.*/

    if((numeroSecreto === numeroUsuario)){
        //El usuario acerto
        asignarTextoElemento('p',`Acertaste el número secreto es ${numeroUsuario}. Felicidades lo adivinaste en ${intentos} ${intentos > 1 ? 'intentos' : 'intento'}!`);

        //Se habilita la caja de texto que previamente se encuentra deshabilitada, para que el usuario pueda jugar de nuevo
        document.getElementById('reiniciar').removeAttribute('disabled'); //removeAttributte() espera el nombre del atributo que se quiera remover

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
    document.querySelector('#valorUsuario').value = '';//Otra forma de obtener el valor de la caja de texto por id, solo que esta vez utilizando el metodo querySelector. value('') vacía la caja de texto.
    return;
}

function generarNumeroAleatorio(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados)
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
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');//setAttribute setea (cambia) a las propiedades de la etiqueta html con la propiedad y el valor.
    return;
}