const verbosIrregulares = {
  'be': ['be', 'was', 'been'],
  'awake': ['awake', 'awoke', 'awoken'],
  'become': ['become', 'became', 'become'],
  'bite': ['bite', 'bit', 'bitten'],
  'break': ['break', 'broke', 'broken'],
  'bring': ['bring', 'brought', 'brought'],
  'buy': ['buy', 'bought', 'bought'],
  'creep': ['creep', 'crept', 'crept'],
  'do': ['do', 'did', 'done'],
  'drink': ['drink', 'drank', 'drunk'],
  'eat': ['eat', 'ate', 'eaten'],
  'feel': ['feel', 'felt', 'felt'],
 };



let puntaje = 0;
const puntajeElemento = document.getElementById('puntaje');

let botonesSeleccionados = [];
const botones = document.querySelectorAll('.boton');







botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const verbo = boton.getAttribute('data-verb');
    const forma = boton.innerText;

    if (botonesSeleccionados.length < 3 && verbosIrregulares.hasOwnProperty(verbo) && verbosIrregulares[verbo].includes(forma)) {
      // el botón es válido y aún no se han seleccionado tres
      boton.classList.add('seleccionado');
      botonesSeleccionados.push(boton);

      if (botonesSeleccionados.length === 3) {
        // se seleccionaron tres botones, comprobar si son correctos
        const verbosSeleccionados = botonesSeleccionados.map(boton => boton.getAttribute('data-verb'));
        const formasSeleccionadas = botonesSeleccionados.map(boton => boton.innerText);
        const verboCorrecto = verbosSeleccionados.every(verbo => verbo === verbosSeleccionados[0]);
        const formasCorrectas = formasSeleccionadas.every(forma => verbosIrregulares[verbosSeleccionados[0]].includes(forma));

        if (verboCorrecto && formasCorrectas) {
          // selección correcta
          puntaje++;
          puntajeElemento.innerText = puntaje;
          
          botonesSeleccionados.forEach(boton => boton.classList.add('seleccionado-correcto'));
          
        } 
        else 
        {
        // selección incorrecta
         
        puntajeElemento.innerText = puntaje;
        
        botonesSeleccionados.forEach(boton => boton.classList.add('seleccionado-incorrecto'));
        
        }          // limpiar la selección después de un segundo
        setTimeout(() => {
          botonesSeleccionados.forEach(boton => {
            boton.classList.remove('seleccionado', 'seleccionado-incorrecto');
          });
          botonesSeleccionados = [];
        }, 1000);
      }
    };
  });
});


function shuffleBotones() {
  const botonesDiv = document.getElementById('botones-verbos');
  const botones = Array.from(botonesDiv.children);
  for (let i = botones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    botonesDiv.appendChild(botones[j]);
  }
}

function transicion(){
 
  
  const buttons = document.querySelectorAll('.boton');
  
 for (let i = 0; i < buttons.length; i++) {
  setTimeout(() => {
    
    buttons[i].classList.add('my-transition');
  },  7000);
 }

 setTimeout(() => {
  for (let i = 0; i < buttons.length; i++) {

    
    buttons[i].classList.remove('my-transition');
    
    
    
    
  }
});


}

function remover(){
  
  botonesSeleccionados.forEach(boton => {
    boton.classList.remove('seleccionado', 'seleccionado-incorrecto' ,'seleccionado-correcto');
    botonesSeleccionados.forEach(boton => boton.classList.remove('seleccionado-correcto'));
  });
  botonesSeleccionados = []; 
  
}

function aviso(){
  const mensaje = document.createElement('div');
  mensaje.innerText = '¡El juego ha comenzado!';
  mensaje.classList.add('aviso');
  
  
  document.body.appendChild(mensaje);
  
  
  setTimeout(() => {
    mensaje.parentNode.removeChild(mensaje);
  }, 3000); 
}

function aviso2(){
  const mensaje = document.createElement('div');
  mensaje.innerText = '¡Fin del juego!';
  mensaje.classList.add('aviso2');
  
  
  document.body.appendChild(mensaje);
  
  
   
}

function startTimer() {

  var countDownDate = new Date().getTime() + (5 * 60 * 1000); 
  var timer = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = "Tiempo restante: " + minutes + ":" + seconds;

    
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Juego finalizado";
      aviso2()
      
    }
  }, 1000);
}


function reiniciarJuego() {
  

  /* botonesSeleccionados.forEach(boton => boton.classList.add('seleccionado-correcto1')); */

  
  remover();
  aviso();
  transicion();
  startTimer();
  shuffleBotones();

  
  puntajeElemento.innerText = "0";
  
}







