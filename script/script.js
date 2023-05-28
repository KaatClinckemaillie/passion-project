{
  let state = 'start';
  const videos = [
    {
      id: "1",
      moment: "general",
      location: "transport",
    },
    {
      id: "2",
      moment: "morning",
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
      location: "bar",
    },
    {
      id: "5",
      moment: "morning",
      location: "monument",
    },
    {
      id: "6",
      moment: "morning",
      location: "monument",
    },
    {
      id: "7",
      moment: "morning",
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
      moment: "general",
      location: "bar",
    },
    {
      id: "16",
      moment: "evening",
      location: "street",
    },
    {
      id: "17",
      moment: "evening",
      location: "bar",
    },
    {
      id: "18",
      moment: "evening",
      location: "bar",
    },
    {
      id: "19",
      moment: "evening",
      location: "bar",
    },
    {
      id: "20",
      moment: "evening",
      location: "street",
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
      location: "street",
    },
    {
      id: "25",
      moment: "noon",
      location: "bar",
    },
    {
      id: "26",
      moment: "noon",
      location: "transport",
    },
    {
      id: "28",
      moment: "noon",
      location: "bar",
    },
    {
      id: "29",
      moment: "noon",
      location: "sport",
    },
  ];

  const beep = new Audio(`../assets/audio/beep.mp3`);
  // audio files
  const audio = [
    new Audio(`../assets/audio/birds.mp3`),
    new Audio(`../assets/audio/coffee.mp3`),
    new Audio(`../assets/audio/rain.mp3`),
    new Audio(`../assets/audio/street.mp3`),
    new Audio(`../assets/audio/elevator.mp3`),
    new Audio(`../assets/audio/metro.mp3`),
    [new Audio(`../assets/audio/kassa_01.mp3`), new Audio(`../assets/audio/kassa_02.mp3`), new Audio(`../assets/audio/kassa_03.mp3`), new Audio(`../assets/audio/kassa_04.mp3`), new Audio(`../assets/audio/kassa_05.mp3`)]
  ]
  
  const $video = document.querySelector(".video");
  const $svg = document.querySelector(".svg");
  const $intro = document.querySelector(".intro");
  const $time = document.querySelector(".time");
  const $date = document.querySelector(".date");
  const $overlay = document.querySelector(".overlay");

  let location = "transport";
  const numberCheckArray = [];
  const numberArray = ['f', 'o', 'o'];
  let timeInterval;
  let zone = '';
  let moment = '';
  let prev_moment = '';

  const selectNewVideo = () => {

    const filteredVideos = videos.filter((video) => (video.moment === moment || video.moment === 'general') && video.location === location);

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
    }, 500);
  };

  const rotateFrame = () => {
    $video.style.transform = "rotate(25deg)";
    $svg.style.transform = "rotate(25deg)";
    changeVideoAfterDelay();
  };

  const displayTime = () => {
    let date;
    const dateBrussels = new Date();
    const dateDc = new Date(dateBrussels.toLocaleString("en-US", { timeZone: zone }));

    if(zone === 'Europe/Brussels'){
      date = dateBrussels;
    }else if(zone === 'America/New_York'){
      date = dateDc;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    selectMoment(hours);
    
    $time.innerHTML = `${hours}:${minutes}:${seconds}`;
    $date.innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const selectMoment = (hours) => {

    if(zone === ''){
      moment = "general";
    }else if (hours >= 4 && hours < 11) {
      moment = "morning";
    } else if (hours >= 11 && hours < 17) {
      moment = "noon";
    } else if (hours >= 17 && hours < 22) {
      moment = "evening";
    } else {
      moment = "general";
    }

    if(moment !== prev_moment){
      selectNewVideo();
    }
    prev_moment = moment;

  };

  const switchZone = (newZone) => { 
    zone = newZone;
    if(zone === ''){
      clearInterval(timeInterval);
      $overlay.classList.add("hidden");
    }else {
      timeInterval = setInterval(displayTime, 1000);
      $overlay.classList.remove("hidden");
    }
    
  }

  const playAduio = (audioNumber) => {
    if (audioNumber === 6) {
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
      if (audioNumber <= 3) {
        audio[audioNumber].loop = true;
      }
    }
  };

  const reset = () => {
    state = "start";
    $intro.classList.remove("hidden");
    $video.classList.add("hidden");
    // stop all audio
    audio.forEach((item, index) => {
      if(index !== 6){
        item.pause();
        item.currentTime = 0;
      }else {
        item.forEach((item) => {
          item.pause();
          item.currentTime = 0;
        })
      }
    });
  };    




  const start = () => {
    beep.play();
    beep.loop = true;
  }


  

  // check if two arrays are equal
  const checkEqual = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if(arr1[i] !== arr2[i]){
        return false;
      }
    }
    return true;
  }

  const handleKeydown = (e) => {
    const key = e.key;
    // check state


    
    if(state == "start"){
      if(key === "s"){
        start();
      }
      
      if(numberCheckArray.length < 3){
        numberCheckArray.push(key);
        if(!checkEqual(numberCheckArray, numberArray)){
          numberCheckArray.length = 0;
        }else{
          console.log(numberCheckArray)
        }
      }else if(numberCheckArray.length === 3){
        state = "play";
        $intro.classList.add("hidden");
        $video.classList.remove("hidden");
        beep.pause();
        beep.currentTime = 0;
      } 

    }else if(state == "play"){

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
        location = "bar";
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
      case "p":
        switchZone('Europe/Brussels');
        break;
      case "q":
        switchZone('America/New_York');
        break;
      case "s":
        switchZone('');
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
    document.addEventListener("keydown", handleKeydown);
  };

  init();
}