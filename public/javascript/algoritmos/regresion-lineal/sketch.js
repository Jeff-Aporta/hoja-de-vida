ESCALA = 30;
TX = 0;
TY = 0;

focusCanvas = false;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.id("canvas");
  canvas.parent("contenedor-canvas");
  TX = width * 0.1;
  TY = height * 0.5;
  windowResized();
}

function windowResized() {
  if (windowWidth < 600) {
    resizeCanvas(300, 300);
  } else {
    resizeCanvas(500, 500);
  }
}

function mousePressed() {
  if (mouseInCanvas()) {
    focusCanvas = true;
    disableScroll();
  }
}
function mouseReleased() {
  if (!mouseInCanvas()) {
    focusCanvas = false;
    enableScroll();
  }
}

function mouseDragged() {
  focusCanvas = true;
  if (mouseInCanvas()) {
    disableScroll();
    TX += mouseX - pmouseX;
    TY += mouseY - pmouseY;
  }
}

function mouseWheel(event) {
  if (focusCanvas) {
    ESCALA += event.delta / 20;
    ESCALA = constrain(ESCALA, 5, 200);
  }
}

function mouseInCanvas() {
  return mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height;
}

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}

function draw() {
  background("white");
  translate(TX, TY);
  if (focusCanvas) {
    if (keyIsDown(RIGHT_ARROW)) {
      TX += 2;
    }
    if (keyIsDown(LEFT_ARROW)) {
      TX -= 2;
    }
    if (keyIsDown(UP_ARROW)) {
      TY -= 2;
    }
    if (keyIsDown(DOWN_ARROW)) {
      TY += 2;
    }
  }
  stroke("black");
  fill("black");
  line(-TX, 0, -TX + width, 0);
  line(0, -TY, 0, height - TY);

  let ymin = -ceil((height - TY) / ESCALA);
  let ymax = -Math.floor(-TY / ESCALA);

  let coef_escala = ESCALA < 20 ? (ESCALA < 10 ? 5 : 2) : 1;

  textAlign(RIGHT, CENTER);

  for (let i = ymin; i <= ymax; i += coef_escala) {
    let p = TL_point(0, i);
    push();
    noStroke();
    circle(p.x, p.y, 5);
    if (i != 0) {
      text(
        round(-p.y / ESCALA),
        TX - 15 <= 0 ? 15 - TX : TX >= width ? width - TX - 15 : p.x - 15,
        p.y
      );
    }
    pop();
    push();
    stroke(0, 0, 0, 30);
    if (i != 0) {
      line(-TX, p.y, -TX + width, p.y);
    }
    pop();
  }
  xmin = Math.floor(-TX / ESCALA);
  xmax = Math.floor((width - TX) / ESCALA);
  for (let i = xmin; i <= xmax; i += coef_escala) {
    let p = TL_point(i, 0);
    push();
    noStroke();
    circle(p.x, p.y, 5);
    if (i != 0) {
      text(
        round(p.x / ESCALA),
        p.x,
        TY <= 0 ? -TY + 15 : TY >= height ? height - TY - 15 : p.y + 15
      );
    }
    pop();
    push();
    stroke(0, 0, 0, 30);
    if (i != 0) {
      line(p.x, -TY, p.x, height - TY);
    }
    pop();
  }
  push();
  stroke("red");
  {
    let pxmin = TL_point(xmin - 1, Fx(xmin - 1));
    let pxmax = TL_point(xmax + 1, Fx(xmax + 1));
    line(pxmin.x, pxmin.y, pxmax.x, pxmax.y);
  }
  pop();
  push();
  stroke("blue");
  beginShape();
  for (const p of puntos_dispersos) {
    let v = TL_point(p.x, p.y);
    circle(v.x, v.y, 5);
    vertex(v.x, v.y);
  }
  noFill();
  stroke(0, 0, 0, 100);
  endShape();
  pop();
  push();
  fill("red");
  let mx = mouseX - TX;
  let my = mouseY - TY;
  noStroke();
  let x = mx / ESCALA;
  let y = Fx(x);
  if (mouseX < width / 2) {
    textAlign(LEFT, CENTER);
    text(
      `(${Math.floor(x * 100) / 100},${Math.floor(y * 100) / 100})`,
      mx + 10,
      my
    );
  } else {
    textAlign(RIGHT, CENTER);
    text(
      `(${Math.floor(x * 100) / 100},${Math.floor(y * 100) / 100})`,
      mx - 10,
      my
    );
  }
  circle(mx, my, 5);
  stroke(255, 0, 0, 100);
  let p = TL_point(x, y);
  line(mx, my, p.x, p.y);
  circle(p.x, p.y, 5);
  pop();
}

