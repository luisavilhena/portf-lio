var apresentation = document.getElementById("apresentation");
var header = document.getElementById("header")
var altura= header.getBoundingClientRect().bottom
console.log(altura)
if(altura<366){
  apresentation.style.display = "none";
}


window.onscroll = function() {
	if (window.pageYOffset > 400) {
			apresentation.style.display = "none";
	} else {
		apresentation.style.display = "block";
	}
}


// console.log(portfolio.getBoundingClientRect(), sizeHeight)



$(document).ready(function() {
  var $magic = $(".magic"),
      magicWHalf = $magic.width() / 2;
      // magicHeight = $magic.mousemo7e();
  // console.log(magicHeight)

  // $(document).on("mousemove", function() {
  //   $magic.css
  // })
  $(document).on("mousemove", function(e) {
    $magic.css({"left": e.pageX, "top": e.pageY });
  });
});

///////////////////////PLACARD////////////

// $(document).ready(function(){
//   const para1 = document.getElementById("para1");
//   const para2 = document.getElementById("para2");
//   let loop;

//   // Vamos fazer com que o segundo paragrafo se posicione depois do primeiro
//   para2.style.left = para1.offsetWidth + 'px';
    
//   function animate(element, endStart) {
//     let loop;
//     // Guarda a largura do elemento
//     let elementWidth = element.offsetWidth;
//     // Guarda a largura do elemento pai
//     let parentWidth = element.parentElement.offsetWidth;
//     // Velocidade da animacao
//     let speed = 3;
    
//     // Aqui cria-se um loop para aa animação que será executado a cada frame
//     // window.requestAnimationFrame executa a animacao no proxima frame
//     // Para deixar em loop, no final da função, chamamos o window.requestAnimationFrame novamente para executar o animationLoop de novo
//     const animationLoop = () => {
//       // Primeiro pegamos a posição atual do elemento
//       let left = parseFloat(window.getComputedStyle(element).left);
//       // Movemos o elemento X pixels para a esquerda, sendo que X é a variabel "speed"
//       element.style.left = left - speed + "px";
//       // Se a posição do elemento sair completamente da tela, seta a posição dele para a posicao "endStart"
//       if (left < -elementWidth) {
//         element.style.left = endStart - 20 + 'px';
//       }
      
//       loop = window.requestAnimationFrame(animationLoop);
//     }
//     animationLoop();
//     return loop;
//   }
  // Quando o elemento sair completamente da tela
  // Fazemos com que ele recomece do outro lado, logo depois do paragrafo anterior
//   animate(para1, para1.offsetWidth);
//   animate(para2, para1.offsetWidth);
// })
var stripes = document.getElementById("stripes");
var elStripes = document.querySelectorAll(".stripes")

var size = stripes.clientWidth;
var sizeHeight = window.innerHeight;
var numberColumns = size / 20
for(i=0; i<=numberColumns; i++){
  var NewStripe = elStripes[0].cloneNode(true)

  stripes.prepend(NewStripe)
}
elStripes[0].cloneNode

var tl = gsap.timeline({});
let trigger = gsap.utils.toArray('.stripes');
let items = gsap.utils.toArray('.items');
gsap.from(".white-stripe", {backgroundColor: 'yellow', duration: 8})
gsap.from(".yellow-stripe", {backgroundColor: 'blue', duration: 8})
trigger.forEach((element) => {
     tl.to(element, {display:"none", duration: 0.05, ease: Power4.easeIn})
})
 tl.from("#apresentation", {x:-500, duration: 0.4, ease: Power4.easeIn})


var height = window.innerHeight
var portfolio = document.getElementById("portfolio-grid");
var elItems = document.querySelectorAll(".items")
console.log(elItems)
var flag = false
window.addEventListener("scroll", function(){
  elItems.forEach((el)=> {
    var positionBottom = el.getBoundingClientRect().bottom
    // console.log(positionBottom, height)
    if(positionBottom < height + 350) {
      // el.style.top="-100px"
      el.classList.add("active")
      flag = true
      // gsap.from(el, {y: -200, duration: 5})
    }else {
      el.classList.remove("active")
      flag= false
    }
  })

  // console.log(portfolio.getBoundingClientRect(), sizeHeight)
})
console.log(sizeHeight)
// items.forEach((element) => {
//   tl.from(element, {y:200, duration: 1, ease: Power4.easeIn})
// })
//AI

const API_KEY = "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";

const formPerguntaChat = document.getElementById("ai")
formPerguntaChat.addEventListener("submit", async (e)=> {
  console.log(formPerguntaChat)
  e.preventDefault();
  let pergunta = document.getElementById("pergunta").value;
  console.log(pergunta)

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
      //enviar os dados para a requisição
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You will be provided with a description of a mood, and your task is to generate the CSS code for a color that matches it. Write your output in json with a single key called \"css_code\".",
          },
          {
            "role": "user",
            "content":pergunta,
          }],
        max_tokens: 1024,
        temperature: 0,
    }),
  })
  .then((resposta)=> resposta.json())
  .then((dados)=> {
    console.log(dados);
    let result = dados.choices[0].message.content
    console.log(result)
    console.log(result.length)
    if(result.includes('Please provide a mood description') || 
    result.includes('"/* CSS code for matching color */')
    ){
      document.getElementById("erro").innerHTML = "Resultado não encontrado, digite outro, por favor?"
    } else {
      document.getElementById("erro").innerHTML = ""

      let indexResult = result.indexOf('#')
      console.log(indexResult)
      let newResult= result.substr(indexResult + 1)
      let correctResult = newResult.replace('"\n}', '')
      let othercorrectResult = correctResult.replace('; }', '')
      let othercorrectResult2 = othercorrectResult.replace(';', '')
      console.log(newResult.length, newResult, correctResult)
      document.getElementById("color-mood").style.backgroundColor= "#"+ othercorrectResult2;
      document.getElementById("color-mood").classList.add("transition")
    }

  })
  .catch((erro) => {
      document.getElementById("erro").innerHTML = "Resultado não encontrado, digite outro, por favor?"

  });
  
})
