class Bowser {
  constructor() {
    this.posX = 660;
    this.posY = 320;
    this.vel = 1;
    this.vida = 100;
    this.espera = 70;
    this.siguiente = 0;
    this.fuegos = [];
    this.gano = false;
    this.estado = "idle";
    this.sprite = 0;
    this.cont = 0;
    this.tam = 150;
    this.agregarFuegos();
  }
 
  agregarFuegos() {
    for (let i = 0; i < 3; i++) {
      this.fuegos.push(new Fuego());
    }
  }
 
  mover() {
    if (this.vida > 0 && this.gano == false) {
      this.posX += this.vel;
      if (this.posX > 700 || this.posX < 620) {
        this.vel = this.vel * -1;
      }
    }
  }
 
  lanzar() {
    if (this.vida > 0) {
      this.espera--;
      if (this.espera == 15) {
        this.fuegos[this.siguiente].lanzar(this.posX - 40);
        this.siguiente++;
        if (this.siguiente >= this.fuegos.length) {
          this.siguiente = 0;
        }
      }
      if (this.espera <= 0) {
        this.espera = 70;
      }
    }
  }
 
  descansar() {
    this.espera = 70;
    for (let i = 0; i < this.fuegos.length; i++) {
      this.fuegos[i].activo = false;
    }
  }
 
  recibirDanio(n) {
    this.vida -= n;
    if (this.vida < 0) {
      this.vida = 0;
    }
  }
 
  elegirEstado() {
    let nuevo = "idle";
    if (this.vida <= 0) {
      nuevo = "derrotado";
    } else if (this.gano) {
      nuevo = "win";
    } else if (this.espera < 30) {
      nuevo = "atacar";
    }
    if (nuevo != this.estado) {
      this.estado = nuevo;
      if (nuevo == "win" || nuevo == "derrotado") {
        this.sprite = 0;
        this.cont = 0;
      }
    }
  }
 
  avanzar(n, vel, repetir) {
    this.cont++;
    if (this.cont >= vel) {
      this.cont = 0;
      this.sprite++;
    }
    if (this.sprite >= n) {
      if (repetir) {
        this.sprite = 0;
      } else {
        this.sprite = n - 1;
      }
    }
  }
 
  dibujarSprite() {
    let img = idlebowser[0];
    if (this.estado == "idle") {
      this.avanzar(idlebowser.length, 2, true);
      img = idlebowser[this.sprite];
    }
    if (this.estado == "atacar") {
      if (this.espera >= 15) {
        img = atacando1;
      } else {
        img = atacando2;
      }
    }
    if (this.estado == "win") {
      this.avanzar(bowserwin.length, 4, false);
      img = bowserwin[this.sprite];
    }
    if (this.estado == "derrotado") {
      this.avanzar(bowserderrotado.length, 4, false);
      img = bowserderrotado[this.sprite];
    }
    let bordeAbajo = this.posY + 60;
    push();
    translate(this.posX, bordeAbajo - this.tam / 2);
    scale(-1, 1);
    image(img, 0, 0, img.width * this.tam / img.height, this.tam);
    pop();
  }
 
  dibujar() {
    this.elegirEstado();
    this.dibujarSprite();
    this.dibujarFuegos();
    this.mover();
  }
 
  dibujarFuegos() {
    for (let i = 0; i < this.fuegos.length; i++) {
      this.fuegos[i].dibujar();
    }
  }
}
