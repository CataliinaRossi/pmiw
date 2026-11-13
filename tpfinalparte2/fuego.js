class Fuego {
  constructor() {
    this.posX = -100;
    this.posY = 365;
    this.vel = 6;
    this.danio = 10;
    this.tam = 50;
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
      this.tam = 50;
    } else {
      this.posY = 325;
      this.danio = 5;
      this.tam = 35;
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
      let img = fuego1;
      if (this.danio == 10) {
        img = fuego2;
      }
      image(img, this.posX, this.posY, img.width * this.tam / img.height, this.tam);
    }
    this.mover();
  }
}
