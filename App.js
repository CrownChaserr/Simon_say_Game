let BTN = document.querySelectorAll(".btn");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let score = [];
let gamseq=[];
let userseq=[];
let start=false;
let check = 0;
let level = 0; 
let btns = ["box1","box2","box3","box4"]; 
let p = document.querySelector("p");
let highest = document.querySelector("#Score");
let theme = document.querySelector(".theme");
function btnclicked(select){
    let btn = document.querySelector(`.${select}`);
    btn.classList.add("autoclicked");
    setTimeout(function(){
        btn.classList.remove("autoclicked");
    },400);
}
function userclicked(select){
    if(start==true){
        let btn = document.querySelector(`.${select}`);
        btn.classList.add("clicked");
        setTimeout(function(){
            btn.classList.remove("clicked");
        },400);
   }
}
function levelup(){
    userseq=[];
    level++;
    h3.innerText=`Level ~ ${level} `;
    let select =btns[Math.floor(Math.random()*4)];
    gamseq.push(select);
    // console.log(gamseq);
    btnclicked(select);

}
function btnpressed(){
    if(start == true){
        let btn = this;
        userseq.push(btn.classList[1]);
        // console.log(userseq);
        userclicked(btn.classList[1]);
        checkseq(userseq.length-1);
    }
}
for(btn of BTN){
    btn.addEventListener("click",btnpressed);
}
function checkseq(idx){
    if(userseq[idx] === gamseq[idx]){
        if(userseq.length == gamseq.length){
            setTimeout(levelup,800);
        }else{
            console.log("dekh raha hai binod cheating karne aaya hai");
        }
    }else{
        score.push(level-1);
        h3.innerText = `Oops!! wrong button {your score is ${level-1}}`;
        h2.innerHTML = `<span style="color:red">Game Over!</span> Press Enter to start`;
        reset();
    }    
}
function reset(){
    check++;
    level = 0;
    gamseq = [];
    userseq = [];
    start = false;
    
}
function reveal(){
    if(check>0){
    let max = Math.max(...score);
    highest.classList.add("disp");
    p.innerHTML=`The highest score till now is ${max} &#x1F3C6`;
    }
}
document.addEventListener("keydown",function(event){
    if(event.code=="Enter" && start==false){
        start = true;
        console.log("game started");
        h2.innerText="game started";
        setTimeout(levelup,1000);
        highest.classList.remove("disp");
        p.innerText=""
    }
})

highest.addEventListener("click",reveal);