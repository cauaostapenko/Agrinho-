let quizData = [

  {

    question: "Qual é uma característica típica do campo?",

    options: ["Prédios altos", "Agricultura", "Trânsito intenso", "Muitas lojas"],

    answer: 1

  },

  {

    question: "Qual desses transportes é mais comum na cidade?",

    options: ["Trator", "Ônibus", "Cavalo", "Trilha"],

    answer: 1

  },

  {

    question: "O que conecta o campo e a cidade economicamente?",

    options: ["Internet", "Agricultura e comércio", "Praia", "Indústria pesada"],

    answer: 1

  },

  {

    question: "No campo, a principal fonte de renda geralmente é:",

    options: ["Fazenda", "Banco", "Shopping", "Universidade"],

    answer: 0

  },

  {

    question: "Cidades são geralmente conhecidas por terem:",

    options: ["Ar puro", "Muitas fábricas e serviços", "Animais selvagens", "Plantas agrícolas"],

    answer: 1

  },

  {

    question: "Uma vantagem do campo é:",

    options: ["Trânsito rápido", "Contato com a natureza", "Muitos semáforos", "Muitas ruas"],

    answer: 1

  },

  {

    question: "O que o campo geralmente fornece para as cidades?",

    options: ["Alimentos", "Aparelhos eletrônicos", "Roupa", "Cinema"],

    answer: 0

  },

  {

    question: "Um problema comum das cidades é:",

    options: ["Falta de moradores", "Poluição e barulho", "Falta de comida", "Falta de internet"],

    answer: 1

  },

  {

    question: "A cidade é um lugar onde as pessoas geralmente:",

    options: ["Trabalham em fazendas", "Acessam serviços diversos", "Plantam milho", "Criam vacas"],

    answer: 1

  },

  {

    question: "Uma característica comum do campo é:",

    options: ["Muitos prédios", "Pouca poluição", "Trânsito intenso", "Shopping centers"],

    answer: 1

  }

];

let currentQuestion = 0;

let score = 0;

let state = 'start'; // 'start', 'quiz', 'result'

let selectedOption = -1;

let feedback = '';

let optionHover = -1;

function setup() {

  createCanvas(700, 520);

  textFont('Segoe UI, Tahoma, Geneva, Verdana, sans-serif');

  textAlign(CENTER, CENTER);

  noCursor();

}

function draw() {

  background(245);

  // Desenha o cursor customizado

  drawCustomCursor();

  if(state === 'start') {

    drawStart();

  } else if(state === 'quiz') {

    drawQuiz();

  } else if(state === 'result') {

    drawResult();

  }

}

function drawStart() {

  background(135, 206, 250); // céu azul claro

  drawSun(600, 100, 60);

  drawCity(450, 330, 200, 160);

  drawField(100, 380, 280, 100);

  fill(255);

  stroke(30, 144, 255);

  strokeWeight(2);

  textSize(48);

  textStyle(BOLD);

  text("Quiz: Campo e Cidade", width / 2, height / 4);

  noStroke();

  textSize(20);

  textStyle(NORMAL);

  text("Teste seus conhecimentos sobre a conexão entre campo e cidade.", width / 2, height / 4 + 70);

  // Botão iniciar com hover e sombra

  let btnX = width / 2;

  let btnY = height / 1.8;

  let btnW = 220;

  let btnH = 60;

  if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

      mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

    fill(46, 204, 113);

    cursor(HAND);

    drawingContext.shadowColor = 'rgba(46, 204, 113, 0.7)';

    drawingContext.shadowBlur = 20;

  } else {

    fill(39, 174, 96);

    cursor(ARROW);

    drawingContext.shadowBlur = 0;

  }

  rectMode(CENTER);

  noStroke();

  rect(btnX, btnY, btnW, btnH, 30);

  fill(255);

  textSize(26);

  textStyle(BOLD);

  text("Iniciar Quiz", btnX, btnY);

  drawingContext.shadowBlur = 0;

}

