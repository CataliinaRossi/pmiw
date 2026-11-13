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
    this.gano = false;
    this.danioT = 0;
    this.estado = "idle";
    this.sprite = 0;
    this.cont = 0;
    this.tam = 90;
    this.tamAbajo = 60;
  }
 
  mover() {
    if (this.vida > 0 && this.gano == false) {
      if (keyIsDown(87) && this.enSuelo) {
        this.vy = -18;
        this.enSuelo = false;
        saltar.play();
      }
      if (keyIsDown(83)) {
        this.alto = 30;
      } else {
        this.alto = 60;
      }
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
 
  elegirEstado() {
    let nuevo = "idle";
    if (this.vida <= 0) {
      nuevo = "lose";
    } else if (this.gano) {
      nuevo = "win";
    } else if (this.danioT > 0) {
      nuevo = "danio";
    } else if (this.enSuelo == false) {
      nuevo = "salto";
    } else if (this.alto == 30) {
      nuevo = "abajo";
    }
    if (nuevo != this.estado) {
      this.estado = nuevo;
      this.sprite = 0;
      this.cont = 0;
    }
    if (this.danioT > 0) {
      this.danioT--;
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
    let img = idlemario[0];
    let h = this.tam;
    if (this.estado == "idle") {
      this.avanzar(idlemario.length, 15, true);
      img = idlemario[this.sprite];
    }
    if (this.estado == "abajo") {
      img = abajo;
      h = this.tamAbajo;
    }
    if (this.estado == "danio") {
      this.avanzar(mariodanio.length, 3, false);
      img = mariodanio[this.sprite];
    }
    if (this.estado == "win") {
      this.avanzar(mariowin.length, 4, true);
      img = mariowin[this.sprite];
    }
    if (this.estado == "lose") {
      this.avanzar(mariolose.length, 4, false);
      img = mariolose[this.sprite];
    }
    let bordeAbajo = this.posY + this.alto / 2;
    image(img, this.posX, bordeAbajo - h / 2, img.width * h / img.height, h);
  }
 
  dibujar() {
    this.elegirEstado();
    this.dibujarSprite();
    this.mover();
  }
 
  recibirDanio(n) {
    this.vida -= n;
    if (this.vida < 0) {
      this.vida = 0;
    }
    if (this.vida > 0) {
      daño.play();
    }
    this.danioT = 36;
    this.sprite = 0;
    this.cont = 0;
  }
 
  sumarPunto() {
    if (this.puntos < 10) {
      this.puntos++;
    }
    if (this.puntos >= 10) {
      this.poder = true;
    }
  }
}
 
