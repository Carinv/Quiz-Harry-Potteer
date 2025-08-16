const perguntas = [
    { enunciado: "Qual é o nome da escola de magia frequentada por Harry?", alternativas: [
        { texto: "Hogwarts", correta: true },
        { texto: "Beauxbatons", correta: false },
        { texto: "Durmstrang", correta: false }
    ]},
    { enunciado: "A qual casa de Hogwarts Harry pertence?", alternativas: [
        { texto: "Grifinória", correta: true },
        { texto: "Sonserina", correta: false },
        { texto: "Corvinal", correta: false }
    ]},
    { enunciado: "Qual é o feitiço usado para desarmar um oponente?", alternativas: [
        { texto: "Expelliarmus", correta: true },
        { texto: "Stupefy", correta: false },
        { texto: "Avada Kedavra", correta: false }
    ]},
    { enunciado: "Qual é o nome do esporte praticado em vassouras?", alternativas: [
        { texto: "Quadribol", correta: true },
        { texto: "Explodivôlei", correta: false },
        { texto: "Volleyball", correta: false }
    ]},
    { enunciado: "Em qual plataforma parte o Expresso de Hogwarts?", alternativas: [
        { texto: "Plataforma 9¾", correta: true },
        { texto: "Plataforma 10", correta: false },
        { texto: "Plataforma 7½", correta: false }
    ]},
    { enunciado: "Qual é o patrono de Harry Potter?", alternativas: [
        { texto: "Um cervo", correta: true },
        { texto: "Um lobo", correta: false },
        { texto: "Um leão", correta: false }
    ]},
    { enunciado: "Como se chama a coruja de Harry?", alternativas: [
        { texto: "Edwiges", correta: true },
        { texto: "Perebas", correta: false },
        { texto: "Aragogue", correta: false }
    ]},
    { enunciado: "Quem é o diretor de Hogwarts na maior parte da saga?", alternativas: [
        { texto: "Alvo Dumbledore", correta: true },
        { texto: "Minerva McGonagall", correta: false },
        { texto: "Severo Snape", correta: false }
    ]},
    { enunciado: "Quem matou Dobby?", alternativas: [
        { texto: "Bellatrix Lestrange", correta: true },
        { texto: "Lord Voldemort", correta: false },
        { texto: "Lúciu Malfoy", correta: false }
    ]},
    { enunciado: "Qual é o nome do banco dos bruxos?", alternativas: [
        { texto: "Gringotes", correta: true },
        { texto: "Floreios e Borrões", correta: false },
        { texto: "Madame Malkin", correta: false }
    ]},
    { enunciado: "Quem é o 'prisioneiro de Azkaban'?", alternativas: [
        { texto: "Sirius Black", correta: true },
        { texto: "Lúcio Malfoy", correta: false },
        { texto: "Remo Lupin", correta: false }
    ]},
    { enunciado: "Qual destes itens NÃO é uma Horcrux de Voldemort?", alternativas: [
        { texto: "O Espelho de Ojesed", correta: true },
        { texto: "A Taça de Lufa-Lufa", correta: false },
        { texto: "O Medalhão de Sonserina", correta: false }
    ]}
];

let atual = 0;
let pontos = 0;

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.getElementById("novamente-btn");
const botaoIniciar = document.getElementById("iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");
const elementoPontos = document.getElementById("pontos");

botaoIniciar.addEventListener('click', iniciaJogo);
botaoJogarNovamente.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    atual = 0;
    pontos = 0;
    elementoPontos.textContent = pontos;

    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.style.display = 'block';
    caixaAlternativas.style.display = 'flex';

    embaralhar(perguntas);
    perguntas.forEach(p => embaralhar(p.alternativas));
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.classList.add("fade");
    caixaAlternativas.classList.add("fade");

    setTimeout(() => {
        caixaPerguntas.textContent = `Pergunta ${atual + 1}/${perguntas.length}: ${perguntaAtual.enunciado}`;
        caixaAlternativas.textContent = "";

        perguntaAtual.alternativas.forEach(alt => {
            const botao = document.createElement("button");
            botao.textContent = alt.texto;
            botao.addEventListener("click", () => respostaSelecionada(botao, alt));
            caixaAlternativas.appendChild(botao);
        });

        caixaPerguntas.classList.remove("fade");
        caixaAlternativas.classList.remove("fade");
    }, 300);
}

function respostaSelecionada(botao, opcao) {
    const botoes = caixaAlternativas.querySelectorAll("button");
    botoes.forEach(b => b.disabled = true);

    if (opcao.correta) {
        botao.classList.add("correto");
        pontos++;
        elementoPontos.textContent = pontos;
    } else {
        botao.classList.add("errado");
        const correta = [...botoes].find(b => perguntas[atual].alternativas.find(a => a.texto === b.textContent && a.correta));
        correta.classList.add("correto");
    }

    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 1000);
}

function mostraResultado() {
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    textoResultado.textContent = `Fim do Quiz! Você acertou ${pontos} de ${perguntas.length} perguntas.`;
    caixaResultado.classList.add("mostrar");
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
