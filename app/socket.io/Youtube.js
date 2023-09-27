var fetchVideoInfo = require('updated-youtube-info');


let videos = {
        "HHDCktzuUCk": "JUEGO DE PREGUNTAS EN JAVASCRIPT",
        "y_rnUOHUoQ4": "TETRIS EN JAVASCRIPT",
        "n8ujo9spBR4": "JUEGO DE MEMORIA (MEMORAMA) EN JAVASCRIPT",
        "Txb5PPDX_70": "PYGAME & PYTHON ► INSTALACIÓN WINDOWS 10 ► CONFIGURACIÓN EN VISUAL STUDIO CODE",
        "2lm_pKhV4gQ": "JUEGO DE PREGUNTAS EN JAVA",
        "CzL00heYQ_M": "JUEGO DE PREGUNTAS EN PYTHON",
        "lg90vwVxmxU": "Javascript: Juego de preguntas v2 (2022)",
        "EkS5AIqednw": "CRONÓMETRO EN JAVASCRIPT",
        "5pHOGw2xhM4": "JAVASCRIPT ▶ JUEGO DE PREGUNTAS (PERSONALIZABLE)",
        "ljzZFkxL9YY": "EFECTO CUBO GIRATORIO CON CSS",
        "UzbAM5_WLf8": "Node.js [ socket.io ]  ► Contador de visitas y usuarios conectados",
        "t1DJRRqbdR4": "JavaScript: Quiz - Cuestionario - Evaluación académica",
        "nfNe-SPlumY": "FLAPPY BIRD EN JAVASCRIPT [ p5.js ]",
        "JA3dvpNbUJs": "JUEGO DE LA VIDA (GAME OF LIFE) EN JAVASCRIPT",
        "_h5Vna-lxKA": "Apendice: Juego de preguntas en Javascript - Pantalla de juego finalizado",
        "w1Ex3tAD2Ps": "RELOJ EN HTML, CSS Y JAVASCRIPT",
        "O9Pf7eHO_ck": "LOGIN BÁSICO EN JAVASCRIPT",
        "0OiQUS9UwIk": "TEMPORIZADOR (TIMER) EN JAVASCRIPT HTML CSS (MUY BONITO)",
        "G51c0yXv2_c": "FILTROS DE COLOR PARA IMÁGENES EN JAVA",
        "bGFBDsVRAZA": "IMAGEN A ESCALA DE GRISES EN JAVA",
        "xwapo6FFhnQ": "BUSCAMINAS (MINESWEEPER) EN JAVASCRIPT",
        "0cvC6XRYz24": "ANIMACIÓN DE PECES EN JAVASCRIPT ( P5.JS )",
        "f61NTH21XEc": "CURSO DE PYGAME - LO ESENCIAL",
        "zbqvr9NFagY": "Javascript (p5.js): Escala, traslación y rotación",
        "r4kAkzmdknQ": "01 Curso de Javascript: Introducción a JavaScript",
        "4ZN4zyyjI2M": "Poema matemático: Los matemáticos también se enamoran.",
        "M2rVqBvUb4w": "EXCEL AVANZADO ► JUEGO LABERINTO",
        "noe_P35Md5M": "ÁRBOLES (FRACTAL) EN JAVASCRIPT [ p5.js ]",
        "QgDnBsoizSM": "JavaScript (p5.js): Generación de video mp4",
        "aVFx4CLyuMk": "SUPER MARIO BROS EN PYTHON [ pygame ]",
        "GKFJajmz_dg": "Javascript (Three.js): Juego de carros 3D",
        "ijqsaG5qp3Y": "Javascript (p5.js): Tierra y luna 3D",
        "W5WTuEg10pQ": "APÉNDICE ► JUEGO DE MEMORIA (JS) ► PONER UN MENSAJE DE JUEGO TÉRMINADO",
        "MCEl05ZbZ80": "PONG SOLITARIO, JUEGO EN JAVASCRIPT (P5.JS)",
        "lrswu1dN_2c": "Poema de programación: Romance en el Mundo de los Algoritmos",
        "h0eAPli2B-Q": "02 Curso de JavaScript: Sintaxis Básica",
        "wgSjVMmkLC0": "SNAKE GAME EN JAVASCRIPT [ p5.js ]",
        "TtQaSRsS2bM": "CURIOSIDAD: EPICICLOIDES EN JAVASCRIPT [ p5.js ]",
        "VU14COpmkgE": "APÉNDICE ► JUEGO DE MEMORIA (JS) ► SISTEMA BÁSICO DE PUNTUACIÓN",
        "1aBuBWWoz3o": "APÉNDICE ► JUEGO DE PREGUNTAS (JS) ► PREGUNTAS NO ALEATORIAS",
        "Xk0Dt6gAueo": "Javascript: Calculadora Básica",
        "ZLbUtOsjIRM": "CentOS 7 & Python (Flask) ► Servidor Local",
        "TOPe7fdwUAo": "CAÍDA DE NIEVE (EFECTO) EN JAVASCRIPT [ p5.js ]",
        "HlcTHvbWpm8": "JavaScript: Memorama (Juego de memoria) ¡¡MUY BONITO!!",
        "DPM6S7Mfvn4": "Aprende p5.js en Javascript (2D)",
        "wywlL3HatE0": "ESPONJA DE MENGER (FRACTAL) EN JAVASCRIPT [ p5.js ]",
        "97hNpRMFrJc": "TRIÁNGULO DE SIERPINSKI (FRACTAL) EN EXCEL",
        "HBT6Bx6ctNQ": "JavaScript Algoritmo: t-SNE",
        "NCkIUdQPVa4": "JavaScript: Preguntas - Quiz - Cuestionario - Evaluación académica - Emparejamiento",
        "QyBchDTyxIs": "JavaScript Reto: Espiral de Ulam (Matriz)",
        "SW0dq_DzeWk": "CONJUNTO DE MANDELBROT EN JAVASCRIPT [ p5.js ]",
        "2iaCrwuLd8w": "Node.js [ Socket.io, Nodemailer ] ► Juego de Amigo Secreto o Invisible",
        "SDnhXcOZiXM": "STARFIELD EN JAVASCRIPT [ p5.js ]",
        "KS3YiXO0jMs": "EXCEL AVANZADO ► JUEGO PUZZLE ► PUSH THE BALL",
        "_5M09jR1SOY": "EXCEL AVANZADO ► JUEGO PLATAFORMA PUZZLE ► CICINDELA",
        "irVVFs3Nlg0": "Javascript Algoritmo: Colisiones entre circulos",
        "h9HhkUjxXZY": "Javascript (p5.js, mp4-encoder): Pomodoro",
        "n28jviohPjk": "CSS: Efecto increible - Tapa redonda",
        "bVwCwfSOOYw": "LECTURA DE ARCHIVOS EN JAVA (LOCALES Y WEB)",
        "3h4uHrx-AKA": "EXCEL AVANZADO ► JUEGO DE NAVES ► INVASIÓN",
        "CTTgpjQJpwM": "Resalte la sintaxis del código fuente | Google Code Prettify | Prettyprint.js",
}

let Youtube = []

Object.keys(videos).forEach((videoId) => {
        fetchVideoInfo(videoId).then(function (videoInfo) {
                Youtube.push(videoInfo)
        });
});

module.exports = Youtube