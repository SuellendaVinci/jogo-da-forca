let letrasEscolhidas = [];
let palavraSorteada;
let categoriaSorteada;
let tentativas = 6;


//TENTATIVAS
let tent = document.getElementById("tentativas");
tent.textContent = `Tentativas: ${tentativas}` 

//SORTEAR UMA PALAVRA

const sortearUmaPalavra = (palavras) => {
  let numeros = palavras.length;
  let numeroAleatorio = Math.floor(Math.random() * numeros);

  palavraSorteada = palavras[numeroAleatorio].nome;
  palavraSorteada = palavraSorteada.toUpperCase();
  categoriaSorteada = palavras[numeroAleatorio].categoria;
  categoriaSorteada = categoriaSorteada.toUpperCase();

//mostrar categoria na tela
  let categoriaNaTela = document.getElementById("category");
  categoriaNaTela.textContent = categoriaSorteada;
};

sortearUmaPalavra(palavras);

//GERAR CADA DIV PARA ARMAZENAR CADA LETRA DENTRO DO SECRET_WORD

const gerarDivLetras = (palavra) => {
  console.log(palavra);
  let tamanhoPalavra = palavra.length;
  //espaço onde eu vou criar minhas divs
  let divLetras = document.getElementById("secret_word");

  for (let i = 0; i < tamanhoPalavra; i++) {
    //tipo da estrutura que eu vou criar - cada uma das letras da palavra vai ter uma divLetra
    let divLetra = document.createElement("div");
    divLetra.className = "letter";
    //<div class="letter" id="gerando-letra ${i}"></div>, id para fazer comparação e preencher.
    // id com gerando-letra - ${i} - porque assim eu crio um id personalizado pra cada
    divLetra.id = `gerando-letra-${i}`;
    //colocar cada espaço das letras da palavra no meu secret-word
    divLetras.appendChild(divLetra);
  }
};

gerarDivLetras(palavraSorteada);

//CRIAR COMPARAÇÃO DA TECLA CLICADA COM A PALAVRA SORTEADA

const comparaLetra = (palavraSorteada, letraDoUsuario) => {

  let clickedDiv = document.getElementById(`key-${letraDoUsuario}`);

  let acerto = false;
  for (let i = 0; i < palavraSorteada.length; i++) {
    if (palavraSorteada[i] === letraDoUsuario) {
      let divLetra = document.getElementById(`gerando-letra-${i}`);
      //Não usar innerHTML pq existe um ataque hacker para isso
      divLetra.textContent = letraDoUsuario;
      acerto = true;
    }
  }

  if (acerto) {
    clickedDiv.className = "buttonClickRight";
    if (verificarVitoria()) {
      Swal.fire("Parabéns, você ganhou! Se quiser jogar novamente clique no botão do corvo!");
    }

  } else { 

    clickedDiv.className = "buttonClickWrong";
    tentativas--;
    tent.textContent = `Tentativas: ${tentativas}` 

    //BONEQUINHO

    atualizarImagem(tentativas);
    if (verificarDerrota(tentativas)) {
      if(tentativas === 0){
      Swal.fire("Não foi dessa vez! Se quiser jogar novamente clique no botão do corvo!");
      }
    }

  }
};

//Função que trabalha com os cliques (onclick que está lá no html)

const verificaLetraEscolhida = (letraDoUsuario) => {
  if (
    !letrasEscolhidas.some(
      (letraAnalisada) => letraAnalisada === letraDoUsuario
    )
  ) {
    if (!verificarDerrota(tentativas) && !verificarVitoria()) {
      comparaLetra(palavraSorteada, letraDoUsuario);
    } else {
      alert("jogo finalizado!");
    }
  }
};

const verificarVitoria = () => {
  for (let i = 0; i < palavraSorteada.length; i++) {
    let divLetra = document.getElementById(`gerando-letra-${i}`);
    if (!divLetra.textContent) {
      return false;
    }
  }

  return true;
};

const verificarDerrota = (tentativas) => {
  return tentativas <= 0;
};

const atualizarImagem = (tentativas) => {
  let imagem = document.getElementById("img_main");

  imagem.setAttribute("src", `./assets/images/forca0${6 - tentativas}.png`);
};


//BOTÃO CORVO

let btn = document.querySelector("#replay");
btn.addEventListener("click", () => {  
    location.reload();
});
