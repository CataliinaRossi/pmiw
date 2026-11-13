// Catalina Rossi  tp final parte 2
//Comision 4. Docente Leo Garay

// Link al video; https://youtu.be/PKJ3ENO3O9c
// Mecanica usada: dodge


let idlemario = [];
let mariodanio = [];
let mariowin = [];
let mariolose = [];
let abajo;
let idlebowser = [];
let bowserwin = [];
let bowserderrotado = [];
let atacando1;
let atacando2;
let fuego1;
let fuego2;
let corazonlleno;
let corazonmitad;
let corazonvacio;
let imggameover;
let golpeespecial;
let fondo;
let ganaste;
let tutorial;

let musicaInicio;
let musicaCreditos;
let musicaFondo;
let gameover;
let daño;
let mariomorir;
let saltar;
let win;
let audioListo = false;

let juego;
let ruta = "data/";
let pantalla = 0;
let verzona = false;

 //boton del inicio de JUGAR
let bx = 320;
let by = 380;
let bw = 176;
let bh = 48;

// boton que sale en las pantallas de ganaste y game over
let gbx = 359;
let gby = 393;
let gbw = 134.5;
let gbh = 39;


//boton volver 
let vbx = 300;
let vby = 385;
let vbw = 200;
let vbh = 45;

let imgFondoCreditos;
let botonvolver;
let marios = [];
let peachs = [];
let fondoX = 0;
let scroll = 450;
let xMario = -300;
let frameMario = 0;
let framePeach = 0;
let ultimoCambioCorrer = 0;
let textosCreditos = [
  "PMIW - Comisión 4",
  "Docente: Leonardo Garay",
  "Integrante: Catalina Rossi",
  "Historia original: Super Mario Bros (Nintendo, 1985)"
];

function preload() {
   for (let i = 1; i <= 3; i++) {
    marios.push(loadImage(ruta + "mario" + i + ".png"));
  }
  for (let i = 1; i <= 5; i++) {
    peachs.push(loadImage(ruta + "peach" + i + ".png"));
  }


  for (let i = 1; i <= 4; i++) {
    idlemario.push(loadImage(ruta + "idlemario" + i + ".png"));
  }
  for (let i = 1; i <= 12; i++) {
    mariodanio.push(loadImage(ruta + "mariodanio-" + i + ".png"));
    mariowin.push(loadImage(ruta + "mariowin-" + i + ".png"));
  }
  for (let i = 1; i <= 19; i++) {
    mariolose.push(loadImage(ruta + "mariolose-" + i + ".png"));
  }
  for (let i = 1; i <= 40; i++) {
    idlebowser.push(loadImage(ruta + "idlebowser-" + i + ".png"));
  }
  for (let i = 1; i <= 17; i++) {
    bowserwin.push(loadImage(ruta + "bowserwin-" + i + ".png"));
  }
  for (let i = 1; i <= 14; i++) {
    bowserderrotado.push(loadImage(ruta + "bowserderrotado-" + i + ".png"));
  }
  tutorial = loadImage(ruta + "tutorial.png");
  abajo = loadImage(ruta + "abajo.png");
  atacando1 = loadImage(ruta + "atacando1.png");
  atacando2 = loadImage(ruta + "atacando2.png");
  fuego1 = loadImage(ruta + "fuego1.png");
  fuego2 = loadImage(ruta + "fuego2.png");
  corazonlleno = loadImage(ruta + "corazonlleno.png");
  corazonmitad = loadImage(ruta + "corazonmitad.png");
  corazonvacio = loadImage(ruta + "corazonvacio.png");
  imggameover = loadImage(ruta + "gameover.png");
  golpeespecial = loadImage(ruta + "golpeespecial.png");
  fondo = loadImage(ruta + "fondo.png");
  ganaste = loadImage(ruta + "ganaste.png");
  imgFondoCreditos = fondo;
  botonvolver = loadImage(ruta + "botonvolver.png");

  musicaInicio = loadSound(ruta + "start.mp3");
  musicaCreditos = loadSound(ruta + "creditos.mp3");
  gameover = loadSound(ruta + "gameover.wav");
  daño = loadSound(ruta + "surprise.wav");
  mariomorir = loadSound(ruta + "damage.wav");
  saltar = loadSound(ruta + "jump.wav");
  saltar.setVolume(0.25);
  win = loadSound(ruta + "win.mp3");
  musicaFondo = loadSound(ruta + "musicaPelea.mp3");
  
}

