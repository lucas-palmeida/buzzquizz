//Variáveis
let arrayQuiz = [];
let etapaTela = null;
let idxValidar = 0;
let perguntaAnterior = null;
let qtdPerguntas = null;
let qtdNiveis = null;
let contadorTelas = 0;








// Pegar os dados da API
function requestAPI() {
  axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/00059")
    .then((response) => {
      const verify = window.location.href.includes('telaQuiz')
      arrayQuiz = response.data;
      if (verify) {
        questions(arrayQuiz.questions, arrayQuiz);
      }
    })
    .catch((error) => {
      alert(`Erro no request da API ${error}`);
      window.Location.reload()
    });
}

// Primeira tela

  let quizz1 = document.getElementsByClassName('todos-os-quizzes');

  function ListarQuizes(resposta){

    resposta = resposta.data;
    console.log(quizz1)

    for(let i = 0; i < resposta.length; i++){
      quizz1.innerHTML +=`
      <li class="quizz">
      <a href="./pages/telaQuiz.html">
      <img src="${resposta[i].image}">
      <p>${resposta[i].title}</p>
      </a>
      </li>
      `
      console.log("entrou");
    }

  }
  function GetData(){

  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promessa.then(resposta => ListarQuizes(resposta));

}



































































































































//  Segunda Tela

const mainBox = document.querySelector("main");
const quizBannerDiv = document.querySelector(".container-banner");
let respostaList = "";
let count = 0
let numberHits = 0

function questions(questions, quiz) {
  // Título e imagem do banner com camada preta de 60% de opacidade
  quizBannerDiv.innerHTML = `<h1>${quiz.title}</h1>`;
  quizBannerDiv.style.cssText = `background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quiz.image}) no-repeat center center fixed;`;
  //For passando pelas questões do quiz
  for (let i = 0; i < questions.length; i++) {
    const shuffledAnswers = shuffle(questions[i].answers);
    respostaList = "";
    // For passando pelas respostas do quiz
    for (let a = 0; a < shuffledAnswers.length; a++) {
      let status = "";
      if (shuffledAnswers[a].isCorrectAnswer) {
        status = "rette";
      } else {
        status = "feil";
      }
      respostaList += `
    <figure class="resposta ${status}" onclick="markAnswer(this)">
      <img src="${shuffledAnswers[a].image}" alt="">
      <figcaption>${shuffledAnswers[a].text}</figcaption>
    </figure>`;
    }
    //Adicionando quizzes no html através do JS
    mainBox.innerHTML += `
  <div class="container-quizz">
    <div class="quizz-perguntas">
      <h2>${questions[i].title}</h2>
    </div>
    <div class="container-respostas">
      ${respostaList}
    </div>
  </div>`;
  }
  mudarBackgroundColor(questions);
}

