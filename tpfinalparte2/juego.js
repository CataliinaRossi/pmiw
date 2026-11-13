class Juego {
  constructor() {
    this.mario = new Mario();
    this.bowser = new Bowser();
    this.finT = 0;
    this.ganT = 0;
    this.reiniciable = false;
    this.ganasteVisible = false;
    this.finalSonado = false;
    this.golpeAncho = 420;
    this.golpeY = 130;
    this.sacudida = 4;
  }

  dibujar() {
    this.dibujarFondo();
    this.dibujarBowser();
    this.dibujarMario();
    this.detectarColisionMario();
    this.detectarEsquive();
    this.detectarPoder();
    this.detectarFinal();
    this.dibujarDatos();
    this.dibujarGolpe();
    this.dibujarGanaste();
    this.dibujarGameOver();
  }

  dibujarFondo() {
    image(fondo, 400, 225, 800, 450);
  }

  dibujarBowser() {
    this.bowser.dibujar();
    if (this.mario.poder) {
      this.bowser.descansar();
    } else if (this.mario.vida > 0) {
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

  detectarFinal() {
    if (this.bowser.vida <= 0) {
      this.mario.gano = true;
      this.reiniciable = true;
      if (this.finalSonado == false) {
        this.finalSonado = true;
        this.pararMusica();
        win.play();
      }
    }
    if (this.mario.vida <= 0) {
      this.bowser.gano = true;
      if (this.finalSonado == false) {
        this.finalSonado = true;
        this.pararMusica();
        mariomorir.play();
      }
    }
  }

  pararMusica() {
    if (musicaFondo) {
      musicaFondo.stop();
    }
  }

  dibujarGolpe() {
    if (this.mario.poder && this.bowser.vida > 0) {
      let sx = random(-this.sacudida, this.sacudida);
      let sy = random(-this.sacudida, this.sacudida);
      let alto = golpeespecial.height * this.golpeAncho / golpeespecial.width;
      image(golpeespecial, 400 + sx, this.golpeY + sy, this.golpeAncho, alto);
    }
  }

  dibujarGanaste() {
    if (this.bowser.vida <= 0) {
      this.ganT++;
      if (this.ganT > 90) {
        image(ganaste, 400, 225, 800, 450);
        this.ganasteVisible = true;
        if (verzona) {
          mostrarZona(gbx, gby, gbw, gbh);
        }
      }
    }
  }

  dibujarGameOver() {
    if (this.mario.vida <= 0) {
      this.finT++;
      if (this.finT > 120) {
        image(imggameover, 400, 225, 800, 450);
        this.reiniciable = true;
      }
      if (this.finT == 121) {
        gameover.play();
      }
    }
  }

  dibujarCorazones() {
    for (let i = 0; i < 5; i++) {
      let h = this.mario.vida - i * 20;
      let img = corazonvacio;
      if (h > 10) {
        img = corazonlleno;
      } else if (h > 0) {
        img = corazonmitad;
      }
      image(img, 36 + i * 40, 36, img.width * 32 / img.height, 32);
    }
  }

  dibujarDatos() {
    this.dibujarCorazones();
    fill(255,0,0);
    textSize(16);
    text("Puntos: " + this.mario.puntos + " / 10", 20, 80);
    if (this.mario.poder && this.bowser.vida > 0) {
      text("golpe listo: X", 20, 100);
    }
  }
}