function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
  vbh = botonvolver.height * vbw / botonvolver.width;
  vbx = 400 - vbw / 2;
  vby = 450 - vbh - 15;
  juego = new Juego();
}

function draw() {
  if (pantalla == 0) {
    image(tutorial, 400, 225, 800, 450);
    if (audioListo && musicaInicio.isPlaying() == false) {
      musicaInicio.loop();
    }
    if (verzona) {
      mostrarZona(bx, by, bw, bh);    //coordenadas x,y,widht,height de boton jugar
    }
  } else if (pantalla == 1) {
    juego.dibujar();
    if (keyIsDown(82) && juego.reiniciable) {
      iniciarJuego();
    }
  } else {
    dibujarCreditos();
  }
}

function mouseClicked() {
  userStartAudio();
  audioListo = true;
  if (pantalla == 0) {
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) {
      iniciarJuego();
    }
  } else if (pantalla == 1) {
    if (juego.ganasteVisible && mouseX > gbx && mouseX < gbx + gbw && mouseY > gby && mouseY < gby + gbh) {
      irACreditos();
    }
  } else {
    if (mouseX > vbx && mouseX < vbx + vbw && mouseY > vby && mouseY < vby + vbh) {
      volverDeCreditos();
    }
  }
}

function iniciarJuego() {
  juego = new Juego();
  pantalla = 1;
  musicaInicio.stop();
  musicaCreditos.stop();
  win.stop();
  gameover.stop();
  mariomorir.stop();
  if (musicaFondo) {
    musicaFondo.stop();
    musicaFondo.loop();
  }
}

function irACreditos() {
  pantalla = 2;
  scroll = height;
  fondoX = 0;
  xMario = -300;
  win.stop();
  musicaCreditos.loop();
}

function volverDeCreditos() {
  pantalla = 0;
  musicaCreditos.stop();
}

function mostrarZona(x, y, w, h) {
  noFill();
  stroke(255, 0, 0);
  rect(x, y, w, h);
  noStroke();
  fill(0);
  text(mouseX + ", " + mouseY, 10, 20);
  stroke(0);
}

function dibujarCreditos() {
  imageMode(CORNER);
  dibFondoCreditos();
  dibPersecucion();
  imageMode(CENTER);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  for (let i = 0; i < textosCreditos.length; i++) {
    text(textosCreditos[i], width / 2, scroll + i * 40);
  }

  scroll = scroll - 1;
  if (scroll < -(textosCreditos.length - 1) * 40) {
    scroll = height;
  }

  dibBotonVolver();
  textAlign(LEFT);
}

function dibFondoCreditos() {
  let anchoFondo = imgFondoCreditos.width * height / imgFondoCreditos.height;

  fondoX = fondoX + 2;
  if (fondoX >= anchoFondo) {
    fondoX = 0;
  }

  image(imgFondoCreditos, fondoX, 0, anchoFondo, height);
  image(imgFondoCreditos, fondoX - anchoFondo, 0, anchoFondo, height);
}

function dibPersecucion() {
  if (marios.length > 0 && peachs.length > 0) {
    if (millis() - ultimoCambioCorrer > 100) {
      ultimoCambioCorrer = millis();

      frameMario++;
      if (frameMario >= marios.length) {
        frameMario = 0;
      }

      framePeach++;
      if (framePeach >= peachs.length) {
        framePeach = 0;
      }
    }

    let mario = marios[frameMario];
    let peach = peachs[framePeach];

    xMario = xMario + 4;
    if (xMario > width + 200) {
      xMario = -300;
    }

    image(mario, xMario, 390 - mario.height * 3, mario.width * 3, mario.height * 3);
    image(peach, xMario - 200, 390 - peach.height * 3, peach.width * 3, peach.height * 3);
  }
}

function dibBotonVolver() {
  image(botonvolver, vbx + vbw / 2, vby + vbh / 2, vbw, vbh);
}
