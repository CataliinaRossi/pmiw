let textos = [
  "Mientras trabaja en las cloacas, Mario encuentra un viejo mapa oculto detrás de una tubería sellada.",
  "Mario despliega el pergamino y lee con sorpresa las advertencias escritas a mano, descubriendo que el mapa expone la oscura verdad del reino.",
  "Mario decide si seguir el mapa o ignorarlo y seguir con su trabajo.",
  "Mario se olvida del asunto y pasa el día arreglando cañerías con total normalidad.",
  "Horas más tarde, una explosión sacude la superficie del Reino Champiñón.",
  "Bowser había intentado infiltrarse solo en el palacio para exponer secretos de la Princesa Peach. Sin embargo, al actuar sin ayuda, las defensas mágicas de la princesa lo superaron por completo.",
  "Mario se cruza con un grupo de Goombas que, en lugar de atacar, huyen asustados de la guardia real.",
  "Los Goombas revelan que la Princesa Peach no es tan inocente y usa magia oscura para controlar el reino.",
  "Para comprobarlo, los Goombas le entregan a Mario un traje de infiltración especial.",
  "Mario sigue avanzando guiándose únicamente por el mapa básico.",
  "Mario logra llegar al palacio flotante por sus propios medios, pero al no tener herramientas se ve obligado a trepar por los muros.",
  "Al intentar entrar por una ventana alta sin estar preparado, es detectado de inmediato por las trampas mágicas del palacio.",
  "La guardia lo rodea y es capturado sin llegar siquiera a ver a Bowser ni descubrir las pruebas de la tiranía.",
  "Mario llega a los portones del palacio flotante de Peach.",
  "Mario irrumpe a la fuerza, rompiendo los portones y causando un gran revuelo en el patio.",
  "Mario entra sigilosamente por los conductos y llega directo al laboratorio secreto de la princesa.",
  "Allí descubre la verdad: Peach planea transformar a todos los habitantes en bloques de ladrillo inanimados para gobernar sola.",
  "Bowser irrumpe en el laboratorio para detener a la princesa, pero confunde a Mario con un cómplice de ella.",
  "Mario le muestra las pruebas a Bowser y entienden que tienen el mismo objetivo: deciden unir fuerzas.",
  "Mario y Bowser exponen los planes de Peach frente a todo el reino. La princesa es derrocada pacíficamente.",
  "El combate es tan ruidoso y destructivo que alerta a la Princesa Peach.",
  "Mario y Bowser quedan encerrados en la celda del palacio."
];

let textosA = [
  "Continuar",
  "Continuar",
  "Ignorarlo",
  "Continuar",
  "Continuar",
  "",
  "Ayudarlos",
  "Continuar",
  "Continuar",
  "Continuar",
  "Continuar",
  "Continuar",
  "",
  "Entrar por la puerta",
  "Continuar",
  "Continuar",
  "Continuar",
  "Explicarle la verdad",
  "Continuar",
  "",
  "Continuar",
  ""
];

let textosB = [
  "",
  "",
  "Seguir el mapa",
  "",
  "",
  "",
  "Ignorarlos",
  "",
  "",
  "",
  "",
  "",
  "",
  "Colarse por los conductos",
  "",
  "",
  "",
  "Pelear contra él",
  "",
  "",
  "",
  ""
];

// arreglos para textos segun pantalla

let siguienteA = [1, 2, 3, 4, 5, -1, 7, 8, 13, 10, 11, 12, -1, 14, 17, 16, 17, 18, 19, -1, 21, -1];
let siguienteB = [-1, -1, 6, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, 15, -1, -1, -1, 20, -1, -1, -1, -1];


// finales malos

let pantallasGameOver = [5, 12, 21];

// oantallas sin musica game over y win

let pantallasSinMusica = [5, 12, 19, 21];

let textosCreditos = [
  "PMIW - Comisión 4",
  "Docente: Leonardo Garay",
  "Integrantes: Julieta Ramos, Catalina Rossi",
  "Historia original: Super Mario Bros (Nintendo, 1985)"
];
