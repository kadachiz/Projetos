const gridSpace = 30;

let pecaCaindo;
let gridpecas = [];
let lineFades = [];
let gridWorkers = [];

let atualScore = 0;
let atualLevel = 1;
let linesCompleta = 0;

let ticks = 0;
let updateTodo = 15;
let updateTodoatual = 15;
let caidaVelocidade = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

const gameEdgeLeft = 150;
const gameEdgeRight = 450;

const colors = [
    '#dca3ff',
    '#ff90a0',
    '#80ffb4',
    '#ff7666',
    '#70b3f5',
    '#b2e77d',
    '#ffd700',
];

function setup() {
    createCanvas(600, 540);

    pecaCaindo = new PlayPiece();
    pecaCaindo.resetPiece();

    textFont('Tiny5');
}

function draw() {
    const colorDark = '#0d0d0d';
    const colorLight = '#304550';
    const colorBackground = '#c4cfa1';

    background(colorBackground);

    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 150, height);

    rect(0, 0, gameEdgeLeft, height);

    fill(colorBackground);
    rect(450, 80, 150, 70);

    rect(460, 405, 130, 130, 5, 5);

    rect(460, 210, 130, 60, 5, 5);

    rect(460, 280, 130, 60, 5, 5);

    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    rect(465, 215, 120, 50, 5, 5);

    rect(465, 285, 120, 50, 5, 5);

    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    textSize(24);
    textAlign(RIGHT);
    text(atualScore, 560, 135);
    text(atualLevel, 560, 260);
    text(linesCompleta, 560, 330);

    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeRight, height);

    pecaCaindo.show();

    if (keyIsDown(DOWN_ARROW)) {
        updateTodo = 2;
    } else {
        updateTodo = updateTodoatual;
    }

    if (!pauseGame) {
        ticks++;
        if (ticks >= updateTodo) {
            ticks = 0;
            pecaCaindo.fall(caidaVelocidade);
        }
    }

    for (let i = 0; i < gridpecas.length; i++) {
        gridpecas[i].show();
    }

    for (let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }

    if (gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);
    text("Controles:\n↑\n← ↓ →\n", 75, 155);
    text("Direita e Esquerda:\nmove as peças", 75, 230);
    text("Cima:\nGira a peça", 75, 280);
    text("Baixo:\nCaia rápido", 75, 330);
    text("R:\nResetar o jogo", 75, 380);

    if (gameOver) {
        fill(0, 200);
        rect(0, 0, width, height);
    
        fill(255);
        textSize(54);
        textAlign(CENTER);
        text("Game Over!", width / 2, height / 2);
    }
    

    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}

function keyPressed() {
    if (keyCode === 82) {
        resetGame();
    }
    if (!pauseGame) {
        if (keyCode === LEFT_ARROW) {
            pecaCaindo.input(LEFT_ARROW);
        } else if (keyCode === RIGHT_ARROW) {
            pecaCaindo.input(RIGHT_ARROW);
        }
        if (keyCode === UP_ARROW) {
            pecaCaindo.input(UP_ARROW);
        }
    }
}

class PlayPiece {
    constructor() {
        this.pos = createVector(0, 0);
        this.rotacao = 0;
        this.proxtipoPeca = Math.floor(Math.random() * 7);
        this.proxPeca = [];
        this.tipoPeca = 0;
        this.pecas = [];
        this.orientation = [];
        this.caida = false;
    }

    proxPiece() {
        this.proxtipoPeca = pseudoRandom(this.tipoPeca);
        this.proxPeca = [];

        const points = orientPoints(this.proxtipoPeca, 0);
        let xx = 525, yy = 490;

        if (this.proxtipoPeca !== 0 && this.proxtipoPeca !== 3 && this.proxtipoPeca !== 5) {
            xx += (gridSpace * 0.5);
        }

        if (this.proxtipoPeca == 5) {
            xx -= (gridSpace * 0.5);
        }

        for (let i = 0; i < 4; i++) {
            this.proxPeca.push(new Square(xx + points[i][0] * gridSpace, yy + points[i][1] * gridSpace, this.proxtipoPeca));
        }
    }

    fall(quantia) {
        if (!this.futureCollision(0, quantia, this.rotacao)) {
            this.addPos(0, quantia);
            this.caida = true;
        } else {
            if (!this.caida) {
                pauseGame = true;
                gameOver = true;
            } else {
                this.commitShape();
            }
        }
    }

    resetPiece() {
        this.rotacao = 0;
        this.caida = false;
        this.pos.x = 330;
        this.pos.y = -60;

        this.tipoPeca = this.proxtipoPeca;

        this.proxPiece();
        this.newPoints();
    }

    newPoints() {
        const points = orientPoints(this.tipoPeca, this.rotacao);
        this.orientation = points;
        this.pecas = [];

        for (let i = 0; i < points.length; i++) {
            this.pecas.push(new Square(this.pos.x + points[i][0] * gridSpace, this.pos.y + points[i][1] * gridSpace, this.tipoPeca));
        }
    }

    updatePoints() {
        if (this.pecas) {
            const points = orientPoints(this.tipoPeca, this.rotacao);
            this.orientation = points;
            for (let i = 0; i < 4; i++) {
                this.pecas[i].pos.x = this.pos.x + points[i][0] * gridSpace;
                this.pecas[i].pos.y = this.pos.y + points[i][1] * gridSpace;
            }
        }
    }

