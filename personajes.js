class Mario {
  constructor() {
    this.posX = 100;
    this.posY = 350;
    this.alto = 60;
    this.piso = 350;
    this.vy = 0;
    this.enSuelo = true;
    this.vida = 100;
    this.puntos = 0;
    this.poder = false;
  }

  mover() {
    if (this.vida > 0) {
      if (keyIsDown(87) && this.enSuelo) {
        this.vy = -18;
        this.enSuelo = false;
      }
      if (keyIsDown(83)) {
        this.alto = 30;
      } else {
        this.alto = 60;
      }
      this.piso = 380 - this.alto / 2;
      if (this.enSuelo) {
        this.posY = this.piso;
      }
      this.vy += 1;
      this.posY += this.vy;
      if (this.posY >= this.piso) {
        this.posY = this.piso;
        this.vy = 0;
        this.enSuelo = true;
      }
    }
  }

  dibujar() {
    if (this.vida > 0) {
      fill(220, 0, 0);
    } else {
      fill(80);
    }
    ellipse(this.posX, this.posY, 40, this.alto);
    this.mover();
  }

  recibirDanio(n) {
    this.vida -= n;
    if (this.vida < 0) {
      this.vida = 0;
    }
  }

  sumarPunto() {
    this.puntos++;
    if (this.puntos >= 10) {
      this.poder = true;
    }
  }
}


class Bowser {
  constructor() {
    this.posX = 660;
    this.posY = 320;
    this.vel = 1;
    this.vida = 100;
    this.espera = 70;
    this.siguiente = 0;
    this.fuegos = [];
    this.agregarFuegos();
  }

  agregarFuegos() {
    for (let i = 0; i < 3; i++) {
      this.fuegos.push(new Fuego());
    }
  }

  mover() {
    if (this.vida > 0) {
      this.posX += this.vel;
      if (this.posX > 700 || this.posX < 620) {
        this.vel = this.vel * -1;
      }
    }
  }

  lanzar() {
    if (this.vida > 0) {
      this.espera--;
      if (this.espera <= 0) {
        this.espera = 70;
        this.fuegos[this.siguiente].lanzar(this.posX);
        this.siguiente++;
        if (this.siguiente >= this.fuegos.length) {
          this.siguiente = 0;
        }
      }
    }
  }

  recibirDanio(n) {
    this.vida -= n;
    if (this.vida < 0) {
      this.vida = 0;
    }
  }

  dibujar() {
    if (this.vida > 0) {
      fill(0, 150, 0);
    } else {
      fill(80);
    }
    ellipse(this.posX, this.posY, 80, 120);
    this.dibujarFuegos();
    this.mover();
  }

  dibujarFuegos() {
    for (let i = 0; i < this.fuegos.length; i++) {
      this.fuegos[i].dibujar();
    }
  }
} 
