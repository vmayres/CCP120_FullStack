// Gera um número aleatório entre 0 e 99
const numeroSorteado = Math.floor(Math.random() * 99);

// Seleciona os elementos da página
const inputNumero = document.getElementById('numero');
const mensagemFeedback = document.getElementById('mensagem-feedback');
const chutesPequenosElement = document.getElementById('chutes-pequenos');
const chutesGrandesElement = document.getElementById('chutes-grandes');

// Strings para armazenar os números chutados
let chutesPequenos = "";
let chutesGrandes = "";

// Função para verificar o número digitado
function chutar() {
    const numeroDigitado = parseInt(inputNumero.value);

    if (isNaN(numeroDigitado) || numeroDigitado < 0 || numeroDigitado > 100) {
        mensagemFeedback.textContent = 'Por favor, digite um número entre 0 e 99.';
        mensagemFeedback.style.color = 'red';
        inputNumero.style.backgroundColor = 'lightcoral';
        return;
    }

    // Compara o número digitado com o número sorteado
    if (numeroDigitado == numeroSorteado) {
        inputNumero.style.backgroundColor = 'lightgreen';
        mensagemFeedback.textContent = 'Parabéns! Você acertou o número!';
        mensagemFeedback.style.color = 'green';
    } else {
        inputNumero.style.backgroundColor = 'lightcoral';

        if (numeroDigitado < numeroSorteado) {
            // Adiciona o número à string de chutes pequenos
            if (chutesPequenos == "") {
                chutesPequenos = numeroDigitado.toString();
            } else {
                chutesPequenos += `, ${numeroDigitado}`;
            }
            mensagemFeedback.textContent = 'Chute errado! O número é maior.';
        } else {
            // Adiciona o número à string de chutes grandes
            if (chutesGrandes == "") {
                chutesGrandes = numeroDigitado.toString();
            } else {
                chutesGrandes += `, ${numeroDigitado}`;
            }
            mensagemFeedback.textContent = 'Chute errado! O número é menor.';
        }
        mensagemFeedback.style.color = 'red';
    }

    // Atualiza os elementos <p> com os números chutados
    chutesPequenosElement.textContent = `Chutes pequenos: ${chutesPequenos}`;
    chutesGrandesElement.textContent = `Chutes grandes: ${chutesGrandes}`;

    // Limpa o campo de entrada
    inputNumero.value = '';
}