    addPos(x, y) {
        this.pos.x += x;
        this.pos.y += y;

        if (this.pecas) {
            for (let i = 0; i < 4; i++) {
                this.pecas[i].pos.x += x;
                this.pecas[i].pos.y += y;
            }
        }
    }

    futureCollision(x, y, rotacao) {
        let xx, yy, points = 0;
        if (rotacao !== this.rotacao) {
            points = orientPoints(this.tipoPeca, rotacao);
        }

        for (let i = 0; i < this.pecas.length; i++) {
            if (points) {
                xx = this.pos.x + points[i][0] * gridSpace;
                yy = this.pos.y + points[i][1] * gridSpace;
            } else {
                xx = this.pecas[i].pos.x + x;
                yy = this.pecas[i].pos.y + y;
            }
            if (xx < gameEdgeLeft || xx + gridSpace > gameEdgeRight || yy + gridSpace > height) {
                return true;
            }
            for (let j = 0; j < gridpecas.length; j++) {
                if (xx === gridpecas[j].pos.x) {
                    if (yy >= gridpecas[j].pos.y && yy < gridpecas[j].pos.y + gridSpace) {
                        return true;
                    }
                    if (yy + gridSpace > gridpecas[j].pos.y && yy + gridSpace <= gridpecas[j].pos.y + gridSpace) {
                        return true;
                    }
                }
            }
        }
    }

    input(key) {
        switch (key) {
            case LEFT_ARROW:
                if (!this.futureCollision(-gridSpace, 0, this.rotacao)) {
                    this.addPos(-gridSpace, 0);
                }
                break;
            case RIGHT_ARROW:
                if (!this.futureCollision(gridSpace, 0, this.rotacao)) {
                    this.addPos(gridSpace, 0);
                }
                break;
            case UP_ARROW:
                let novaRotacao = this.rotacao + 1;
                if (novaRotacao > 3) {
                    novaRotacao = 0;
                }
                if (!this.futureCollision(0, 0, novaRotacao)) {
                    this.rotacao = novaRotacao;
                    this.updatePoints();
                }
                break;
        }
    }

    rotate() {
        this.rotacao += 1;
        if (this.rotacao > 3) {
            this.rotacao = 0;
        }
        this.updatePoints();
    }

    show() {
        for (let i = 0; i < this.pecas.length; i++) {
            this.pecas[i].show();
        }
        for (let i = 0; i < this.proxPeca.length; i++) {
            this.proxPeca[i].show();
        }
    }

    commitShape() {
        for (let i = 0; i < this.pecas.length; i++) {
            gridpecas.push(this.pecas[i]);
        }
        this.resetPiece();
        analyzeGrid();
    }
}

class Square {
    constructor(x, y, type) {
        this.pos = createVector(x, y);
        this.type = type;
    }

    show() {
        strokeWeight(2);
        const colorDark = '#092e1d';
        const colorMid = colors[this.type];

        fill(colorMid);
        stroke(25);
        rect(this.pos.x, this.pos.y, gridSpace - 1, gridSpace - 1);

        noStroke();
        fill(255);
        rect(this.pos.x + 6, this.pos.y + 6, 18, 2);
        rect(this.pos.x + 6, this.pos.y + 6, 2, 16);
        fill(25);
        rect(this.pos.x + 6, this.pos.y + 20, 18, 2);
        rect(this.pos.x + 22, this.pos.y + 6, 2, 16);
    }
}

function pseudoRandom(previous) {
    let roll = Math.floor(Math.random() * 8);
    if (roll === previous || roll === 7) {
        roll = Math.floor(Math.random() * 7);
    }
    return roll;
}

function analyzeGrid() {
    let score = 0;
    while (checkLines()) {
        score += 100;
        linesCompleta += 1;
        if (linesCompleta % 10 === 0) {
            atualLevel += 1;
            if (updateTodoatual > 2) {
                updateTodoatual -= 10;
            }
        }
    }
    if (score > 100) {
        score *= 2;
    }
    atualScore += score;
}

function checkLines() {
    for (let y = 0; y < height; y += gridSpace) {
        let count = 0;
        for (let i = 0; i < gridpecas.length; i++) {
            if (gridpecas[i].pos.y === y) {
                count++;
            }
        }
        if (count === 10) {
            gridpecas = gridpecas.filter(piece => piece.pos.y !== y);
            for (let i = 0; i < gridpecas.length; i++) {
                if (gridpecas[i].pos.y < y) {
                    gridpecas[i].pos.y += gridSpace;
                }
            }
            return true;
        }
    }
    return false;
}

class Worker {
    constructor(y, quantia) {
        this.quantiaAtual = 0;
        this.quantiaTotal = quantia;
        this.yVal = y;
    }

    work() {
        if (this.quantiaAtual < this.quantiaTotal) {
            for (let j = 0; j < gridpecas.length; j++) {
                if (gridpecas[j].pos.y < y) {
                    gridpecas[j].pos.y += 5;
                }
            }
            this.quantiaAtual += 5;
        } else {
            gridWorkers.shift();
        }
    }
}

function resetGame() {
    pecaCaindo = new PlayPiece();
    pecaCaindo.resetPiece();
    gridpecas = [];
    lineFades = [];
    gridWorkers = [];
    atualScore = 0;
    atualLevel = 1;
    linesCompleta = 0;
    ticks = 0;
    updateTodo = 15;
    updateTodoatual = 15;
    caidaVelocidade = gridSpace * 0.5;
    pauseGame = false;
    gameOver = false;
}
