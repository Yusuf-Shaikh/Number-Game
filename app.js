let lvlselect = document.querySelector(".chooselvl");
let easybtn = document.querySelector("#easy");
let mediumbtn = document.querySelector("#medium");
let hardbtn = document.querySelector("#hard");
let timer = document.querySelector(".stopwatch");
let cards = document.querySelector(".cards");
let bigbox = document.querySelector(".container");
let startmsg = document.querySelector(".msg");
let btn = document.querySelectorAll(".button");
let topscore = document.querySelector(".highscore");
let web =document.querySelector("body");
let resetbutton = document.querySelector("button");
let top1 = document.querySelector(".top1");
let top2 = document.querySelector(".top2");
let top3 = document.querySelector(".top3");
let top4 = document.querySelector(".top4");
let top5 = document.querySelector(".top5");
let series = [];
let colors = [];
let basecolor = 255;
let colorminus = 6;
let set = 2;
let t;
let seriescopy = [];
let totalnumber =0;
let gamecount = 0 ;
let timecount = [];
let scorediv = [];
let temp4 = [];
let storage1 = new Array();
let storage2 = new Array();
let storage3 = new Array();
let val = 0 ;
var watch = new stopwatch(timer);

//toughness level select
easybtn.onclick = function(){
    set = 2 ;
    colorminus = 6;
    basecolor = 255;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
    temp4 = [];
    temp4 = storage1;
    toptiming();
    startthegame();
}
mediumbtn.onclick = function(){
    set = 3 ;
    colorminus = 4;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
    temp4 = [];
    temp4 = storage2;
    toptiming();
    startthegame();
}
hardbtn.onclick = function(){
    set = 4 ;
    colorminus = 3;
    bigbox.style.display = "block";
    lvlselect.style.display = "none";
    temp4 = [];
    temp4 = storage3;
    toptiming();
    startthegame();
}

//generatenumber & color and arrange them
function generatenumber(){
    series = [];
    seriescopy = [];
    colors = [];
    totalnumber = set*20;
    for(let i=1;i<=totalnumber;i++){
        if(set===2){
            colorcode = "rgb("+(240-(colorminus*(i-1)))+","+255+","+(240-(colorminus*(i-1)))+")";
        }
        if(set===3){
            colorcode = "rgb("+(240-(colorminus*(i-1)))+","+(240-(colorminus*(i-1)))+","+255+")";
        }
        if(set===4){
            colorcode = "rgb("+255+","+(240-(colorminus*(i-1)))+","+(240-(colorminus*(i-1)))+")";
        }
        series.push(i);
        seriescopy.push(i);
        colors.push(colorcode);
    }
    let b=0;
    let a=20;
    for(i=0;i<set;i++){
        for(let j=b;j<a;j++){
            let k = Math.floor(Math.random()*20) + a -20;
            let temp1 = seriescopy[j];
            let temp2 = colors[j];
            seriescopy[j] = seriescopy[k];
            colors[j] = colors[k];
            seriescopy[k] = temp1;
            colors[k] = temp2;

        }
        b = a;
        a = a+20;
    }
    for(i=0;i<20;i++){
        btn[i].innerHTML = seriescopy[i];
        btn[i].style.backgroundColor = colors[i];
    }


}

//initilazes the game for first time
if(gamecount===0){
    startthegame();
  
        if(localStorage.getItem('time1')!=null){
            var temp3 = JSON.parse(localStorage['time1']);
            for(i=0;i<temp3.length;i++){
                storage1.push(temp3[i]);
            }
            storage1.sort();
        }

        if(localStorage.getItem('time2')!=null){
            var temp3 = JSON.parse(localStorage['time2']);
            for(i=0;i<temp3.length;i++){
                storage2.push(temp3[i]);
            }
            storage2.sort();
        }

        if(localStorage.getItem('time3')!=null){
            var temp3 = JSON.parse(localStorage['time3']);
            for(i=0;i<temp3.length;i++){
                storage3.push(temp3[i]);
            }
            storage3.sort();
        }

}
//initialize the game
function startthegame(){    
    generatenumber();
    startmsg.onclick=function(){
        let k = 3 ;
        startmsg.style.fontSize = "200px";
        startmsg.innerHTML = k ;

        t = setInterval(() => {
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
    for (i = 0; i < btn.length; i++) {
        btn[i].onclick = function() {
            if(series[click]===parseInt(this.innerHTML)&&click<totalnumber)
            {
                playSound("button");
                if(click<(totalnumber-20))
                {
                    this.innerHTML=seriescopy[click+20];
                    this.style.backgroundColor=colors[click+20];
                    click++;
                }
                else{
                    this.style.backgroundColor="black";
                    click++;
                }
            }
            else
            {
               playSound("wrong");
               web.style.backgroundColor = "red";
               setTimeout(()=>{
                  web.style.backgroundColor = "rgb(48, 48, 48)";
               },100);            
            }
            if(click===totalnumber){
               playSound("winning");
               startmsg.style.fontSize="30px";
               startmsg.innerHTML = "Click To Start";
               bigbox.style.backgroundColor="transparent";
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
//play sound
function playSound(name) {
    var audio = new Audio( name + ".mp3");
    audio.play();
  }
//new game button
resetbutton.onclick = function(){
    clearInterval(t);
    startmsg.style.fontSize="30px";
    startmsg.innerHTML = "Click To Start";
    bigbox.style.backgroundColor="rgb(48,48,48)";
    for(i=0 ;i<20;i++){
        btn[i].style.backgroundColor="black";
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
    emptytiming();
    gamecount++;
}

//handles the top scores
function bestscore(){
    if(set===2){
        storage1.push(timer.innerHTML);
        var JSONReadytiming = JSON.stringify(storage1);
        localStorage.setItem('time1',JSONReadytiming);
        storage1 = JSON.parse(localStorage['time1']);
        storage1.sort();
        var JSONReadytiming = JSON.stringify(storage1);
        localStorage.setItem('time1',JSONReadytiming);
        temp4 = storage1;
        toptiming();
    }
    if(set===3){
        storage2.push(timer.innerHTML);
        var JSONReadytiming = JSON.stringify(storage2);
        localStorage.setItem('time2',JSONReadytiming);
        storage2 = JSON.parse(localStorage['time2']);
        storage2.sort();
        var JSONReadytiming = JSON.stringify(storage2);
        localStorage.setItem('time2',JSONReadytiming);
        temp4 = storage2;
        toptiming();
    }
    if(set===4){
        storage3.push(timer.innerHTML);
        var JSONReadytiming = JSON.stringify(storage3);
        localStorage.setItem('time3',JSONReadytiming);
        storage3 = JSON.parse(localStorage['time3']);
        storage3.sort();
        var JSONReadytiming = JSON.stringify(storage3);
        localStorage.setItem('time3',JSONReadytiming);
        temp4 = storage3;
        toptiming();
    }
}
//empty toptiming
function emptytiming(){
    top1.innerHTML = "";
    top2.innerHTML = "";
    top3.innerHTML = "";
    top4.innerHTML = "";
    top5.innerHTML = "";
}
//shows top timing
function toptiming(){
    if(typeof temp4[0]!="undefined"){
        top1.innerHTML = temp4[0];
    }

    if(typeof temp4[1]!="undefined"){
        top2.innerHTML = temp4[1];
    }

    if(typeof temp4[2]!="undefined"){
        top3.innerHTML = temp4[2];
    }

    if(typeof temp4[3]!="undefined"){
        top4.innerHTML = temp4[3];
    }

    if(typeof temp4[4]!="undefined"){
        top5.innerHTML = temp4[4];
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
