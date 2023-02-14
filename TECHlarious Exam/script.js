function attack(){
    let n1=Math.floor(Math.random()*10); //multiplying Math.random() by 10 will give a random number between interval [0,10]
    let n2=Math.floor(Math.random()*10); 
    document.getElementById("personbar").value -=n1; //decrease from your health random number
    document.getElementById("monsterbar").value -=n2; //decrease from monster's health a random number
    document.getElementById("mainresult").innerHTML=" ";
    document.getElementById("result1").innerHTML="Player attacks and deals: " + n1;  //printing results in a paragraph
    document.getElementById("result2").innerHTML="Monster attacks and deals: " + n2;
    document.getElementById("result3").innerHTML=" ";
    document.getElementById("result4").innerHTML=" ";

    if((document.getElementById("monsterbar").value==0) && (document.getElementById("personbar").value==0)){ //With draw case if both of the person and monster's health=0 
        document.getElementById("mainresult").innerHTML="With Draw!"
        document.getElementById("result1").innerHTML=" ";
        document.getElementById("result2").innerHTML=" ";
        document.getElementById("result3").innerHTML=" ";
        document.getElementById("result4").innerHTML=" ";

    }

    if(document.getElementById("monsterbar").value==0){ //monster's life is 0 =>Person is going to win
        document.getElementById("mainresult").innerHTML="You Won!"
        document.getElementById("result1").innerHTML=" ";
        document.getElementById("result2").innerHTML=" ";
        document.getElementById("result3").innerHTML=" ";
        document.getElementById("result4").innerHTML=" ";
    }
}

function sAttack(){
    if((document.getElementById("personbar").value) < (document.getElementById("monsterbar").value * 0.8)){
        let n1= Math.floor(Math.random() *10) +2; //To decrease the monster's health more than the person's health if we gave a random number of the person > than that of the monster
        let n2= Math.floor(Math.random() *10); 
        document.getElementById("personbar").value -=n1; //decrease the bar w/ a random number
        document.getElementById("monsterbar").value -=n2;
        document.getElementById("result1").innerHTML="Player attacks and deals: " + n1; //printing results in a paragraph
        document.getElementById("result2").innerHTML="Monster attacks and deals: " + n2;
    }
}

function heal(){
    let counter=0; //for counting number of heals
    let n1=Math.floor(Math.random() *10); //generate a random number to use with the person's progress bar
    if((document.getElementById("personbar").value>=100) || (counter>=3)){ // heals the person, unless it doesn't exceed the 100% limit or unless it's not used it 3 times sequentially
        alert("ERROR"); //gives a warning
        alert("You can't give yourself more random power");
        document.getElementById("mainresult").innerHTML="Error, you can't heal yourself";
        document.getElementById("result1").innerHTML=" ";
        document.getElementById("result2").innerHTML=" ";
        document.getElementById("result3").innerHTML=" ";
        document.getElementById("result4").innerHTML=" ";
        return;
    }
    else{ //otherwise case
        document.getElementById("mainresult").innerHTML=" ";
        document.getElementById("personbar").value +=n1;
        document.getElementById("result3").innerHTML= "Player heals himself for " +n1;
    }
}

function deleteTable(){ //function that deletes all the buttons that I put inside a table
    let table=document.getElementById("btntable");
    table.remove(); 
}

function giveUp(){ //deletes all the buttons and tell that the monster have won
    deleteTable();
    document.getElementById("mainresult").innerHTML="Game Over! <br> <hr><br> The Monster is the winner <br> <br>";
    document.getElementById("personbar").value =100; //reinitialize the value of progress bars to 100(Full);
    document.getElementById("monsterbar").value =100;
    document.getElementById("result1").innerHTML=" "; //clear all the result paragraphs inside bu
    document.getElementById("result2").innerHTML=" ";
    document.getElementById("result3").innerHTML=" ";
    document.getElementById("result4").innerHTML=" ";

}

function newGame(){ //reload the page by starting a new game
    location.reload(); 
}
