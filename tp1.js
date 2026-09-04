// TP1 
// Catalina Rossi. Legajo 93513/2
// Comision 4
// Profesor Leonardo Garay.

let quieta = [];
let sonriente = [];
let sorprendida = [];

let cantquieta = 11;
let cantsonriente = 9;
let cantsorprendida = 4;

let estado = "quieta";
let frame = 1;
let velocidad = 200;
let ultimo = 0;

let fondo;
let boton;
let texto;

let activo1 = false;
let activo2 = false;
let activo3 = false;
let activoR = false;

function preload() {
  texto = loadFont("assets/VCR_OSD_MONO_1.001.ttf");
  fondo = loadImage("assets/room.jpg");
  boton = loadImage("assets/boton.png");

  for (let i = 1; i <= cantquieta; i = i + 1) {
    quieta[i] = loadImage("assets/quieta" + i + ".png");
  }

  for (let i = 1; i <= cantsonriente; i = i + 1) {
    sonriente[i] = loadImage("assets/sonriente" + i + ".png");
  }

  for (let i = 1; i <= cantsorprendida; i = i + 1) {
    sorprendida[i] = loadImage("assets/sorprendida" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  textFont(texto);
  textAlign(CENTER, CENTER);
}

function draw() {
  



  image(fondo, 0, 0, width, height);

  actualizar(velocidad);
  sprite(estado, frame);

  botones();
}

function botones() {
  dibujar(280, 550, activo1, "1");
  dibujar(360, 550, activo2, "2")
  dibujar(440, 550, activo3, "3")
  dibujar(520, 550, activoR, "R")
}

function dibujar(x, y, activo, letra) {
  let tam = 60;

  if (activo) {
    tam = 70;
    tint(255, 150, 180);
  } else {
    noTint();
  }

  image(
    boton,
    x - tam / 2,
    y - tam / 2,
    tam,
    tam
  );

  noTint();

fill(250, 0, 238);
stroke(0);
strokeWeight(2);

textFont(texto);
textAlign(CENTER, CENTER);
textSize(20);
text(letra, x, y);

noStroke();
}

function keyPressed() {
  if (key === "1") {
    estado = "quieta";
    activo1 = true;
  } else if (key === "2") {
    estado = "sonriente";
    activo2 = true;
  } else if (key === "3") {
    estado = "sorprendida";
    activo3 = true;
  } else if (key === "r" || key === "R") {
    reiniciar();
    activoR = true;
  }

  frame = 1;
}

function keyReleased() {
  if (key === "1") {
    activo1 = false;
  } else if (key === "2") {
    activo2 = false;
  } else if (key === "3") {
    activo3 = false;
  } else if (key === "r" || key === "R") {
    activoR = false;
  }
}

function actualizar(vel) {
  if (millis() - ultimo > vel) {
    frame = frame + 1;

    if (frame > cantidad(estado)) {
      frame = 1;
    }

    ultimo = millis();
  }
}

function sprite(estado, frame) {
  if (estado === "quieta") {
    image(quieta[frame], 200, 200, 400, 400);
  } else if (estado === "sonriente") {
    image(sonriente[frame], 200, 200, 400, 400);
  } else if (estado === "sorprendida") {
    image(sorprendida[frame], 200, 200, 400, 400);
  }
}

function cantidad(estado) {
  if (estado === "quieta") {
    return cantquieta;
  } else if (estado === "sonriente") {
    return cantsonriente;
  } else if (estado === "sorprendida") {
    return cantsorprendida;
  }
}

function reiniciar() {
  estado = "quieta";
  frame = 1;
  ultimo = millis();}
