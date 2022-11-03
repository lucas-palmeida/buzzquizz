let arrayQuiz = [];

// Pegar os dados da API
function requestAPI() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response) => {
      arrayQuiz = response.data;
      questions(arrayQuiz[49].questions, arrayQuiz[49]);
    })
    .catch(() => {
      alert("Erro no request da API");
    });
}

//  Segunda Tela

const mainBox = document.querySelector("main");
const quizBannerDiv = document.querySelector(".container-banner");
let respostaList = "";

function questions(arrayQuestionsSelected, arrayListSelected) {
  // Título e imagem do banner com camada preta de 60% de opacidade
  quizBannerDiv.innerHTML = `<h1>${arrayListSelected.title}</h1>`;
  quizBannerDiv.style.cssText = `
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), 
  url(${arrayListSelected.image}) no-repeat center center fixed;`;
  for (let i = 0; i < arrayQuestionsSelected.length; i++) {
    //Quiz respostas list
    const arrayAnswers = shuffle(arrayQuestionsSelected[i].answers);
    console.log(arrayAnswers)
    respostaList = "";
    for (let a = 0; a < arrayAnswers.length; a++) {
      respostaList += `
    <figure class="resposta">
      <img src="${arrayAnswers[a].image}" alt="">
      <figcaption>${arrayAnswers[a].text}</figcaption>
    </figure>`;
    }

    //Quiz main HTML
    mainBox.innerHTML += `
  <div class="container-quizz">
    <div class="quizz-perguntas">
      <h2>${arrayQuestionsSelected[i].title}</h2>
    </div>
    <div class="container-respostas">
      ${respostaList}
    </div>
  </div>`;
  }

  mudarBackgroundColor(arrayQuestionsSelected);
}

function mudarBackgroundColor(arrayQuestionsSelected) {
  //Alterar a cor de fundo das perguntas
  const quizPerguntasList = document.querySelectorAll(".quizz-perguntas");
  for (let i = 0; i < quizPerguntasList.length; i++) {
    quizPerguntasList[i].style.backgroundColor = `${arrayQuestionsSelected[i].color}`;
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

requestAPI();
