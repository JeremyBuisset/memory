var cards=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16];
var cardsStatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var cardsRandom = [];
var cardsActive=[];
var pairsFind=0;
var cardsCheck=[];
var actived;
var numberCards = 0;
var cardsImg=document.getElementById("main").getElementsByTagName("img");
var originalTime;
var endTime;
var finalTime;
var seconds;
var score = 0;

document.getElementById("launchGame").onclick = function () {
    console.log(cardsRandom);
    document.getElementById("beginScreen").style.cssText = "display: none";
    document.getElementById("main").style.cssText = "display: block";
    originalTime = Date.now();
    begin();
};

document.getElementById("endGame").onclick = function () {
    location.reload();
};

for(var i=0;i<cardsImg.length;i++){
    cardsImg[i].nbCard=i;
    cardsImg[i].onclick=function(){ //Bored to type addEventListener ;)
        game(this.nbCard);
    }
}

function display(nbCard){
    switch(cardsStatus[nbCard]){
        case 0:
            cardsImg[nbCard].src="images/back.png";
            break;
        case 1:
            cardsImg[nbCard].src="images/card"+cards[nbCard]+".png";
            break;
        case -1:
            cardsImg[nbCard].style.visibility="hidden";
            break;
    }
}

function gameEnd(){
    endTime = Date.now();
    finalTime = endTime - originalTime;
    seconds = finalTime / 1000;
    document.getElementById("main").style.cssText = "display: none";
    document.getElementById("endScreen").style.cssText = "display: block";
    document.getElementById("time").innerHTML += " " + parseInt(seconds) + " secondes.";
    document.getElementById("points").innerHTML += " "+ parseInt(score) + " points."
}

function begin(){
    for(var position=cards.length-1; position>=1; position--){ //for loop for randomise the card array
        var random=Math.floor(Math.random()*(position+1)); //random variable between 1 and the array length + 1
        var save=cards[position]; //variable for save
        cards[position]=cards[random];
        cards[random]=save;
    }
}

function game(nbCard){
    if(cardsActive.length<2){
        if(cardsStatus[nbCard] === 0){
            cardsStatus[nbCard]=1;
            cardsActive.push(nbCard);
            display(nbCard);
        }
        if(cardsActive.length === 2){
            var newState=0;
            if(cards[cardsActive[0]] === cards[cardsActive[1]]){
                newState=-1;
                pairsFind++;
                score = score +3;
            }
            cardsStatus[cardsActive[0]]=newState;
            cardsStatus[cardsActive[1]]=newState;
            setTimeout(function(){
                display(cardsActive[0]);
                display(cardsActive[1]);
                cardsActive=[];
                score --;
                if(pairsFind === 16){
                    gameEnd();
                }
            },750);
        }
    }
}






