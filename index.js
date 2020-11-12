var interaction = false;
var playable = false;

//so that the sound could be played
document.getElementById('btn').addEventListener('click',function(){
    interaction = true;
    document.getElementById('btn').remove()
    document.getElementById('btnContainer').remove()
})

// Executed only when the time strikes 00 minutes and 00 seconds - once an hour
const soundHorn = (time) =>{
    document.querySelector('#timeText h1').textContent = `${('0'+time.hours).slice(-2)}:${('0'+time.minutes).slice(-2)}:${('0'+time.seconds).slice(-2)}`;
    document.querySelector('#timeText h1').style.display = 'block';
    document.getElementById('horn').play()
    document.querySelector('#timeText h1').classList.add('animateText')
    setTimeout(function(){
      document.querySelector('#timeText h1').style.display = 'none';
      document.querySelector('#timeText h1').classList.remove('animateText')
    },2800)
}

//plays the saw theme song
const soundSaw = () =>{
  document.querySelector('section').classList.add('animateClock')
  document.getElementById('saw').play()
    setTimeout(function(){
      document.querySelector('section').classList.remove('animateClock')
    },32000)
}

// --- called 
const getTime = () =>{
  var time = new Date();
  var timeData = {
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  }
  return timeData;
}

//making digital clock from time given (performed in the seconds function)
const updateDigitalClock = (time) =>{
  document.getElementById('digitalTime').textContent = `${('0' + time.hours).slice(-2)}:${('0' + time.minutes).slice(-2)}:${('0' + time.seconds).slice(-2)}`
}

// updates the message informing us at what time will the user hear the horn (activation of the soundHorn() method)
const updateInfoMsg = (time, start)=>{
    var seconds = 60 - time.seconds;
    if(start === true){
      var msg = `Something cool will happen in: ${seconds} seconds ... what could it be ?`;
    } else {
      var msg = `Countdown: ${(time.seconds === 0) ? 60 : seconds + 60} seconds.`;
    }
    document.getElementById('timeMessage').textContent = msg;

}

// --------- transform function for our all three of our dials
const moveDial = (dial, deg) => {
  document.getElementById(dial).style.transform = `rotate(${deg}deg)`;
}


// seconds clock
const secondHand = (theTime, whichHand) =>{
  var degree = Math.round(theTime.seconds * 360 / 60);
  moveDial(whichHand, degree)
  
}

// minutes clock
const minuteHand = (theTime, whichHand) => {
  var degree = Math.round(theTime.minutes * 360 / 60);
  moveDial(whichHand, degree)
}

//hours clock
const hourHand = (theTime, whichHand) => {
  theTime.hours = (theTime.hours <= 12) ? theTime.hours : theTime.hours - 12; // ! ovo pravi problem, zato prvo pozivamo digitalni sat
  var degree = Math.round(theTime.hours * 360 / 12);
  if( theTime.minutes >= 40 && theTime.minutes < 60){
    degree += 20 
  } else if (theTime.minutes >= 20 && theTime.minutes < 40){
    degree += 10
  }
  moveDial(whichHand, degree)
}


// -------------------- init function for timer --------------------
(function init(){
  var intNum = 0;
  var interval = setInterval(()=>{
    var currentTime = getTime()

    if(interaction === true && currentTime.seconds > 0 && currentTime.seconds < 28){
      playable = true;
    }
    
    if(currentTime.seconds === 0 && playable === true){
        soundHorn(currentTime)
    }

    if(currentTime.seconds === 28 && playable === true){
        soundSaw()
    }

    updateDigitalClock(currentTime)

    //options under which the message will be displayed
    if(interaction === true){
      updateInfoMsg(currentTime,playable)
    }
    secondHand(currentTime, 'secondHand')
    minuteHand(currentTime, 'minuteHand')
    hourHand(currentTime,'hourHand')

    document.getElementById('tick').play() //playing the clock ticking
    
    intNum++;

    if(intNum === 10){
      clearInterval(interval)
      init()
    }
  },1000)
})()