// =========================
// GUARDIÕES DAS ABELHAS
// AGRINHO 2026
// =========================
let jogador = "";
let indice = 0;
let pontos = 0;
let tempo = 0;
let cronometro;

// =========================
// PERGUNTAS
// =========================

const perguntas = [

{
pergunta:"Qual é o principal papel das abelhas?",
opcoes:[
"Produzir leite",
"Polinizar plantas",
"Cavar túneis",
"Produzir fertilizantes"
],
correta:1
},

{
pergunta:"O que é apicultura?",
opcoes:[
"Criação de peixes",
"Criação de abelhas",
"Criação de aves",
"Cultivo de soja"
],
correta:1
},

{
pergunta:"Qual produto é produzido pelas abelhas?",
opcoes:[
"Mel",
"Café",
"Trigo",
"Milho"
],
correta:0
},

{
pergunta:"A polinização ajuda:",
opcoes:[
"Destruir plantações",
"Crescimento das plantas",
"Poluir rios",
"Reduzir produção"
],
correta:1
},

{
pergunta:"Qual atitude ajuda as abelhas?",
opcoes:[
"Desmatamento",
"Queimadas",
"Plantar flores",
"Poluição"
],
correta:2
},

{
pergunta:"As abelhas fazem parte do:",
opcoes:[
"Equilíbrio ambiental",
"Poluição",
"Erosão",
"Resíduos industriais"
],
correta:0
},

{
pergunta:"O mel é produzido por:",
opcoes:[
"Vacas",
"Abelhas",
"Peixes",
"Galinhas"
],
correta:1
},

{
pergunta:"O que ameaça as abelhas?",
opcoes:[
"Flores",
"Jardins",
"Agrotóxicos em excesso",
"Árvores"
],
correta:2
},

{
pergunta:"A apicultura sustentável ajuda:",
opcoes:[
"Agricultura e meio ambiente",
"Apenas indústria",
"Apenas comércio",
"Apenas transporte"
],
correta:0
},

{
pergunta:"O tema do Agrinho 2026 busca:",
opcoes:[
"Mais poluição",
"Equilíbrio entre produção e meio ambiente",
"Menos sustentabilidade",
"Produção sem preservação"
],
correta:1
}

];

// =========================
// LOADING
// =========================

let progresso = 0;

const loading =
setInterval(()=>{

progresso += 2;

document.getElementById("progressoLoading")
.style.width = progresso + "%";

if(progresso >= 100){

clearInterval(loading);

mostrarTela("inicio");

}

},40);

// =========================
// TROCAR TELA
// =========================

function mostrarTela(id){

document
.querySelectorAll(".tela")
.forEach(t=>t.classList.remove("ativa"));

document
.getElementById(id)
.classList.add("ativa");

}

// =========================
// ENTRADA
// =========================

function salvarNome() {

    jogador = document.getElementById("nomeJogador").value;

    if(jogador.trim() === "") {
        alert("Digite seu nome!");
        return;
    }

    localStorage.setItem("nomeJogador", jogador);

    mostrarTela("introducao");
}

// =========================
// INICIAR QUIZ
// =========================

function iniciarQuiz(){

mostrarTela("quiz");

cronometro = setInterval(()=>{

tempo++;

document.getElementById("timer")
.innerHTML =
"⏱️ Tempo: " + tempo + "s";

},1000);

carregarPergunta();

}

// =========================
// CARREGAR PERGUNTA
// =========================

function carregarPergunta(){

const p = perguntas[indice];

document.getElementById("contador")
.innerHTML =
"Pergunta " +
(indice + 1) +
" de " +
perguntas.length;

document.getElementById("pergunta")
.innerHTML = p.pergunta;

const opcoes =
document.getElementById("opcoes");

opcoes.innerHTML = "";

const porcentagem =
(indice / perguntas.length) * 100;

document.getElementById("barraQuiz")
.style.width =
porcentagem + "%";

p.opcoes.forEach((opcao,i)=>{

const btn =
document.createElement("button");

btn.className = "opcao";

btn.innerHTML = opcao;

btn.onclick = ()=>responder(i);

opcoes.appendChild(btn);

});

}

// =========================
// SOM ACERTO
// =========================

function somAcerto() {

    const audio =
    document.getElementById("somAcertoPersonalizado");

    audio.currentTime = 0;
    audio.play();
}

// =========================
// SOM ERRO
// =========================