function TL_point(x, y) {
  let v = createVector(x, y);
  v.mult(ESCALA, -ESCALA);
  return v;
}

puntos_dispersos = [];
let Fx;
let Fx2;

randomizarPuntosDispersos();

function randomizarPuntosDispersos() {
  puntos_dispersos = [];
  rm = Math.random() * 2 - 1;
  rb = Math.random() * 6 - 3;
  Fx2 = (x) => {
    return rm * x + rb;
  };
  for (let x = 1; x <= 10; x++) {
    puntos_dispersos.push({ x, y: Fx2(x) + Math.random() * 5 - 2.5 });
  }
  Fx = regresion_lineal();
  document.getElementById("cantidad").value = puntos_dispersos.length;
  console.log(document.getElementById("cantidad").value);
  actualizarDatosTablaHTML();
}

function regresion_lineal() {
  let x = (y = xy = xx = 0);
  let cantidad = puntos_dispersos.length;

  for (i = 0; i < cantidad; i++) {
    x += puntos_dispersos[i].x;
    y += puntos_dispersos[i].y;
    xy += puntos_dispersos[i].x * puntos_dispersos[i].y;
    xx += puntos_dispersos[i].x ** 2;
  }

  a = (cantidad * xy - x * y) / (cantidad * xx - x ** 2);

  b = (y - a * x) / cantidad;

  document.getElementById("resumen").innerHTML = `
               a=${Math.floor(a * 10000) / 10000}
               <br>
               b=${Math.floor(b * 10000) / 10000}
               <br>
               y=a
               <input type="number" id="independiente" style="width:100px" value="0" onchange="calculadora()" onkeyup="calculadora()">+b
               =<span id="dependiente">0</span>
               `;
  calculadora();

  return function (x) {
    return b + a * x;
  };
}

function calculadora() {
  document.getElementById("dependiente").innerHTML =
    Math.floor(
      (a * Number(document.getElementById("independiente").value) + b) * 100
    ) / 100;
}

function leerTablaHTML() {
  let n = Number(document.getElementById("cantidad").value);
  puntos_dispersos = [];
  for (let i = 0; i < n; i++) {
    let x = Number(document.getElementById(`x-${i}`).innerHTML);
    let y = Number(document.getElementById(`y-${i}`).innerHTML);
    puntos_dispersos.push({ x, y });
  }
}

function actualizarDatosTablaHTML() {
  html = ``;
  let n = Number(document.getElementById("cantidad").value);
  for (let i = 0; i < n; i++) {
    p = puntos_dispersos[i] ?? { x: 0, y: 0 };
    html += `<tr>`;
    html += `<td id="x-${i}" contenteditable="true" onfocus="selectElementContents(this)">`;
    html += Math.floor(p.x * 100) / 100;
    html += `</td>`;
    html += `<td id="y-${i}" contenteditable="true" onfocus="selectElementContents(this)">`;
    html += Math.floor(p.y * 100) / 100;
    html += `</td>`;
    html += `</tr>`;
  }
  html += `
               <tr>
                    <td colspan="2" style="background: black;" onclick="randomizarPuntosDispersos()">
                         <span class="btn btn-primary">
                              <i class="fas fa-random"></i>
                         </span>
                    </td>
               </tr>
               `;
  document.getElementById("dispersion").innerHTML = html;
  for (let i = 0; i < n; i++) {
    document
      .getElementById(`x-${i}`)
      .addEventListener("DOMCharacterDataModified", actualizarDatos);
    document
      .getElementById(`y-${i}`)
      .addEventListener("DOMCharacterDataModified", actualizarDatos);
    document.getElementById(`x-${i}`).addEventListener("keydown", keyDown);
    document.getElementById(`y-${i}`).addEventListener("keydown", keyDown);
    document
      .getElementById(`x-${i}`)
      .addEventListener("keydown", actualizarDatos);
    document
      .getElementById(`y-${i}`)
      .addEventListener("keydown", actualizarDatos);
  }

  function keyDown(evt) {
    if (evt.keyCode < 48 || evt.keyCode > 57) {
      console.log(evt.keyCode);
      switch (evt.keyCode) {
        case 8: //Backspace
        case 9: //TAB
        case 45: //- (menos)
        case 189: //- (menos)
        case 46: //. (punto)
        case 190: //. (punto)
        case 16: //SHIFT
        case 25: //FIN
        case 36: //INICIO
        case 37: //LEFT
        case 39: //RIGHT
          break;
        default:
          evt.preventDefault();
          break;
      }
    }
  }

  actualizarDatos();
}

function actualizarDatos() {
  leerTablaHTML();
  Fx = regresion_lineal();
}

function selectElementContents(element) {
  var range = document.createRange();
  range.selectNodeContents(element);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
