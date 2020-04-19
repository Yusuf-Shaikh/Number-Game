let core = 20;
let lvlselect = document.querySelector(".chooselvl");
let easybtn = document.querySelector("#easy");
let mediumbtn = document.querySelector("#medium");
let hardbtn = document.querySelector("#hard");
let set1 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
let series = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'];
let set2 = ['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40' ];
let timer = document.querySelector(".stopwatch");
let cards = document.querySelector(".cards");
let bigbox = document.querySelector(".container");
let startmsg = document.querySelector(".msg");
let btn = document.querySelectorAll(".button");
let topscore = document.querySelector(".highscore");
let scorecontainer = document.querySelector("ul");
let web =document.querySelector("body");
let gamecount = 0 ;
let timecount = [];
let scorediv = [];
let storage = new Array();
let resetbutton = document.querySelector("button");
let val = 0 ;
let top1 = document.querySelector(".top1");
let top2 = document.querySelector(".top2");
let top3 = document.querySelector(".top3");
let top4 = document.querySelector(".top4");
let top5 = document.querySelector(".top5");
var watch = new stopwatch(timer);
//generate numbers
easybtn.onclick = function(){
    set = 2 ;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
}
mediumbtn.onclick = function(){
    set = 3 ;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
}
hardbtn.onclick = function(){
    set = 4 ;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
}
//initilazes the game for first time
if(gamecount===0){
    startthegame();
    if(localStorage.getItem('time')!='null'){
        var yusuf = JSON.parse(localStorage['time']);
        for(let z=0;z<yusuf.length;z++){
            storage.push(yusuf[z]);
        }
        storage.sort;
        toptiming();
    }

}
//initialize the game
function startthegame(){

    for(let i=0;i<20;i++){
        let j = Math.floor(Math.random()*20);
        let temp1 = set1[i];
        set1[i] = set1[j];
        set1[j] = temp1;
    }
    for( let d=0;d<20;d++){
        let g = Math.floor(Math.random()*20);
        let temp2 = set2[d];
        set2[d] = set2[g];
        set2[g] = temp2;
    }
    let minibox = document.querySelectorAll(".button");
    for(i=0;i<20;i++){
        minibox[i].innerHTML = set1[i];
    }
    
    
    startmsg.onclick=function(){
        let k = 3 ;
        startmsg.style.fontSize = "200px";
        startmsg.innerHTML = k ;

        let t = setInterval(() => {
            k--;
            startmsg.innerHTML = k ;
            if(k<1){
                clearInterval(t);
                bigbox.style.backgroundColor="white";
                bigbox.style.border="7px white solid";
                startmsg.style.display = "none";
                cards.style.display= "block";
                watch.start();
            }
        }, 1000);
    
    };

 
    checking();
     
}

//actual logic
function checking(){
    let click = 0 ;   
    for (var f = 0; f < btn.length; f++) {
        btn[f].onclick = function() {
            if(this.innerHTML===series[click]&&click<20)
            {
               this.innerHTML=set2[click];
               this.style.backgroundColor="rgb(11, 36, 31)";
               click++;
            }
             else if (this.innerHTML===series[click]&&click>=20) 
            {
               this.innerHTML="✔";
               this.style.backgroundColor="black";
               click++;
            }
            else
            {
               web.style.backgroundColor = "red";
               setTimeout(()=>{
                  web.style.backgroundColor = "rgb(48, 48, 48)";
               },100);            
            }
            if(click===40){
               startmsg.style.fontSize="30px";
               startmsg.innerHTML = "Click To Start";
               bigbox.style.backgroundColor="rgb(48,48,48)";
               bigbox.style.border="2px white solid";
               startmsg.style.display = "block";
               cards.style.display = "none";
               click = 0;
               watch.stop();
               bestscore();
               watch.reset();
               timer.innerHTML = "00:00:000";
               startthegame();
               gamecount++;
            }
        }
    }
}

resetbutton.onclick = function(){
    startmsg.style.fontSize="30px";
    startmsg.innerHTML = "Click To Start";
    bigbox.style.backgroundColor="rgb(48,48,48)";
    for(let m=0 ;m<20;m++){
        btn[m].style.backgroundColor="black";
    }
    bigbox.style.border="2px white solid";
    startmsg.style.display = "block";
    cards.style.display = "none";
    click = 0;
    watch.stop();
    watch.reset();
    timer.innerHTML = "00:00:000";
    bigbox.style.display = "none";
    lvlselect.style.display = "block";
}

//handles the top scores
function bestscore(){
    storage.push(timer.innerHTML);
    var JSONReadytiming = JSON.stringify(storage);
    localStorage.setItem('time',JSONReadytiming);
    storage = JSON.parse(localStorage['time']);
    storage.sort();
    var JSONReadytiming = JSON.stringify(storage);
    localStorage.setItem('time',JSONReadytiming);
    toptiming();
}

function toptiming(){
    if(typeof storage[0]!="undefined"){
        top1.innerHTML = storage[0];
    }

    if(typeof storage[1]!="undefined"){
        top2.innerHTML = storage[1];
    }

    if(typeof storage[2]!="undefined"){
        top3.innerHTML = storage[2];
    }

    if(typeof storage[3]!="undefined"){
        top4.innerHTML = storage[3];
    }

    if(typeof storage[4]!="undefined"){
        top5.innerHTML = storage[4];
    }
}

//stopwatch
function stopwatch(elem){
    var time = 0;
    var interval;
    var offset;

    function update() {
        time += delta();
        var formattedtime = timeformatter(time);
        elem.innerHTML = formattedtime;
    }
    function delta() {
        var now = Date.now();
        var timepassed = now - offset;
        offset = now;
        return timepassed;
    }
    function timeformatter(timeinmillisec) {
        var time = new Date(timeinmillisec)
        var minutese = time.getMinutes()-30;
        var minutes = minutese.toString();
        var seconds = time.getSeconds().toString();
        var milsec = time.getMilliseconds().toString();

        if(minutes.length<2){
            minutes = '0' + minutes;
        }
        if(seconds.length<2){
            seconds = '0' +seconds;
        }
        while(milsec.length<3){
            milsec = '0' +milsec;
        }
        return minutes + ':' + seconds + ':' + milsec ;
    }

    this.ison = false;

    this.start = function() {
        if(!this.ison){
            interval = setInterval(update,10);
            offset = Date.now();
            this.ison = true;
        }
    };

    this.stop = function() {
        if(this.ison){
            clearInterval(interval);
            interval = null;
            this.ison = false;
        }
    };

    this.reset = function() {
        time = 0;
    };
}