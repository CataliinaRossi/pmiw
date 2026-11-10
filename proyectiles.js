class Fuego {
  constructor() {
    this.posX = -100;
    this.posY = 365;
    this.vel = 6;
    this.danio = 10;
    this.activo = false;
    this.paso = false;
  }

  lanzar(x) {
    this.posX = x;
    this.activo = true;
    this.paso = false;
    if (random(2) < 1) {
      this.posY = 365;
      this.danio = 10;
    } else {
      this.posY = 325;
      this.danio = 5;
    }
  }

  mover() {
    if (this.activo) {
      this.posX -= this.vel;
      if (this.posX < -20) {
        this.activo = false;
      }
    }
  }

  dibujar() {
    if (this.activo) {
      if (this.danio == 10) {
        fill(255, 80, 0);
      } else {
        fill(255, 200, 0);
      }
      ellipse(this.posX, this.posY, 30, 30);
    }
    this.mover();
  }
}
