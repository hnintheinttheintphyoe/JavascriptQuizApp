let baseURL='https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple';
let container=document.querySelector(".container");
let scoreBoard=document.querySelector(".score-board");
let answerBoard=document.querySelector(".answer-board");
let ques=document.querySelector(".question");
let optionForm=document.querySelector(".option-form");
let submit=document.querySelector("#submitBtn");
let quizForm=document.querySelector("#quiz-form");
let optionC=document.querySelector(".option");
let finishNext=document.querySelector(".btn-box");
window.addEventListener('DOMContentLoaded',quizApp);
let question,answer;
   let options=[];
   let answered=0;
   let score=0;
   finishNext.style.display="none";
async function quizApp(){
    answerBoard.innerText=answered;
    scoreBoard.innerText=score;
    // generateTemplate();
    // finishNext.style.display="none";
    let data=await quizLink();
    console.log(data);
   question=data[0].question;
//    console.log(question);
   answer=data[0].correct_answer;
   options=[];
   data[0].incorrect_answers.map(option => options.push(option));
   options.splice(Math.floor(Math.random()*options.length+1),0,answer);
//    console.log(options);
generateTemplate(question,options);



}
async function generateTemplate(q,op){
    ques.innerText=q;
    optionForm.innerHTML="";
    op.map((option,index) => {
        optionForm.innerHTML+=`
        <div class="option">
                    <input type="radio" id="opt${index+1}" value="${option}" name="quiz" >
                    <label for="opt${index+1}">${option}</label>
                </div>
        `;
    })
}
async function quizLink(){
  let response= await fetch(baseURL);
  let data=await response.json();
  console.log(data.results);
  return data.results;

}
quizForm.addEventListener("submit",function(e){
    e.preventDefault();
   
    if(e.target.quiz.value){
        quizCheck(e.target.quiz.value);
        console.log(answer);
    }
})
function quizCheck(selected){
    answered++;
    answerBoard.innerText=answered;
    if(selected == answer){
        score++;
        scoreBoard.innerText=score;
        
    }
    // updateScoreBoard();
    quizForm.quiz.forEach(input =>{
        if(input.value === answer){
            input.parentElement.classList.add("correct");
            submit.style.display="none";
            finishNext.style.display="block";

        }
    })
}
// function updateScoreBoard(){
//     answerBoard.innerText=answered;
//     scoreBoard.innerText=score;
// }
    let finishBtn=document.querySelector("#finishBtn");
    console.log(finishBtn);
let nextBtn=document.querySelector("#nextBtn");

nextBtn.addEventListener("click",function(){

quizApp();
finishNext.style.display="none";
submit.style.display="block";


    
});
finishBtn.addEventListener("click",finishQuiz);
function finishQuiz(){
    // finishNext.style.display="none";
    // submit.style.display="none";
    let overlay=document.createElement("div");
    overlay.classList.add("result-overlay");
    overlay.innerHTML=`
    <div class=scoreAns>${score}/${answered}</div>
    <button >Play Again</button>
    `;
    container.appendChild(overlay);
    document.querySelector(".result-overlay button").addEventListener("click",function(){
        overlay.style.display="none";
        submit.style.display="block";
        finishNext.style.display="none";
        playAgain();
    });
    
    
}
function playAgain(){
   
    score=0;
    answered=0;
    quizApp();
    console.log("restart");
}





// quizApp();
