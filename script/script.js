{
  // states: setup, start, zipcode, time, play 
  let state = 'setup';

  const zipCodesArray = [
    20001,
    20002,
    20003,
    20004,
    20005,
    20006,
    20007,
    20008,
    20009,
    20010,
    20011,
    20012,
    20015,
    20016,
    20017,
    20018,
    20019,
    20020,
    20024,
    20032,
    20036,
    20037,
    20045,
    20052,
    20053,
    20057,
    20064,
    20202,
    20204,
    20228,
    20230,
    20240,
    20245,
    20260,
    20307,
    20317,
    20319,
    20373,
    20390,
    20405,
    20418,
    20427,
    20506,
    20510,
    20520,
    20535,
    20540,
    20551,
    20553,
    20560,
    20565,
    20566,
    20593,
  ];

  const videos = [
    {
      id: "1",
      moment: "general",
      location: "transport",
    },
    {
      id: "2",
      moment: "evening",
      location: "street",
    },
    {
      id: "3",
      moment: "morning",
      location: "transport",
    },
    {
      id: "4",
      moment: "morning",
      location: "public",
    },
    {
      id: "5",
      moment: "morning",
      location: "street",
    },
    {
      id: "6",
      moment: "morning",
      location: "monument",
    },
    {
      id: "7",
      moment: "evening",
      location: "street",
    },
    {
      id: "8",
      moment: "morning",
      location: "street",
    },
    {
      id: "9",
      moment: "morning",
      location: "street",
    },
    {
      id: "10",
      moment: "general",
      location: "transport",
    },
    {
      id: "11",
      moment: "general",
      location: "transport",
    },
    {
      id: "12",
      moment: "general",
      location: "monument",
    },
    {
      id: "13",
      moment: "general",
      location: "sport",
    },
    {
      id: "14",
      moment: "general",
      location: "sport",
    },
    {
      id: "15",
      moment: "evening",
      location: "public",
    },
    {
      id: "16",
      moment: "night",
      location: "street",
    },
    {
      id: "17",
      moment: "night",
      location: "public",
    },
    {
      id: "18",
      moment: "night",
      location: "public",
    },
    {
      id: "19",
      moment: "night",
      location: "public",
    },
    {
      id: "20",
      moment: "evening",
      location: "public",
    },
    {
      id: "21",
      moment: "noon",
      location: "monument",
    },
    {
      id: "22",
      moment: "noon",
      location: "monument",
    },
    {
      id: "23",
      moment: "noon",
      location: "street",
    },
    {
      id: "24",
      moment: "noon",
      location: "public",
    },
    {
      id: "25",
      moment: "evening",
      location: "public",
    },
    {
      id: "26",
      moment: "noon",
      location: "transport",
    },
    {
      id: "27",
      moment: "evening",
      location: "transport",
    },
    {
      id: "28",
      moment: "noon",
      location: "public",
    },
    {
      id: "29",
      moment: "noon",
      location: "sport",
    },
    {
      id: "30",
      moment: "noon",
      location: "public",
    },
    {
      id: "31",
      moment: "general",
      location: "transport",
    },
    {
      id: "32",
      moment: "evening",
      location: "monument",
    },
    {
      id: "33",
      moment: "morning",
      location: "monument",
    },
    {
      id: "34",
      moment: "night",
      location: "monument",
    },
    {
      id: "35",
      moment: "morning",
      location: "monument",
    },
    {
      id: "36",
      moment: "noon",
      location: "monument",
    },
    {
      id: "37",
      moment: "noon",
      location: "transport",
    },
    {
      id: "38",
      moment: "noon",
      location: "monument",
    },
    {
      id: "39",
      moment: "noon",
      location: "public",
    },
    {
      id: "40",
      moment: "night",
      location: "public",
    },
    {
      id: "41",
      moment: "night",
      location: "street",
    },
    {
      id: "42",
      moment: "noon",
      location: "street",
    },
  ];

  // phone sounds
  const audioZipcode = new Audio(`../assets/audio/enter_zipcode.mp3`);
  const audioTime = new Audio(`../assets/audio/enter_time.mp3`);
  const audioKey = new Audio(`../assets/audio/key.mp3`);
  const beep = new Audio(`../assets/audio/beep.mp3`);
  const audioZipcodeError = new Audio(`../assets/audio/zipcode_incorrect.mp3`);
  const audioTimeError = new Audio(`../assets/audio/time_incorrect.mp3`);
  const audioEnjoy = new Audio(`../assets/audio/enjoy.mp3`);
  
  // audio files (DC sounds)
  const audio = [
    new Audio(`../assets/audio/street.mp3`),
    new Audio(`../assets/audio/birds.mp3`),
    new Audio(`../assets/audio/rain.mp3`),
    new Audio(`../assets/audio/americans.mp3`),
    new Audio(`../assets/audio/coffeeshop.mp3`),
    new Audio(`../assets/audio/street-music.mp3`),
    // short sounds
    new Audio(`../assets/audio/elevator.mp3`),
    new Audio(`../assets/audio/metro.mp3`),
    [new Audio(`../assets/audio/kassa_01.mp3`), new Audio(`../assets/audio/kassa_02.mp3`), new Audio(`../assets/audio/kassa_03.mp3`), new Audio(`../assets/audio/kassa_04.mp3`), new Audio(`../assets/audio/kassa_05.mp3`)],
  ]

  const indexKassaSound = 8;
  
  const $video = document.querySelector(".video");
  const $svg = document.querySelector(".svg");
  const $intro = document.querySelector(".intro");
  const $introTitle = document.querySelector(".intro__title");
  const $introZipcode = document.querySelector(".intro__zipcode");
  const $setup = document.querySelector(".setup");
  const $time = document.querySelector(".time");
  const $overlay = document.querySelector(".overlay");
  const zipcodeNumbers = document.querySelectorAll(".zipcode__number");
  const timeNumbers = document.querySelectorAll(".time__number");
  const $setupError = document.querySelector(".setup__error");
  

  let location = "transport";
  const numberArray = ['', '', '', '', '', ''];

  let zone = '';
  let moment = 'general';
  let prev_moment = '';

  let hours;
  let hoursDC;
  let minutes;
  let seconds;


  const selectNewVideo = () => {
    const prev_video = $video.src.split("/").pop().split(".")[0];
    console.log(prev_video);
    if(moment === 'general' || moment === ''){
      filteredVideos = videos.filter((video) => video.location === location && video.id !== prev_video);
    }else {
      filteredVideos = videos.filter((video) => (video.moment === moment || video.moment === 'general') && video.location === location && video.id !== prev_video);
    }

    console.log(filteredVideos);
    const randomVideo =
      filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    console.log(randomVideo);
    $video.src = `../assets/video/${randomVideo.id}.mp4`;
  };

  const changeVideoAfterDelay = () => {
    setTimeout(function () {
      // Code to be executed after 0.5 second
      console.log("Delayed execution!");
      selectNewVideo();
      $video.style.transform = "rotate(0deg)";
      $svg.style.transform = "rotate(0deg)";
      $overlay.style.transform = "rotate(0deg)";
    }, 500);
  };

  const rotateFrame = () => {
    audioKey.play();
    $video.style.transform = "rotate(25deg)";
    $svg.style.transform = "rotate(25deg)";
    $overlay.style.transform = "rotate(25deg)";
    changeVideoAfterDelay();
  };



  const selectMoment = (hours) => {

    if(zone === ''){
      moment = "general";
    }else if (hours >= 5 && hours < 11) {
      moment = "morning";
    } else if (hours >= 11 && hours < 16) {
      moment = "noon";
    } else if (hours >= 16 && hours < 22) {
      moment = "evening";
    } else if (hours >= 22 || hours < 5) {
      moment = "night";
    }

    // if moment is changed, change the video as well
    if(moment !== prev_moment){
      selectNewVideo();
    }
    prev_moment = moment;
    console.log(moment);
  };

  const showTime = (newZone) => { 
    zone = newZone;
    if(zone === ''){
      $overlay.classList.add("hidden");
    }else {
      $overlay.classList.remove("hidden");
    }
    
  }

  const playAduio = (audioNumber) => {
    if (audioNumber === indexKassaSound) {
      const randomAudio = audio[audioNumber][Math.floor(Math.random() * audio[audioNumber].length)];
      randomAudio.play();
      return;
    }

    if(!audio[audioNumber].paused) {
      audio[audioNumber].pause();
      audio[audioNumber].currentTime = 0;
      return;
    }else {
      audio[audioNumber].play();
      if (audioNumber <= 5) {
        audio[audioNumber].loop = true;
      }
    }
  };

  const reset = () => {
    numberArray.length = 0;
    console.log(numberArray);
    zipcodeNumbers.forEach((item) => {
      item.innerHTML = "";
    });

    timeNumbers.forEach((item) => {
      item.innerHTML = "";
    });

    $intro.classList.remove("hidden");
    $introTitle.classList.remove("hidden");
    $video.classList.add("hidden");
    beep.pause();

    if(state == 'zipcode'){ 
      audioZipcode.pause();
      audioZipcode.currentTime = 0;
      $introZipcode.classList.add("hidden");

    }
    
    // stop all audio
    audio.forEach((item, index) => {
      if(index !== indexKassaSound){
        item.pause();
        item.currentTime = 0;
      }else {
        item.forEach((item) => {
          item.pause();
          item.currentTime = 0;
        })
      }
    });
    state = "start";
  };    

  const changeToDate = () => {
    state = 'time';
    // play audio
    audioTime.play();

    $setup.classList.remove("hidden");
    $introZipcode.classList.add("hidden");
    numberArray.length = 0;
    for(let i = 0; i < timeNumbers.length; i++){
      numberArray.push('');
    }
    console.log(numberArray);
  }


  const checkZipcode = () => {
    const zipcode = numberArray.join(''); 
    console.log(zipcode);
    // check if zipcode in zipCodesArray
    if(zipCodesArray.includes(parseInt(zipcode))){
      console.log("zipcode correct");
      play();
      
    }else{
      console.log("zipcode incorrect");
      // play audio
      audioZipcodeError.play();
      // reset
      numberArray.length = 0;
      zipcodeNumbers.forEach((item) => {
        item.innerHTML = "";
      });
    }
  }

  const enterNumber = (number) => {
    
    if(state == 'zipcode'){
      beep.play();
      beep.loop = true;
      audioKey.play();
      if(!audioZipcode.paused){
        audioZipcode.pause();
        audioZipcode.currentTime = 0;
      }
      if(numberArray.length < 5){
        numberArray.push(number);
        console.log(numberArray);
        zipcodeNumbers[numberArray.length - 1].innerHTML = `<p class="text-animation">${number}</p>`;
      }
      if(numberArray.length == 5){
        // wait a little bit so user also sees the last number
        setTimeout(function () {
          checkZipcode();
        }, 100);
        
      }
    }else if(state == 'setup'){
      numberArray.shift();
      numberArray.push(number);
      timeNumbers.forEach((number, index) => {
        number.innerHTML = `<p">${numberArray[index]}</p>`;
      });
    }
  }

  
  // checks if time is valid
  const checkTime = () => { 
    console.log('check time');
    hours = parseInt(numberArray.slice(0, 2).join(''));
    minutes = parseInt(numberArray.slice(2, 4).join(''));
    seconds = parseInt(numberArray.slice(4, 6).join(''));
    if(hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60){
      console.log("time correct");
      if(hours >= 6 && hours < 24){
        hoursDC = hours - 6;
      }else if(hours >= 0 && hours < 6){
        hoursDC = hours + 18;
      }
      startClock();
      start();
    }else {
      console.log("time incorrect");
      $setupError.innerHTML = `<p>Incorrect time</p>`;
    }

  }

  const start = () => {
    $introTitle.classList.remove("hidden");
    $setup.classList.add("hidden");
    state = 'start';
  }

  const zipcode = () => {
    state = 'zipcode';
    audioZipcode.play();
    audioZipcode.loop = true;
    $introTitle.classList.add("hidden");
    $introZipcode.classList.remove("hidden");
    numberArray.length = 0;
  }

  const play = () => {
    // stop audio
    audioTime.pause();
    audioTime.currentTime = 0;
    beep.pause();
    $video.classList.remove("hidden");
    $intro.classList.add("hidden");
    // wait a little bit so frame doesn't change too fast
    setTimeout(function () {
      state = 'play';
      // play audio 
      audioEnjoy.play();
    }, 500);
  }

  const startClock = () => {
    clockInterval = setInterval(updateClock, 1000);
  }

  const updateClock = () => {
    seconds++;
    if(seconds == 60){  
      seconds = 0;
      minutes++;
    }
    if(minutes == 60){
      minutes = 0;
      hours++;
      hoursDC++;
    }
    if(hours == 24){  
      hours = 0;
    }
    if(hoursDC == 24){  
      hoursDC = 0;
    }

    

    if(zone == 'DC'){
      selectMoment(hoursDC);
      console.log(`${ formatTime(hoursDC)}:${ formatTime(minutes)}:${ formatTime(seconds)}`);
      $time.innerHTML = `${ formatTime(hoursDC)}:${ formatTime(minutes)}:${ formatTime(seconds)}`;

    } else if(zone == 'BXL'){
      selectMoment(hours);
      console.log(`${ formatTime(hours)}:${ formatTime(minutes)}:${ formatTime(seconds)}`);
      $time.innerHTML = `${ formatTime(hours)}:${ formatTime(minutes)}:${ formatTime(seconds)}`;
    }
    
  }

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  }

  const deleteAllAudio = () => {
    audio.forEach((item, index) => {
      if(index !== indexKassaSound){
        item.pause();
        item.currentTime = 0;
      }else {
        item.forEach((item) => {
          item.pause();
          item.currentTime = 0;
        })
      }
    });
  }

  const handleKeydown = (e) => {
    const key = e.key;
    // check state
    if(state == "start"){ 
      switch(key){
        case "s":
          zipcode();
          state = "zipcode";
          break;
        default:
            console.log("unknown key pressed");
            break;
      }
    }
    if(state == "zipcode" || state == "setup"){ 
      switch(key){
        case "f":
          enterNumber(1);
          break;
        case "g":
          enterNumber(2);
          break;
        case "h":
          enterNumber(3);
          break;
        case "i":
          enterNumber(4);
          break;
        case "j":
          enterNumber(5);
          break;
        case "k":
          enterNumber(6);
          break;
        case "l":
          enterNumber(7);
          break;
        case "m":
          enterNumber(8);
          break;
        case "n":
          enterNumber(9);
          break;
        case "o":
          enterNumber(0);
          break;
        default:
          console.log("unknown key pressed");
          break;
      }
    }
    if(state == "zipcode"){
      switch(key){
        case 'r':
          reset();
          break;
        default:
          break;
      }
    }
      

    if(state == "setup"){
      switch(key){
        case "a":
          console.log("a");
          checkTime();
          break;
        default:
          break;
      }
    }
    
    if(state == "play"){
      audioEnjoy.pause();
      audioEnjoy.currentTime = 0;
      switch (key) {
        case "a":
          location = "transport";
          rotateFrame();
          break;
        case "b":
          location = "street";
          rotateFrame();
          break;
        case "c":
          location = "public";
          rotateFrame();
          break;
        case "d":
          location = "monument";
          rotateFrame();
          break;
        case "e":
          location = "sport";
          rotateFrame();
          break;
        // audio files
        case "f":
          playAduio(0);
          break;
        case "g":
          playAduio(1);
          break;
        case "h":
          playAduio(2);
          break;
        case "i":
          playAduio(3);
          break;
        case "j":
          playAduio(4);
          break;
        case "k":
          playAduio(5);
          break;
        case "l":
          playAduio(6);
          break;
        case "m":
          playAduio(7);
          break;
        case "n":
          playAduio(8);
          break;
        case "o":
          deleteAllAudio();
          break;
        case "p":
          showTime('BXL');
          break;
        case "q":
          showTime('DC');
          break;
        case "s":
          showTime('');
          break;
        // reset
        case "r":
            reset();
            break;
        default:
          console.log("unknown key pressed");
          break;
      }
    }
  };


  const init = () => {
    numberArray.length = 0;
    for(let i = 0; i < timeNumbers.length; i++){
      numberArray.push('');
    }
    document.addEventListener("keydown", handleKeydown);


  };

  init();
}