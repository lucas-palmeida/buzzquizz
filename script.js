let arrayQuiz = [];

// Pegar os dados da API
function requestAPI() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response) => {
      arrayQuiz = response.data;
      console.log(arrayQuiz)
      respostas(arrayQuiz[0].questions);
    })
    .catch(() => {
      alert("Erro no request da API");
    });
}

//  Segunda Tela

const mainBox = document.querySelector("main");
const quizBannerDiv = document.querySelector(".container-banner");
let respostaList = "";

function respostas(arrayQuestions) {
  const arrayAnswers = arrayQuestions[0].answers;
  for (let i = 0; i < arrayAnswers.length; i++) {
    respostaList += `
    <figure class="resposta">
      <img src="${arrayAnswers[i].image}" alt="">
      <figcaption>${arrayAnswers[i].text}</figcaption>
    </figure>`;
  }

  questions(arrayQuestions);
}

function questions(arrayQuestions) {
  // Título e imagem do banner com camada preta de 60% de opacidade
  quizBannerDiv.innerHTML = `<h1>${arrayQuiz[0].title}</h1>`;

  quizBannerDiv.style.cssText = `
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), 
  url(${arrayQuiz[0].image}) no-repeat center center fixed;`;

  //Quiz main HTML
  for (let i = 0; i < arrayQuestions.length; i++) {
    mainBox.innerHTML += `
  <div class="container-quizz">
    <div class="quizz-perguntas">
      <h2>${arrayQuestions[i].title}</h2>
    </div>
    <div class="container-respostas">
      ${respostaList}
    </div>
  </div>`;
  }

  mudarBackgroundColor(arrayQuestions);
}

function mudarBackgroundColor(arrayQuestions) {
  //Alterar a cor de fundo das perguntas
  const quizPerguntasList = document.querySelectorAll(".quizz-perguntas");
  for (let i = 0; i < quizPerguntasList.length; i++) {
    quizPerguntasList[i].style.backgroundColor = `${arrayQuestions[i].color}`;
  }
}

requestAPI();