function drawQuiz() {

  background(250);

  noStroke();

  fill(30);

  textAlign(LEFT, TOP);

  textSize(20);

  textStyle(BOLD);

  text(`Pergunta ${currentQuestion + 1} de ${quizData.length}`, 30, 20);

  textSize(28);

  textStyle(NORMAL);

  textLeading(36);

  text(quizData[currentQuestion].question, 30, 60, width - 60);

  // Desenha ícone representando campo ou cidade baseado na pergunta

  if(currentQuestion % 2 === 0) {

    drawField(40, 350, 140, 100);

  } else {

    drawCity(520, 350, 140, 100);

  }

  // Opções

  optionHover = -1;

  for (let i = 0; i < quizData[currentQuestion].options.length; i++) {

    let y = 140 + i * 60;

    let optionText = quizData[currentQuestion].options[i];

    // Detecta hover

    if (mouseX > 20 && mouseX < width - 20 && mouseY > y - 8 && mouseY < y + 37) {

      optionHover = i;

    }

    // Fundo opções com animação suave

    noStroke();

    if (i === selectedOption) {

      fill(feedback === 'Correto!' ? 'rgba(46, 204, 113, 0.4)' : 'rgba(231, 76, 60, 0.4)');

      stroke(feedback === 'Correto!' ? '#2ecc71' : '#e74c3c');

      strokeWeight(2);

      drawingContext.shadowColor = feedback === 'Correto!' ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)';

      drawingContext.shadowBlur = 12;

    } else if (i === optionHover) {

      fill('rgba(52, 152, 219, 0.2)');

      noStroke();

      drawingContext.shadowBlur = 8;

      drawingContext.shadowColor = 'rgba(52, 152, 219, 0.4)';

    } else {

      fill(240);

      noStroke();

      drawingContext.shadowBlur = 0;

    }

    rect(20, y - 8, width - 40, 45, 20);

    drawingContext.shadowBlur = 0;

    // Texto da opção

    fill(40);

    textAlign(LEFT, CENTER);

    textSize(22);

    text(optionText, 45, y + 12);

  }

  if (feedback !== '') {

    fill(feedback === 'Correto!' ? '#27ae60' : '#c0392b');

    textAlign(CENTER);

    textSize(26);

    textStyle(BOLD);

    text(feedback, width / 2, height - 110);

  }

  if (selectedOption !== -1) {

    // Botão próxima com sombra e hover

    let btnX = width / 2;

    let btnY = height - 50;

    let btnW = 180;

    let btnH = 50;

    if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

        mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

      fill(41, 128, 185);

      cursor(HAND);

      drawingContext.shadowColor = 'rgba(41, 128, 185, 0.8)';

      drawingContext.shadowBlur = 20;

    } else {

      fill(52, 152, 219);

      cursor(ARROW);

      drawingContext.shadowBlur = 0;

    }

    rectMode(CENTER);

    noStroke();

    rect(btnX, btnY, btnW, btnH, 30);

    fill(255);

    textSize(24);

    textAlign(CENTER, CENTER);

    textStyle(BOLD);

    text("Próxima", btnX, btnY);

    drawingContext.shadowBlur = 0;

  }

}

function drawResult() {

  background(39, 174, 96);

  fill(255);

  textAlign(CENTER, CENTER);

  textSize(48);

  textStyle(BOLD);

  text("Fim do Quiz!", width / 2, height / 3);

  textSize(30);

  textStyle(NORMAL);

  text(`Você acertou ${score} de ${quizData.length} perguntas.`, width / 2, height / 2);

  // Botão reiniciar com sombra e hover

  let btnX = width / 2;

  let btnY = height / 1.8;

  let btnW = 240;

  let btnH = 60;

  if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

      mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

    fill(241, 196, 15);

    cursor(HAND);

    drawingContext.shadowColor = 'rgba(241, 196, 15, 0.9)';

    drawingContext.shadowBlur = 25;

  } else {

    fill(243, 156, 18);

    cursor(ARROW);

    drawingContext.shadowBlur = 0;

  }

  rectMode(CENTER);

  noStroke();

  rect(btnX, btnY, btnW, btnH, 30);

  fill(39, 174, 96);

  textSize(28);

  textStyle(BOLD);

  text("Reiniciar Quiz", btnX, btnY);

  drawingContext.shadowBlur = 0;

}

