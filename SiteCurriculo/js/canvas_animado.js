const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function desenha() {
    const img = new Image();
    img.src = "../Assets/Image/python.png";
    ctx.drawImage(img, this.x, this.y, this.largura, this.altura);
}

let ret_4 = {
    x: 600,
    y: 600,
    largura: 50,
    altura: 50,
    desenha: desenha,
};

function animacao() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ret_4.desenha();
    requestAnimationFrame(animacao);
}

animacao();

document.addEventListener('mousemove', function(evento) {
    let newX = evento.clientX - canvas.offsetLeft - ret_4.largura / 2;
    let newY = evento.clientY - canvas.offsetTop - ret_4.altura / 2;

    ret_4.x = Math.max(0, Math.min(canvas.width - ret_4.largura, newX));
    ret_4.y = Math.max(0, Math.min(canvas.height - ret_4.altura, newY));
});