// Função para desenhar um quadrado
function desenha_quadrado(x, y, largura, altura, cor, cor_borda = null) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
    if (cor_borda !== null) {
        ctx.strokeStyle = cor_borda;
        ctx.strokeRect(x, y, largura, altura);
    }
    ctx.closePath();
}

// Função para desenhar um círculo
function desenha_circulo(x, y, raio, cor, cor_borda = null) {
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, 2 * Math.PI);
    ctx.fillStyle = cor;
    ctx.fill();
    if (cor_borda) {
        ctx.strokeStyle = cor_borda;
        ctx.stroke();
    }
    ctx.closePath();
}

// Função para desenhar uma linha
// start_x e start_y são as coordenadas iniciais da linha
function desenha_linha(start_x, start_y, pontos, cor, cor_fill = null) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor;
    ctx.moveTo(start_x, start_y);

    //desenha as linhas para cada ponto
    for (let i = 0; i < pontos.length; i++) {
        ctx.lineTo(pontos[i][0], pontos[i][1]);
    }

    if (cor_fill) {
        ctx.fillStyle = cor_fill;
        ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();
}

// Função para desenhar um arco
// start_x e start_y são as coordenadas iniciais do arco
function desenhar_arco(start_x, start_y, pontos, raio, cor, cor_fill = null) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor;

    // Começa no ponto inicial do primeiro arco
    ctx.moveTo(start_x + raio * Math.cos(pontos[0][0] * Math.PI), start_y + raio * Math.sin(pontos[0][0] * Math.PI));

    for (let i = 0; i < pontos.length; i++) {
        ctx.arc(start_x, start_y, raio, pontos[i][0] * Math.PI, pontos[i][1] * Math.PI);
    }

    if (cor_fill) {
        ctx.fillStyle = cor_fill;
        ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();
}

// Função para escrever texto
function escreve_texto(text, text_x, text_y, preenc_x, preenc_y, font, cor, cor_borda = null){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillStyle = cor;
    ctx.fillText(text, preenc_x, preenc_y);
    ctx.strokeStyle = cor_borda;
    ctx.strokeText(text, text_x, text_y);
    ctx.closePath();
}

// Desenha o canvas de linhas
function Canvas_linhas(){
    //Fundo do canvas
    desenha_quadrado(0, 0, 300, 300, "white");
    
    // Desenhando os quadrados
    desenha_quadrado(0, 0, 50, 50, "blue");
    desenha_quadrado(250, 0, 50, 50, "red");
    desenha_quadrado(0, 120, 30, 60, "aqua");
    desenha_quadrado(270, 135, 30, 30, "aqua");
    desenha_quadrado(0, 240, 30, 60, "yellow");
    desenha_quadrado(30, 270, 30, 30, "yellow");
    desenha_quadrado(270, 240, 30, 60, "black");
    desenha_quadrado(240, 270, 30, 30, "black");
    desenha_quadrado(110, 150, 40, 40, "red");

    // Desenhando os círculos
    // circulo amarelo
    desenha_circulo(70, 220, 15, "yellow", "green");
    desenha_circulo(220, 220, 15, "yellow", "green");
    // circulo aqua
    desenha_circulo(150, 115, 15, "aqua", "blue");

    // Desenhando as linhas
    desenha_linha(0, 150, [[300, 150]], "green");
    desenha_linha(0, 0, [[150, 150]], "blue");
    desenha_linha(150, 150, [[150, 300]], "blue");
    desenha_linha(300, 0, [[150, 150]], "red");

    // Desenhando os arcos
    desenhar_arco(150, 300, [[1, 2]], 40, "green");
    desenhar_arco(150, 300, [[1.5, 2]], 60, "green");
    desenhar_arco(150, 300, [[1, 1.5]], 80, "green");
    desenhar_arco(150, 150, [[1, 2]], 60, "green");
    desenhar_arco(150, 150, [[1, 1.25]], 80, "green");
    desenhar_arco(150, 150, [[1.75, 2]], 80, "green");

    // Desenhando os textos
    escreve_texto("Canvas", 150, 45, 150, 45, "20px Arial", "black");

    // Borda do canvas
    desenha_linha(0, 0, [[300, 0], [300, 300], [0, 300], [0, 0]], "black");
}

//desenho da casa
function Canvas_casa() {
    // Fundo do canvas
    desenha_quadrado(0, 0, 400, 400, "aqua");

    // Chão
    desenha_quadrado(0, 300, 400, 100, "gray");

    // Casa
    desenha_quadrado(150, 200, 100, 100, "saddlebrown");
    desenha_linha(150, 200, [[200, 150], [250, 200], [150, 200]], "salmon", "salmon");
    desenha_quadrado(190, 250, 20, 50, "#5C4033");
    desenha_quadrado(160, 220, 30, 30, "lightblue");
    desenha_quadrado(210, 220, 30, 30, "lightblue");

    // Árvores
    desenha_quadrado(50, 250, 20, 50, "saddlebrown");
    desenha_circulo(60, 235, 30, "green");
    desenha_quadrado(350, 300, 20, 50, "saddlebrown");
    desenha_circulo(360, 285, 30, "green");

    // Cachoeira
    desenha_circulo(0, 300, 50, "blue");
    desenha_quadrado(0, 300, 50, 100, "blue");
    desenha_quadrado(50, 350, 100, 50, "blue");
    desenha_circulo(150, 400, 50, "blue");

    // Sol
    desenha_circulo(300, 100, 50, "yellow");
}

// Obtém os elementos canvas do HTML
const canvasLinha = document.getElementById("linhas");
const canvasCasa = document.getElementById("casa");

const ctxLinha = canvasLinha.getContext("2d");
const ctxCasa = canvasCasa.getContext("2d");

// Define o contexto global para o canvas de linhas e desenha
ctx = ctxLinha;
Canvas_linhas();

// Define o contexto global para o canvas de casa e desenha
ctx = ctxCasa;
Canvas_casa();