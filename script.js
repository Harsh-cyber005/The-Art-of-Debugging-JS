
let secretNumber = Math.trunc(20 * Math.random() + 1);
let highscore = 0
let time = [0, 0];
let stop = true;
let timer;
let minutes = 0, seconds = 0;
let display_min = 1000;
let display_sec = 60;
let win = false;
let lost = false;
let flag = false;

document.querySelector('.again').addEventListener('click', function () {
    time = [0, 0]
    secretNumber = Math.trunc(20 * Math.random() + 1);
    document.querySelector('.score').textContent = '20';
    document.querySelector('.guess').value = '';
    document.getElementById('timer').innerHTML = '';
    document.querySelector('.check').style.backgroundColor = '#f1356d';
    document.querySelector("body").style.backgroundColor = 'white';
    win = false;
    flag = false;
});

document.querySelector('.check').addEventListener('click', function() {

    if(flag == false){
        document.getElementById('timer').innerHTML = ' 0 : 00 ';
        flag = true;
    }
    let guess = document.querySelector('.guess').value;
    if(win == true){
        guess = secretNumber;
    }
    if(stop == true){
        timer =  setInterval(() => {
            time[1]++ ;
            if (time[1] % 60 == 0) {
                time[0] ++ ;
                time[1] = 0;
            } 
            minutes = time[0];
            seconds = time[1];
            document.getElementById('timer').innerHTML = `${minutes.toString().padStart(1, '0')} : ${seconds.toString().padStart(2, '0')}`; 
            stop = false;   
        }, 1000 );
    }
     
    this.style.backgroundColor = 'black';

    if (!guess && !lost) {
        document.querySelector(".message").textContent = "Not a Valid input";
    }
    else if (guess == secretNumber && !lost) {
        clearInterval(timer);
        if((minutes < display_min) || ((minutes == display_min) && (seconds <= display_sec))){
            display_min = minutes;
            display_sec = seconds;
        }
        stop = true;
        win = true;
        document.querySelector(".message").textContent = "You guessed it Right";
        document.querySelector('.number').style.width = '30rem'
        document.querySelector("body").style.backgroundColor = 'green';
        document.querySelector('.number').textContent = secretNumber;
        if (highscore < document.querySelector('.score').textContent) highscore = document.querySelector('.score').textContent;
        document.querySelector('.highscore').textContent = highscore + " (" + display_min.toString().padStart(1, '0') + " : " + display_sec.toString().padStart(2, '0') + ") ";
    }
    else if (guess > secretNumber && !lost) {
        document.querySelector(".message").textContent = "Too high";
        document.querySelector('.score').textContent--;
        if(document.querySelector('.score').textContent <= 0){
            lost = true;
        }
    }
    else if(!lost) {
        document.querySelector(".message").textContent = "Too low ";
        document.querySelector('.score').textContent--;
        if(document.querySelector('.score').textContent <= 0){
            lost = true;
        }
    }

    else if (document.querySelector('.score').textContent <= 0 && lost) {
        document.querySelector(".message").textContent = "You lost the Game";
        clearInterval(timer);
        document.getElementById('timer').innerHTML = `${minutes.toString().padStart(1, '0')} : ${seconds.toString().padStart(2, '0')}`;
        document.getElementById('hiddenResult').textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = '#f1356d';
    }
});