function somErro(){

let ctx =
new(window.AudioContext ||
window.webkitAudioContext)();

let osc =
ctx.createOscillator();

osc.type = "square";

osc.frequency.value = 180;

osc.connect(ctx.destination);

osc.start();

osc.stop(
ctx.currentTime + 0.20
);

}

// =========================
// RESPONDER
// =========================

function responder(opcao){

    const correta = perguntas[indice].correta;

    if(opcao === correta){

        pontos++;

        console.log("Acertou! Pontos:", pontos);

        somAcerto();

        document.getElementById("mensagem").innerHTML =
        "✅ Resposta correta!";

    } else {

        console.log("Errou!");

        somErro();

        document.getElementById("mensagem").innerHTML =
        "❌ Resposta incorreta!";
    }

    setTimeout(() => {

        document.getElementById("mensagem").innerHTML = "";

        indice++;

        if(indice < perguntas.length){
            carregarPergunta();
        } else {
            finalizarQuiz();
        }

    }, 1000);
}

// =========================
// RANKING
// =========================

function salvarRanking(){

let ranking =

JSON.parse(
localStorage.getItem(
"rankingAbelhas"
)
) || [];

ranking.push({

nome:jogador,
pontos:pontos

});

ranking.sort(
(a,b)=>b.pontos-a.pontos
);

ranking = ranking.slice(0,5);

localStorage.setItem(
"rankingAbelhas",
JSON.stringify(ranking)
);

let html = "";

ranking.forEach((item,i)=>{

html +=
`${i+1}º 🏅
${item.nome}
- ${item.pontos} pontos
<br>`;

});

document.getElementById("ranking")
.innerHTML = html;

}

// =========================
// RESULTADO
// =========================

function finalizarQuiz(){

clearInterval(cronometro);

mostrarTela("resultado");

document.getElementById("barraQuiz")
.style.width = "100%";

let medalha = "";

if(pontos <= 4){

medalha =
"🥉 Aprendiz das Abelhas";

}
else if(pontos <= 7){

medalha =
"🥈 Protetor da Natureza";

}
else{

medalha =
"🥇 Guardião das Abelhas";

criarConfetes();

}

document.getElementById("placar")
.innerHTML =

`
<h2>${jogador}</h2>

<br>

Acertos:
<b>${pontos}</b>
de
<b>${perguntas.length}</b>

<br><br>

Tempo:
<b>${tempo}s</b>
`;

document.getElementById("medalha")
.innerHTML = medalha;

salvarRanking();

}

document.getElementById("placar").innerHTML = `
<h2>🐝 ${jogador}</h2>

<h3>Pontuação Final</h3>

<p style="font-size:40px; color:#ff9800;">
${pontos} / ${perguntas.length}
</p>

<p>
Você acertou <b>${pontos}</b> de
<b>${perguntas.length}</b> perguntas.
</p>

<p>
⏱️ Tempo: <b>${tempo}s</b>
</p>
`;
// =========================
// CERTIFICADO
// =========================

function gerarCertificado(){

const janela =
window.open("","_blank");

janela.document.write(`

<html>

<head>

<title>Certificado</title>

<style>

body{

font-family:Arial;
text-align:center;
padding:50px;

}

h1{

color:#ff9800;

}

</style>

</head>

<body>

<h1>
🏆 CERTIFICADO
</h1>

<br>

<p>

Certificamos que

<b>${jogador}</b>

concluiu com sucesso o quiz

"Guardiões das Abelhas"

do Agrinho 2026.

</p>

<br>

<p>

Pontuação:
<b>${pontos}/10</b>

</p>

<p>

Tempo:
<b>${tempo}s</b>

</p>

</body>

</html>

`);

janela.print();

}
const musicaFundo = document.getElementById("AUDIOFUNDO");

function tocarMusica() {
    musicaFundo.volume = 0.3; // 30% do volume
    musicaFundo.play();
}
function iniciarJogo() {
    tocarMusica();
    mostrarTela("telaNome");
}
function criarAbelhas() {

    const container = document.getElementById("abelhas");

    for(let i = 0; i < 15; i++) {

        const abelha = document.createElement("div");

        abelha.className = "abelha";

        abelha.innerHTML = "🐝";

        abelha.style.top =
            Math.random() * 90 + "%";

        abelha.style.animationDuration =
            (5 + Math.random() * 8) + "s";

        abelha.style.animationDelay =
            (Math.random() * 5) + "s";

        abelha.style.fontSize =
            (25 + Math.random() * 25) + "px";

        container.appendChild(abelha);
    }
}

window.onload = criarAbelhas;