class Juego {
  constructor() {
    this.mario = new Mario();
    this.bowser = new Bowser();
  }

  dibujar() {
    background(135, 206, 235);
    this.dibujarSuelo();
    this.dibujarBowser();
    this.dibujarMario();
    this.detectarColisionMario();
    this.detectarEsquive();
    this.detectarPoder();
    this.dibujarDatos();
  }

  dibujarSuelo() {
    fill(120, 80, 40);
    rect(0, 380, 800, 70);
  }

  dibujarBowser() {
    this.bowser.dibujar();
    if (this.mario.vida > 0) {
      this.bowser.lanzar();
    }
  }

  dibujarMario() {
    this.mario.dibujar();
  }

  detectarColisionMario() {
    if (this.mario.vida > 0 && this.bowser.vida > 0) {
      for (let i = 0; i < this.bowser.fuegos.length; i++) {
        let f = this.bowser.fuegos[i];
        if (f.activo && dist(this.mario.posX, this.mario.posY, f.posX, f.posY) < 35) {
          this.mario.recibirDanio(f.danio);
          f.activo = false;
        }
      }
    }
  }

  detectarEsquive() {
    if (this.mario.vida > 0 && this.bowser.vida > 0) {
      for (let i = 0; i < this.bowser.fuegos.length; i++) {
        let f = this.bowser.fuegos[i];
        if (f.activo && f.paso == false && f.posX < this.mario.posX - 40) {
          f.paso = true;
          this.mario.sumarPunto();
        }
      }
    }
  }

  detectarPoder() {
    if (keyIsDown(88) && this.mario.poder && this.mario.vida > 0) {
      this.bowser.recibirDanio(this.bowser.vida);
    }
  }

  dibujarDatos() {
    fill(255);
    rect(20, 20, 200, 15);
    rect(580, 20, 200, 15);
    fill(220, 0, 0);
    rect(20, 20, this.mario.vida * 2, 15);
    fill(0, 150, 0);
    rect(580, 20, this.bowser.vida * 2, 15);

    fill(0);
    textSize(16);
    text("puntos: " + this.mario.puntos, 20, 60);
    if (this.mario.poder && this.bowser.vida > 0) {
      text("poder listo: tecla X", 20, 80);
    }

    textSize(30);
    if (this.bowser.vida <= 0) {
      text("ganaste! (R para reiniciar)", 200, 200);
    }
    if (this.mario.vida <= 0) {
      text("perdiste (R para reiniciar)", 200, 200);
    }
  }
}

let juego;

function setup() {
  createCanvas(800, 450);
  juego = new Juego();
}

function draw() {
  juego.dibujar();
  if (keyIsDown(82)) {
    juego = new Juego();
  }
}
