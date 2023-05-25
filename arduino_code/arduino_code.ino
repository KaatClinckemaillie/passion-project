const int  hookPin = 16;

const int dialPin = 3; // Closes when rotating starts

const int numberPin = 4; // Opens and closes the number of time equal to the number rotated
const int greenPin = 5;
const int blackPin = 6;
const int green_lightPin = 7;
const int black_lightPin = 8;




int dialState = 0;
int numberState = 0;
int hookState = 0;
int prev_hookState = 0;
int prev_numberState = 0;
int prev_dialState = 0;
int countNumber = 0;
int number = 0;

// States in which the telephone can be


void setup() {
  Serial.begin(9600);
  pinMode(dialPin, INPUT_PULLUP); 
  pinMode(numberPin, INPUT_PULLUP);
  pinMode(hookPin, INPUT_PULLUP); // low is open 

}

void loop() {
  hookState = digitalRead(hookPin);
  dialState = digitalRead(dialPin);
  numberState = digitalRead(numberPin);

  if(hookState == LOW){
    //Serial.println("open");
  }else if(hookState == HIGH){
    //Serial.println("closed");
  }

  // when putting the phone back on the receiver
  if(prev_hookState == LOW && hookState == HIGH){
    Serial.println("reset");
  }
  
  prev_hookState = hookState;
  // if phone picked up, start checking buttons and dial
  if(hookState == LOW){
    if(dialState == LOW) {
      //Start counting numbers when dial is pressed
      if(prev_numberState != numberState){
        if(numberState == HIGH){
          countNumber ++;
        }
        delay(20);
      }
      prev_numberState = numberState;
    }

    if(prev_dialState == LOW && dialState == HIGH){
      number = countNumber;
      Serial.println("stop");
      Serial.println(number);
      countNumber = 0;
    }

    prev_dialState = dialState;
    
  }
}

