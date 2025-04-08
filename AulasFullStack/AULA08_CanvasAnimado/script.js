const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function desenha(){
    ctx.strokeRect(this.x, this.y, this.largura, this.altura);
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
}

let ret_1 = {
    x: 0,
    y: 0,
    largura: 50,
    altura: 50,
    cor: 'red',
    desenha: desenha,
    
}

let ret_2 = {
    x: 200,
    y: 200,
    largura: 50,
    altura: 50,
    cor: 'blue',
    desenha: desenha,
}

let ret_3 = {
    x: 400,
    y: 400,
    largura: 50,
    altura: 50,
    cor: 'green',
    desenha: desenha,
}

let ret_4 = {
    x: 600,
    y: 600,
    largura: 50,
    altura: 50,
    cor: 'yellow',
    desenha: desenha,
}

function animacao(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ret_1.x < canvas.width - ret_1.largura) {
        ret_1.x += 1;
    }
    ret_1.desenha();
    
    if (ret_2.x < canvas.width - ret_2.largura) {
        ret_2.x += 1;
    }
    ret_2.desenha();
    
    ret_3.desenha();

    ret_4.desenha();

    
    requestAnimationFrame(animacao);
}

animacao();

document.addEventListener('keydown',function(evento){
    tecla = evento.key;
    console.log(tecla);
    if(tecla == 'ArrowUp')   {ret_3.y = ret_3.y-1}  
    if(tecla == 'ArrowDown') {ret_3.y = ret_3.y+1}  
    if(tecla == 'ArrowLeft') {ret_3.x = ret_3.x-1}  
    if(tecla == 'ArrowRight'){ret_3.x = ret_3.x+1}  
})

document.addEventListener('mousemove',function(evento){
    ret_4.x = evento.clientX - canvas.offsetLeft - ret_4.largura / 2;
    ret_4.y = evento.clientY - canvas.offsetTop - ret_4.altura / 2;
})