function mousePressed() {

  if (state === 'start') {

    let btnX = width / 2;

    let btnY = height / 1.8;

    let btnW = 220;

    let btnH = 60;

    if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

        mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

      state = 'quiz';

      currentQuestion = 0;

      score = 0;

      selectedOption = -1;

      feedback = '';

    }

  } else if (state === 'quiz') {

    if (selectedOption === -1) {

      for (let i = 0; i < quizData[currentQuestion].options.length; i++) {

        let y = 140 + i * 60;

        if (mouseX > 20 && mouseX < width - 20 &&

            mouseY > y - 8 && mouseY < y + 37) {

          selectedOption = i;

          if (selectedOption === quizData[currentQuestion].answer) {

            feedback = "Correto!";

            score++;

          } else {

            feedback = "Errado!";

          }

        }

      }

    } else {

      let btnX = width / 2;

      let btnY = height - 50;

      let btnW = 180;

      let btnH = 50;

      if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

          mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

        currentQuestion++;

        if (currentQuestion >= quizData.length) {

          state = 'result';

        } else {

          selectedOption = -1;

          feedback = '';

        }

      }

    }

  } else if (state === 'result') {

    let btnX = width / 2;

    let btnY = height / 1.8;

    let btnW = 240;

    let btnH = 60;

    if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 &&

        mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {

      state = 'start';

      selectedOption = -1;

      feedback = '';

    }

  }

}

// --- Funções para desenhar elementos do campo e cidade ---

function drawSun(x, y, size) {

  noStroke();

  fill(255, 223, 0);

  ellipse(x, y, size);

  // Raios

  for(let i=0; i<12; i++) {

    let angle = TWO_PI/12 * i;

    let sx = x + cos(angle) * size/1.5;

    let sy = y + sin(angle) * size/1.5;

    stroke(255, 223, 0);

    strokeWeight(3);

    line(x, y, sx, sy);

  }

  noStroke();

}

function drawField(x, y, w, h) {

  // Grama

  fill(34, 139, 34);

  rect(x, y, w, h, 15);

  // Árvores simples

  fill(139, 69, 19);

  rect(x + w*0.1, y + h*0.6, w*0.05, h*0.4, 5);

  rect(x + w*0.6, y + h*0.6, w*0.05, h*0.4, 5);

  fill(34, 139, 34);

  ellipse(x + w*0.125, y + h*0.5, w*0.15, h*0.4);

  ellipse(x + w*0.625, y + h*0.5, w*0.15, h*0.4);

  // Cercas

  stroke(255);

  strokeWeight(2);

  for(let i = 0; i < 6; i++) {

    let cx = x + i * w/5;

    line(cx, y + h*0.7, cx, y + h);

  }

  line(x, y + h*0.7, x + w, y + h*0.7);

  noStroke();

}

function drawCity(x, y, w, h) {

  // prédios simples

  fill(70, 130, 180);

  rect(x, y, w*0.3, h);

  rect(x + w*0.35, y + h*0.2, w*0.2, h*0.8);

  rect(x + w*0.6, y + h*0.1, w*0.3, h*0.9);

  // janelas

  fill(255, 255, 224);

  let windowW = 20;

  let windowH = 30;

  let gapX = 30;

  let gapY = 50;

  // Janela prédio 1

  for(let i=0; i<4; i++) {

    for(let j=0; j<3; j++) {

      rect(x + 5 + j*gapX, y + 15 + i*gapY, windowW, windowH, 4);

    }

  }

  // Janela prédio 2

  for(let i=0; i<3; i++) {

    for(let j=0; j<2; j++) {

      rect(x + w*0.35 + 5 + j*gapX, y + h*0.2 + 15 + i*gapY, windowW, windowH, 4);

    }

  }

  // Janela prédio 3

  for(let i=0; i<5; i++) {

    for(let j=0; j<3; j++) {

      rect(x + w*0.6 + 5 + j*gapX, y + h*0.1 + 15 + i*gapY, windowW, windowH, 4);

    }

  }

  // Telhado prédio 1

  fill(100, 149, 237);

  triangle(x, y, x + w*0.15, y - 30, x + w*0.3, y);

}

function drawCustomCursor() {

  push();

  noFill();

  stroke(100, 149, 237);

  strokeWeight(2);

  ellipse(mouseX, mouseY, 25, 25);

  strokeWeight(1);

  line(mouseX - 6, mouseY, mouseX + 6, mouseY);

  line(mouseX, mouseY - 6, mouseX, mouseY + 6);

  pop();

}




