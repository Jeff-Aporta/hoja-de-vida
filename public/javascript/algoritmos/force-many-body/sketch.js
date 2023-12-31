let circulos = [];
let canvas;

function setup() {
  canvas = createCanvas(800, 600);
  cargarBodies();
  css_canvas();
}

function windowResized() {
  css_canvas()
}

function css_canvas() {
  let sx = windowWidth / width
  let sy = windowHeight / height
  let s = min(sx, sy);
  canvas.style("transform", `scale(${s})`)
  canvas.style("left", `${(windowWidth-width*s)/2}px`)
  canvas.style("top", `${(windowHeight-height*s)/2}px`)
  canvas.style("transformOrigin", `0 0`)
}

function cargarBodies() {
  circulos = [];
  for (let i = 0; i < 40; i++) {
    circulos.push(
      new Circulo(random(25, width - 25), random(25, height - 25), 50)
    );
  }
}

function mouseReleased() {
  cargarBodies();
}

function draw() {
  background("turquoise");
  fill(0, 180, 180, 128);
  stroke("white");
  for (const circulo of circulos) {
    circulo.draw();
  }
  forceManyCircles(circulos);
  for (const circulo of circulos) {
    circulo.x = constrain(circulo.x, circulo.r, width - circulo.r);
    circulo.y = constrain(circulo.y, circulo.r, height - circulo.r);
  }
}

class Circulo {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  draw() {
    circle(this.x, this.y, this.r * 2);
  }

  distanceCenter(circulo) {
    return distanceEuclidean(this, circulo);
  }
}