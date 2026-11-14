// CATALINA ROSSI
// PMIW. Comision 4. Docente: Leo Garay
//
// Obra: Super Mario
// 


let Pinicio = -1;
let Pcreditos = -2;

let pantalla = Pinicio;

// imagenes

let imgInicio;
let imgs = [];

// colores y scroll de creditos

let rojo;
let amarillo;
let scroll;

// variables para pantalla 0

let sprites = [];
let frameSprite = 1;
let ultimoCambio = 0;
let velSprite = 150;

// Animacion de creditos

let imgFondoCreditos;      
let fondoX = 0;            
let marios = [];           
let peachs = [];           
let frameMario = 1;        
let framePeach = 1;        
let ultimoCambioCorrer = 0;
let xMario = -300;         

// arreglo para fondos segun pantalla

let fondos = [
  1,   // 0  mario encuentra el mapa
  1,   // 1  despliega el pergamino
  1,   // 2  decide si seguir el mapa
  3,   // 3  se olvida del asunto
  14,   // 4  explosion
  14,   // 5  final de bowser
  2,   // 6  goombas
  4,   // 7  goombas revelan lo de peach
  9,   // 8  traje de infiltracion
  5,  // 9  sigue el mapa basico
  6,  // 10 llega al palacio
  7,  // 11 ventana alta trampas
  8,  // 12 final capturado
  15,  // 13 portones del palacio
  16,  // 14 irrumpe a la fuerza
  10,  // 15 laboratorio secreto
  11,  // 16 descubre la verdad
  17,  // 17 Bowser irrumpe en el laboratorio
  18,  // 18 deciden unir fuerzas
  20,  // 19 final Peach derrocada
  12,  // 20 el combate alerta a Peach
  13   // 21 final celda
];

// sonidos

let musicaInicio, musicaCreditos, musicaFondo;
let fireball, starttoplay, gameover, oh, oh2, elegir, okeydokey, woah, jump, surprise, damage, hello, happy, fall, win;
let sonidosTexto = [];  

// botones

let botonAx = 240;
let botonAy = 105;
let botonAw = 320;
let botonAh = 40;

let botonBx = 240;
let botonBy = 160;
let botonBw = 320;
let botonBh = 40;

let contX = 610;
let contY = 258;
let contW = 170;
let contH = 34;

let centralX = 250;
let centralY = 370;
let centralW = 300;
let centralH = 55;

let inicioX = 300;
let inicioY = 220;
let inicioW = 200;
let inicioH = 50;

let credX = 300;
let credY = 290;
let credW = 200;
let credH = 50;

// caja de texto

let cajaX = 20;
let cajaY = 300;
let cajaW = 760;
let cajaH = 130;

// imagenes

function preload() {
  imgInicio = loadImage("data/pantallainicio.jpg");
  
  for (let i = 1; i <= 20; i++) {
    imgs[i] = loadImage("data/pantalla" + i + ".png");
  }

  // crga sprites pantalla 0
  
  for (let i = 1; i <= 8; i++) {
    sprites[i] = loadImage("data/sprite" + i + ".png");
  }

  // fondo de la pantalla de creditos
  
  imgFondoCreditos = loadImage("data/fondocreditos.png");

  // carga los frames de mario corriendo
  
  for (let i = 1; i <= 3; i++) {
    marios[i] = loadImage("data/mario" + i + ".png");
  }

  // carga los frames de peach corriendo
  
  for (let i = 1; i <= 5; i++) {
    peachs[i] = loadImage("data/peach" + i + ".png");
  }

  //  sonidos
  
  musicaInicio = loadSound("data/start.mp3");
  musicaCreditos = loadSound("data/creditos.mp3");
  musicaFondo = loadSound("data/fondo.mp3");

  fireball = loadSound("data/fireball.wav");
  starttoplay = loadSound("data/starttoplay.wav");
  gameover = loadSound("data/gameover.wav");
  oh = loadSound("data/oh.wav");
  oh2 = loadSound("data/oh2.wav");
  elegir = loadSound("data/elegir.wav");
  okeydokey = loadSound("data/okeydokey.wav");
  woah = loadSound("data/woah.wav");
  jump = loadSound("data/jump.wav");
  surprise = loadSound("data/surprise.wav");
  damage = loadSound("data/damage.wav");
  hello = loadSound("data/hello.wav");
  happy = loadSound("data/happy.wav");
  fall = loadSound("data/fall.wav");
  win = loadSound("data/win.mp3");
}

function setup() {
  createCanvas(800, 450);
  textAlign(CENTER, CENTER);
  textSize(16);

  rojo = color(229, 37, 33);
  amarillo = color(251, 208, 0);
  
  scroll = height;

// volumen d musica

  musicaInicio.setVolume(0.4);
  musicaCreditos.setVolume(0.4);
  musicaFondo.setVolume(0.4);

// sonidso q se reproducen en escenas

  sonidosTexto = [
    null,        // 0  mario encuentra el mapa
    oh,          // 1  despliega el pergamino
    elegir,      // 2  decide si seguir el mapa
    okeydokey,   // 3  se olvida
    woah,        // 4  explosion
    null,        // 5  final bowser
    null,        // 6  goombas
    surprise,    // 7  goombas revelan lo de peach
    oh,          // 8  traje de infiltracion
    jump,        // 9  sigue el mapa basico
    null,        // 10 llega al palacio
    damage,      // 11 ventana alta trampas
    null,        // 12 final capturado
    elegir,      // 13 portones del palacio
    damage,      // 14 irrumpe a la fuerza
    null,        // 15 laboratorio secreto
    woah,        // 16 descubre la verdad
    oh2,         // 17 bowser irrumpe en el laboratorio
    happy,       // 18 deciden unir fuerzas
    win,         // 19 final peach derrocada
    fall,        // 20 el combate alerta a peach
    null         // 21 final celda
  ];
}

function draw() {
  if (getAudioContext().state == "running") sonidoDeFondo();

// se muestra segun el valor de pantalla

  if (pantalla == Pinicio) dibInicio();
  else if (pantalla == Pcreditos) dibujarCreditos();
  else dibHistoria();
}

// esto es para botones 

function mousePressed() {
  userStartAudio(); 

  if (pantalla == Pinicio) {
    if (clicSobre(inicioX, inicioY, inicioW, inicioH)) {
      cambiarPantalla(0);
    } else if (clicSobre(credX, credY, credW, credH)) {
      cambiarPantalla(Pcreditos);
    }
  } else if (pantalla == Pcreditos) {
    if (clicSobre(centralX, centralY, centralW, centralH)) cambiarPantalla(Pinicio);


  } else {
    if (siguienteA[pantalla] != -1 && siguienteB[pantalla] != -1) {
      if (clicSobre(botonAx, botonAy, botonAw, botonAh)) {
        if (pantalla == 6) {
          hello.play();
          cambiarPantalla(siguienteA[pantalla], false);
        } else {
          cambiarPantalla(siguienteA[pantalla]);
        }
      } else if (clicSobre(botonBx, botonBy, botonBw, botonBh)) {
        cambiarPantalla(siguienteB[pantalla]);
      }
    } else if (siguienteA[pantalla] != -1) {
      if (clicSobre(contX, contY, contW, contH)) cambiarPantalla(siguienteA[pantalla]);
    } else if (clicSobre(contX, contY, contW, contH)) {
      cambiarPantalla(Pinicio);
    }
  }
}
