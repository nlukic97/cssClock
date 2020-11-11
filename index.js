var interaction = false;

document.addEventListener('click', function(){
  interaction = true;
})

// Executed only when the time strikes 00 minutes and 00 seconds - once an hour
const soundHorn = () =>{
    document.querySelector('#timeText h1').textContent = `17:00:00`;
    document.querySelector('#timeText h1').style.display = 'block';
    document.getElementById('horn').play()
    document.querySelector('#timeText h1').classList.add('animateText')
    setTimeout(function(){
      document.querySelector('#timeText h1').style.display = 'none';
      document.querySelector('#timeText h1').classList.remove('animateText')
    },2800)
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
  document.getElementById('digitalTime').textContent = `${time.hours}:${('0' + time.minutes).slice(-2)}:${('0' + time.seconds).slice(-2)}`
}

// updates the message informing us at what time will the user hear the horn (activation of the soundHorn() method)
const updateInfoMsg = (time)=>{
  console.log(time);
  var hours = (time.hours === 23) ? '00' : time.hours + 1;
  document.getElementById('timeMessage').textContent = `Something cool will happen at: ${hours}:00:00 ... what could it be ?`;
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

    if(currentTime.minutes === 0 && currentTime.seconds === 0 && interaction === true){
      soundHorn()
    }

    updateDigitalClock(currentTime)
    updateInfoMsg(currentTime)
    secondHand(currentTime, 'secondHand')
    minuteHand(currentTime, 'minuteHand')
    hourHand(currentTime,'hourHand')
    
    intNum++;

    if(intNum === 10){
      clearInterval(interval)
      init()
    }
  },1000)
})()