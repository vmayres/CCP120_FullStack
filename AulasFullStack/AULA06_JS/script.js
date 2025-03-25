p1 = document.getElementById("p1").innerHTML;
ex1 = document.getElementById("ex1");

// mostra o conteúdo do parágrafo p1
console.log(p1);

//muda o conteúdo do parágrafo p1
document.getElementById("p1").innerHTML = "Novo conteúdo do parágrafo p1";
console.log(p1);


// Exemplo 1
let nome = prompt("Digite seu nome: ");
let idade = prompt("Digite sua idade: ");
let ano_atual = 2025;

let ano_nascimento = ano_atual - idade;

ex1.innerHTML = "Olá, " + nome + "! Seu ano de nascimento é " + ano_nascimento + ".";

//exemplo 2
function incremento(){
    var lista = " ";
    var num = parseInt(document.getElementById("num").value);
    for(let i = 0; i < num; i++){
        lista += (num+i) + " ";
    }
    alert(lista);
}


//exemplo 3
function soma(){
    var num1 = parseInt(document.getElementById("sum1").value);
    var num2 = parseInt(document.getElementById("sum2").value);
    var resultado = num1 + num2;

    alert("A soma dos números é: " + resultado);
}

//exemplo 4
function calc(){
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var resultado;

    if( num1 < 0 || num2 < 0){
        var resultado = num1 + num2
    }
    else{
        var resultado = num1 * num2;
    }

    document.getElementById("res").innerHTML = resultado;
}