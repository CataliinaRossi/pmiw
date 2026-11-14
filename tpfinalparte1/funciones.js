function dibInicio() {
  image(imgInicio, 0, 0, width, height);
  dibBoton(inicioX, inicioY, inicioW, inicioH, "COMENZAR");
  dibBoton(credX, credY, credW, credH, "CRÉDITOS");
}

// creditos

function dibujarCreditos() {
  dibFondoCreditos();
  dibPersecucion();

  fill(255);
  textSize(20);

  for (let i = 0; i < textosCreditos.length; i++) {
    text(textosCreditos[i], width / 2, scroll + i * 40);
  }

  // para q suban los creditos

  scroll = scroll - 1;

  if (scroll < -(textosCreditos.length - 1) * 40) scroll = height;

  dibBoton(centralX, centralY, centralW, centralH, "VOLVER");
}

function dibFondoCreditos() {

  // se ajusta la imagen de fondo

  let anchoFondo = imgFondoCreditos.width * height / imgFondoCreditos.height;

  //  movimiento fondo creditos

  fondoX = fondoX + 2;
  if (fondoX >= anchoFondo) fondoX = 0;

  image(imgFondoCreditos, fondoX, 0, anchoFondo, height);
  image(imgFondoCreditos, fondoX - anchoFondo, 0, anchoFondo, height);
}

// sprites corriendo

function dibPersecucion() {

  // cada 100ms se cambia de sprite

  if (millis() - ultimoCambioCorrer > 100) {
    ultimoCambioCorrer = millis();

    // loop sprites mario

    frameMario++;
    if (frameMario > 3) frameMario = 1;

    // loop sprites de peach

    framePeach++;
    if (framePeach > 5) framePeach = 1;
  }

  let mario = marios[frameMario];
  let peach = peachs[framePeach];

  // movimiento y reinicio d sprites

  xMario = xMario + 4;
  if (xMario > width + 200) xMario = -300;


  image(mario, xMario, 390 - mario.height * 3, mario.width * 3, mario.height * 3);
  image(peach, xMario - 200, 390 - peach.height * 3, peach.width * 3, peach.height * 3);
}

function dibHistoria() {
  if (pantalla == 0) dibSprite();
  else image(imgs[fondos[pantalla]], 0, 0, width, height);

  dibCajaTexto(textos[pantalla]);
  if (siguienteA[pantalla] != -1 && siguienteB[pantalla] != -1) {
    dibBoton(botonAx, botonAy, botonAw, botonAh, textosA[pantalla]);
    dibBoton(botonBx, botonBy, botonBw, botonBh, textosB[pantalla]);
  } else if (siguienteA[pantalla] != -1) {
    dibBoton(contX, contY, contW, contH, textosA[pantalla]);
  } else {
    dibBoton(contX, contY, contW, contH, "VOLVER A JUGAR");
  }
}

// pantalla animada

function dibSprite() {
  if (millis() - ultimoCambio > velSprite) {
    ultimoCambio = millis();

    if (frameSprite < 8) frameSprite++;
    else frameSprite = 7;
  }

  image(sprites[frameSprite], 0, 0, width, height);
}

// caja d texto

function dibCajaTexto(texto) {
  push();
  fill(0, 0, 0, 200);
  stroke(255);
  strokeWeight(3);
  rect(cajaX, cajaY, cajaW, cajaH, 12);

  noStroke();
  fill(255);
  textSize(18);
  textAlign(LEFT, TOP);
  text(texto, cajaX + 20, cajaY + 15, cajaW - 40, cajaH - 30);
  pop();
}

// botones

function dibBoton(x, y, ancho, alto, textoBoton) {
  push();
  let encima = clicSobre(x, y, ancho, alto);

  noStroke();
  fill(120, 10, 10);
  rect(x, y + 4, ancho, alto, 8);

  stroke(255);
  strokeWeight(3);
  if (encima) fill(amarillo);
  else fill(rojo);
  rect(x, y, ancho, alto, 8);

  noStroke();
  if (encima) fill(60, 30, 0);
  else fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(textoBoton, x + ancho / 2, y + alto / 2);
  pop();
}

function clicSobre(x, y, ancho, alto) {
  if (mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto) {
    return true;
  }
  return false;
}

function cambiarPantalla(nueva, conSonido) {

  if (gameover.isPlaying()) gameover.stop();

  if (nueva == Pcreditos) scroll = height;

  pantalla = nueva;

  if (nueva == 0) {
    frameSprite = 1;
    ultimoCambio = millis();
  }

  //  solo para pantalla 6 !! no suena ningunsonido

  if (conSonido == false) return;


  // sonido click boton
  
  fireball.play();


  if (nueva >= 0 && sonidosTexto[nueva] != null) sonidosTexto[nueva].play();

  // si es un final malo suena el game over

  if (estaEn(pantallasGameOver, nueva)) gameover.play();
}


function estaEn(lista, n) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] == n) return true;
  }
  return false;
}


function sonidoDeFondo() {

  // pausar sonido de fondo

  if (estaEn(pantallasSinMusica, pantalla)) {
    musicaFondo.stop();
    return;
  }

  if (pantalla == Pinicio) {

    // para q mario hable

    if (!musicaInicio.isPlaying()) starttoplay.play();
    ponerMusica(musicaInicio);

    //  creditos
  } else if (pantalla == Pcreditos) {
    ponerMusica(musicaCreditos);

    // historia
  } else {
    ponerMusica(musicaFondo);
  }
}

  // si hay musica d fondo se frenan las otras canciones

function ponerMusica(musica) {
  if (musica.isPlaying()) return;

  musicaInicio.stop();
  musicaCreditos.stop();
  musicaFondo.stop();

  musica.loop();
}

