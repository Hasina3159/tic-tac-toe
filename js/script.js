let col = document.getElementsByClassName("col");
let restart = document.getElementById("restart");
let win = document.getElementById("win");
let modal = document.getElementById("modal");

let tab = []
let index = 0;
let j = ["×","○"];
let me = false;

restart.addEventListener("click", (e) => {
    modal.style.display = "none";
    clear()
})

for(let i = 0; i<col.length; i++){
    tab.push(col[i].innerText);

    col[i].addEventListener("click", (e)=>{
        add(e.target, i);
    })

    col[i].addEventListener("mouseover", (e)=>{
        if(!e.target.innerText){
            e.target.innerText = j[index%2];
            me = true;
        }else{
            me = false;
        }
    })
    
    col[i].addEventListener("mouseleave", (e)=>{
        if(me){
            e.target.innerText = ""
        }
    })
}

function add(target, i){
    if(me){
        let player = j[index%2]
        target.innerText = player;
        target.classList.add("full");
        index++;
        tab[i] = player;
        me = false;
        if(index%2==0){
            target.classList.add("zero");
        }else{
            target.classList.add("un");
        }
        gagne()
    }
}

function gagne(){
    if(
         (tab[0] === tab[1])&&(tab[0] === tab[2]) &&  tab[0] !== "" || 
         (tab[3] === tab[4])&&(tab[4] === tab[5]) &&  tab[3] !== "" ||
         (tab[6] === tab[7])&&(tab[7] === tab[8]) &&  tab[6] !== "" ||
         (tab[0] === tab[3])&&(tab[3] === tab[6]) &&  tab[0] !== "" ||
         (tab[1] === tab[4])&&(tab[4] === tab[7]) &&  tab[1] !== "" ||
         (tab[2] === tab[5])&&(tab[5] === tab[8]) &&  tab[2] !== "" ||
         (tab[0] === tab[4])&&(tab[4] === tab[8]) &&  tab[0] !== "" ||
         (tab[2] === tab[4])&&(tab[4] === tab[6]) &&  tab[2] !== ""
    ){
        win.innerText =  "Le joueur " + (((index%2)-2)*-1) + " a Gagné!";
        modal.style.display = "flex";
    }else{
        let draw = true;
        tab.map(element => {
            if(!element){
                draw = false;
            }
        })
        if(draw){
            win.innerText =  "Match Nul!";
            modal.style.display = "flex";
        }
    } 
}

function clear(){
    for(let i = 0; i < col.length; i++){
        col[i].classList.remove("full");
        col[i].classList.remove("zero");
        col[i].classList.remove("un");
        col[i].innerText = "";
        tab[i] = "";
    }
}