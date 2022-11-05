//Variáveis
let arrayQuiz = [];
let etapaTela = null;
let idxValidar = 0;
let perguntaAnterior = null;











// Pegar os dados da API
function requestAPI() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response) => {
      arrayQuiz = response.data;
      questions(arrayQuiz[45].questions, arrayQuiz[45]);
    })
    .catch(() => {
      alert("Erro no request da API");
    });
}

// Primeira tela





































































































































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
  if ( count === arrayQuiz[45].questions.length) {
    showResult()
  }
    setTimeout(scrollQuestion, 2000)
}

function scrollQuestion() {
  const allQuestions = document.querySelectorAll(".container-quizz")
  allQuestions[count].scrollIntoView({behavior : "smooth", block: "start"})
}

function showResult() {
  const resultPercentage = (Math.round((numberHits/count)*100))
  const levels = arrayQuiz[45].levels
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
    <button>Reiniciar Quizz</button>
    <a href="../index.html">Voltar pra home</a>
  </div>
</div>`
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
    proximaEtapa();
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