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

  // audio files
  const birds = new Audio(`../assets/audio/birds.mp3`);
  const coffee = new Audio(`../assets/audio/coffee.mp3`);
  const rain = new Audio(`../assets/audio/rain.mp3`);
  const street = new Audio(`../assets/audio/street.mp3`);
  const elevator = new Audio(`../assets/audio/elevator.mp3`);
  const metro = new Audio(`../assets/audio/metro.mp3`);
  const kassa = [new Audio(`../assets/audio/kassa_01.mp3`), new Audio(`../assets/audio/kassa_02.mp3`), new Audio(`../assets/audio/kassa_03.mp3`), new Audio(`../assets/audio/kassa_04.mp3`), new Audio(`../assets/audio/kassa_05.mp3`)];
  
  const $video = document.querySelector(".video");
  const $svg = document.querySelector(".svg");

  let location = "transport";

  const selectNewVideo = () => {
    const filteredVideos = videos.filter(
      (video) => video.location === location
    );
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

  

  const playAduio = (audio) => {
    if (audio === kassa) {
      const randomAudio = kassa[Math.floor(Math.random() * kassa.length)];
      randomAudio.play();
      return;
    }

    if(!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }else {
      audio.play();
      if (audio === street || audio === birds || audio === rain || audio === coffee) {
        audio.loop = true;
      }
    }
  };


  const numberCheckArray = [];
  const numberArray = ['f', 'o', 'o'];

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
      if(numberCheckArray.length < 3){
        numberCheckArray.push(key);
        if(!checkEqual(numberCheckArray, numberArray)){
          numberCheckArray.length = 0;
        }else{
          console.log(numberCheckArray)
        }
      }else if(numberCheckArray.length === 3){
        state = "play";
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
        playAduio(birds);
        break;
      case "g":
        playAduio(coffee);
        break;
      case "h":
        playAduio(rain);
        break;
      case "i":
        playAduio(street);
        break;
      case "j":
        playAduio(elevator);
        break;
      case "k":
        playAduio(kassa);
        break;
      case "l":
        playAduio(metro);
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