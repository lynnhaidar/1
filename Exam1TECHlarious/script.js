let monsterHealth=document.getElementById("monsterBar");
let personHealth=document.getElementById("personBar");

function attack(){
    let n1=Math.floor(Math.random()*10); //these are variables that have random numbers
    let n2=Math.floor(Math.random()*10);
    personHealth.value -=n1; //decrease from your health random number
    monsterHealth.value -=n2; //decrease from monster's health random number
    document.getElementById("result1").innerHTML="Player attack and deals: " + n1; //print the values
    document.getElementById("result2").innerHTML="Monster attack and deals: " + n2; 
    
    if((personHealth.value==0) && (monsterHealth.value==0)){ //both have 0 life
        tableDelete();
        document.getElementById("mainresult").innerHTML="It's a Draw!";
        personHealth.value=100; //reinitialized the values of progress bar of the monster and person
        monsterHealth.value=100;
        document.getElementById("result1").innerHTML=" ";
        document.getElementById("result2").innerHTML=" ";
        document.getElementById("result3").innerHTML=" ";
        document.getElementById("result4").innerHTML=" "; 
    }
    
    if( monsterHealth.value==0 ){ //monster's life is 0
        tableDelete();
        document.getElementById("mainresult").innerHTML="You Won!";
        personHealth.value = 100;
        monsterHealth.value = 100;
        document.getElementById("result1").innerHTML=" ";
        document.getElementById("result2").innerHTML=" ";
        document.getElementById("result3").innerHTML=" ";
        document.getElementById("result4").innerHTML=" "; 

    }
}

let counter=0; //for counting number of heals


function sattack(){
    if(personHealth.value<=monsterHealth*0.8){ //person's health is less than monster's by 20% 
        let n1=Math.floor(Math.random()*10);
        let n2=Math.floor(Math.random()*20); //random value of monster> than random value of person
        personHealth.value -=n1; //decrease the bar w/ random number
        monsterHealth.value -=n2;
        document.getElementById("result1").innerHTML="Player attack and deals: " + n1;
        document.getElementById("result2").innerHTML="Monster attack and deals: " + n2;

    }
}

function heal(){
    let n1=Math.floor(Math.random()*10);
    if((personHealth.value + n1)>=100 || counter>2 ) { //unless you don’t exceed the 100% limit or unless you don’t use it 3 times sequentially
        alert("ERROR");
        alert("Sorry, You Can't Give Yourself More Random Power");
        return;
    }
    else{
        document.getElementById("mainresult").innerHTML=" ";
        personHealth.value +=n1;
        document.getElementById("result3").innerHTML="Player heals himself for: " + n1;

    }
    
}

function tableDelete(){ //function that deletes all the buttons
    var table=document.getElementById("gtable");
    table.remove();

}

function giveUp(){ //deletes all the buttons and tell that the monster have won
    tableDelete();
    document.getElementById("givingup").innerHTML="Game Over! <br> <hr><br> <br> The Monster is the winner <br> <br>";
    monsterHealth.value=100;
    personHealth.value=100;
    counter=0;
    document.getElementById("result1").innerHTML=" ";
    document.getElementById("result2").innerHTML=" ";
    document.getElementById("result3").innerHTML=" ";
    document.getElementById("result4").innerHTML=" ";
    
}

function newGame(){ //reload the page by starting a new game
    location.reload();
}