function mudarBackgroundColor(questions) {
  //Alterar a cor de fundo das perguntas
  const perguntasList = document.querySelectorAll(".quizz-perguntas");
  for (let i = 0; i < perguntasList.length; i++) {
    perguntasList[i].style.backgroundColor = `${questions[i].color}`;
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function markAnswer(selected) {
  if (selected.classList.contains("incorrect") || selected.classList.contains("correct")) return false;
  const containerAnswer = selected.parentNode;
  const allAnswer = containerAnswer.querySelectorAll(".resposta");
  const answerCorrect = containerAnswer.querySelector(".rette");
  for (let i = 0; i < allAnswer.length; i++) {
    allAnswer[i].classList.add("incorrect");
    allAnswer[i].lastElementChild.style.color = "#FF4B4B";
  }
  answerCorrect.classList.remove("incorrect");
  answerCorrect.lastElementChild.style.color = "#009C22";
  count += 1
  if (answerCorrect == selected) {
    numberHits += 1
  }
  if ( count === arrayQuiz.questions.length) {
    showResult()
  }
    setTimeout(() => {
      containerAnswer.parentNode.nextElementSibling.scrollIntoView({behavior : "smooth", block: "start"})
    }, 2000)
}

function showResult() {
  const resultPercentage = (Math.round((numberHits/count)*100))
  const levels = arrayQuiz.levels
  let result = levels[0]
  for (let i = 0; i < levels.length; i++) {
    if (resultPercentage >= levels[i].minValue) {
      result = levels[i]
    }
  }
  mainBox.innerHTML += `
  <div class="container-quizz">
  <div class="quizz-perguntas">
    <h2>${resultPercentage}% de acerto: ${result.title}</h2>
  </div>
  <div class="container-result">
    <img src="${result.image}" alt="">
    <p>${result.text}</p>
  </div>
  <div class="result-buttons">
    <button onclick="restart()">Reiniciar Quizz</button>
    <a href="../index.html">Voltar pra home</a>
  </div>
</div>`

setTimeout(() => {
  mainBox.lastElementChild.scrollIntoView({behavior : "smooth", block: "start"})
}, 2000) 
}

function restart() {
  mainBox.firstElementChild.scrollIntoView({behavior : "smooth", block: "start"})
  const allRespostas = document.querySelectorAll(".resposta");
  count = 0
  numberHits = 0
  for (let i = 0; i < allRespostas.length; i++) {
    if (allRespostas[i].classList.contains("rette")) {
      allRespostas[i].lastElementChild.style.color = "";
    } else {
      allRespostas[i].lastElementChild.style.color = "";
      allRespostas[i].classList.remove("incorrect");
    }
  }
}


requestAPI();




































// Terceira tela
// Validando as informações fornecidas nos campos do formulário
function validarFormulario(forma) {
  let campos = forma.parentElement.querySelectorAll(".input-padrao");

  while(idxValidar < campos.length){
    if(campos[idxValidar].validity.valid){
      idxValidar++;
    }
    else {
      alert("Preencha os campos corretamente.");
      idxValidar = 0;
      break;
    }
  }

  if(idxValidar === campos.length){
    idxValidar = 0;
    if(contadorTelas === 0){
      contadorTelas++;
      gerarPerguntas();
      proximaEtapa();
    }
    else if(contadorTelas === 1) {
      contadorTelas++;
      gerarNiveis();
      proximaEtapa();
    }
    else {
      gerarNovoQuiz();
      proximaEtapa();
    }
  }
}

// Passa para a próxima etapa da tela 3
function proximaEtapa() {
  if(etapaTela === null) {
    etapaTela = document.querySelector("section");
    etapaTela.classList.add("esconder");
  }
  else {
    etapaTela.classList.add("esconder");
  }
  etapaTela = etapaTela.nextElementSibling;
  etapaTela.classList.remove("esconder");
}

// Interação do icone de edicao na tela de criar perguntas e niveis
function editarCaixa(caixa) {
  
  if(perguntaAnterior === null) {
    perguntaAnterior = caixa.parentElement;
  }
  else {
    perguntaAnterior.classList.toggle("esconder");
    perguntaAnterior.nextElementSibling.classList.toggle("esconder");
    perguntaAnterior = caixa.parentElement;
  }
  caixa.parentElement.classList.toggle("esconder");
  caixa.parentElement.nextElementSibling.classList.toggle("esconder");
}

// Gera as perguntas de acordo com a quantidade que foi definida pelo usuario
function gerarPerguntas() {
  qtdPerguntas = document.querySelector("#qtd-perguntas").value;
  const campoPerguntas = document.querySelector(".pergunta");

  for(let i = 0; i < qtdPerguntas; i++) {
    campoPerguntas.innerHTML += `
    <article class="caixa-comeco caixa-pergunta">
      <p class="input-texto">Pergunta ${i+1}</p>
      <ion-icon name="create-outline" class="criar-pergunta" onclick="editarCaixa(this)"></ion-icon>
    </article>
    <article class="caixa-comeco esconder">
      <form class="form-comeco formulario-pergunta">
        <p class="input-texto">Pergunta ${i+1}</p>
        <input type="text" minlength="20" class="input-padrao input-pergunta" placeholder="Texto da pergunta" required>
        <input type="text" class="input-padrao input-pergunta" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" placeholder="Cor de fundo da pergunta" required>
        <p class="input-texto">Resposta correta</p>
        <input type="text" class="input-padrao input-resposta" placeholder="Resposta correta" required>
        <input type="url" class="input-padrao input-resposta" placeholder="URL da imagem" required>
        <p class="input-texto">Respostas incorretas</p>
        <input type="text" class="input-padrao input-resposta" placeholder="Resposta incorreta 1" required>
        <input type="url" class="input-padrao input-resposta input-imagem" placeholder="URL da imagem 1" required>
        <input type="text" class="input-padrao input-resposta" placeholder="Resposta incorreta 2" required>
        <input type="url" class="input-padrao input-resposta input-imagem" placeholder="URL da imagem 2" required>
        <input type="text" class="input-padrao input-resposta" placeholder="Resposta incorreta 3" required>
        <input type="url" class="input-padrao input-resposta" placeholder="URL da imagem 3" required>
      </form>
    </article>`;
  }

  campoPerguntas.innerHTML += '<button class="botao-padrao botao-perguntas" onclick="validarFormulario(this)">Prosseguir para criar níveis</button>';
}

// Gera os niveis de acordo com a quantidade definida pelo usuario
function gerarNiveis() {
  qtdNiveis = document.querySelector("#qtd-niveis").value;
  const campoNiveis = document.querySelector(".nivel");

  for(let i = 0; i < qtdNiveis; i++){
    campoNiveis.innerHTML += `
    <article class="caixa-comeco caixa-pergunta">
      <p class="input-texto">Nível ${i+1}</p>
      <ion-icon name="create-outline" class="criar-pergunta" onclick="editarCaixa(this)"></ion-icon>
    </article>
    <article class="caixa-comeco esconder">
      <form class="form-comeco formulario-nivel">
        <p class="input-texto">Nível ${i+1}</p>
        <input type="text" minlength="10" class="input-padrao input-pergunta" placeholder="Título do nível" required>
        <input type="number" min="0" max="100" class="input-padrao input-pergunta" placeholder="% de acerto mínimo" required>
        <input type="url" class="input-padrao input-pergunta" placeholder="URL da imagem do nível" required>
        <input type="text" minlength="30" class="input-padrao input-pergunta" placeholder="Descrição do nível" required>
      </form>
    </article>`;
  }

  campoNiveis.innerHTML += '<button class="botao-padrao botao-finalizar" onclick="validarFormulario(this)">Finalizar Quizz</button>';
}

// Gera o quiz depois de clicar no botao finalizar quiz (AINDA EM DESENVOLVIMENTO)
function gerarNovoQuiz() {
  let tituloQuiz = document.querySelector("#titulo-quiz").value;
  let imagemQuiz = document.querySelector("#imagem-quiz").value;
  let listaPerguntas = [];
  let listaNiveis = [];
  let idxPerguntas = document.querySelectorAll(".formulario-pergunta");
  let idxNiveis = document.querySelectorAll(".formulario-nivel");

  for(let i = 0; i < idxPerguntas.length; i++){
    let listaRespostas = [];
    let textoPergunta = idxPerguntas[i].querySelector(".input-pergunta").value;
    let imagemPergunta = idxPerguntas[i].querySelector(".input-pergunta").nextElementSibling.value;
    let idxRespostas = idxPerguntas[i].querySelectorAll(".input-resposta");

    for(let j = 0; j < idxRespostas.length; j++){
      let textoResposta = null;
      let imagemResposta = null;
      let respostaCorreta = false;
      if(idxRespostas[j] === 0 || idxRespostas[j] % 2 === 0) {
        textoResposta = idxRespostas[j].value;
      } else {
        imagemResposta = idxRespostas[j].value;
      }
      if(idxRespostas[j] === 0) {
        respostaCorreta = true;
      }
      if(idxRespostas[j] % 2 === 0) {
        listaRespostas.push({text: textoResposta, image: imagemResposta, isCorrectAnswer: respostaCorreta});
      }
    }
    listaPerguntas.push({title: textoPergunta, image: imagemPergunta, answers: listaRespostas});
  }

  for(let i = 0; i < idxNiveis.length; i++) {
    let textoNivel = idxNiveis[i].querySelector(".input-pergunta").value;
    let porcentoNivel = idxNiveis[i].querySelector(".input-pergunta").nextElementSibling.value;
    let imagemNivel = idxNiveis[i].querySelector(".input-pergunta").nextElementSibling.nextElementSibling.value;
    let descricaoNivel = idxNiveis[i].querySelector(".input-pergunta").nextElementSibling.nextElementSibling.nextElementSibling.value;
    listaNiveis.push({title: textoNivel, minValue: porcentoNivel, image: imagemNivel, text: descricaoNivel});
  }

  let quiz = {title: tituloQuiz, image: imagemQuiz, questions: listaPerguntas, levels: listaNiveis};
  axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quiz)
  .then(foiEnviado)
  .catch(naoBombou);
}

function foiEnviado(resposta) {
  alert("Foi gol");
  console.log(resposta.status);
}

function naoBombou(resposta) {
  alert("Nao foi mano");
  console.log(resposta.response.status);
}