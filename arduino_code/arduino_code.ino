const int  hookPin = 2;

const int dialPin = 3; // Closes when rotating starts

const int numberPin = 4; // Opens and closes the number of time equal to the number rotated
const int blackButtonPin = 5;
const int greenButtonPin = 6;
const int buttonPin_1 = 7;
const int buttonPin_2 = 8;
const int buttonPin_3 = 9;
const int buttonPin_4 = 10;
const int buttonPin_5 = 14;
const int ledPin_1 = 15;
const int ledPin_2 = 16;

int dialState = 0;
int numberState = 0;
int hookState = 0;

int greenButtonState = 0;
int blackButtonState = 0;
int prev_greenButtonState = 0;
int prev_blackButtonState = 0;
int longPressDelay = 500;

int buttonState_1 = 0;
int buttonState_2 = 0;
int buttonState_3 = 0;
int buttonState_4 = 0;
int buttonState_5 = 0;

int prev_hookState = 0;
int prev_numberState = 0;
int prev_dialState = 0;
int prev_button = 0;
int current_button = 1;

// greenPin is Brussel, blackPin is US
int time = greenButtonPin;
int prev_time = 1;

int countNumber = 0;
int number = 0;

int prev_buttonState_1 = 1; 
int prev_buttonState_2 = 1;
int prev_buttonState_3 = 1;
int prev_buttonState_4 = 1;
int prev_buttonState_5 = 1;


void setup() {
  Serial.begin(9600);
  pinMode(dialPin, INPUT_PULLUP); 
  pinMode(numberPin, INPUT_PULLUP);
  pinMode(hookPin, INPUT_PULLUP); // low is open 
  pinMode(greenButtonPin, INPUT_PULLUP);
  pinMode(blackButtonPin, INPUT_PULLUP);
  pinMode(buttonPin_1, INPUT_PULLUP);
  pinMode(buttonPin_2, INPUT_PULLUP);
  pinMode(buttonPin_3, INPUT_PULLUP);
  pinMode(buttonPin_4, INPUT_PULLUP);
  pinMode(buttonPin_5, INPUT_PULLUP);

  pinMode(ledPin_1, OUTPUT); 
  pinMode(ledPin_2, OUTPUT); 
  digitalWrite(ledPin_1, HIGH);
  digitalWrite(ledPin_2, LOW);
}

void loop() {
  hookState = digitalRead(hookPin);
  dialState = digitalRead(dialPin);
  numberState = digitalRead(numberPin);


  // when putting the phone back on the receiver
  if(prev_hookState == LOW && hookState == HIGH){
    Serial.println("reset");
  }
  prev_hookState = hookState;

  // if phone picked up, start checking buttons and dial
  if(hookState == LOW){
    checkTimeButton();

    checkButton(buttonPin_1, buttonState_1, prev_buttonState_1);
    checkButton(buttonPin_2, buttonState_2, prev_buttonState_2);
    checkButton(buttonPin_3, buttonState_3, prev_buttonState_3);
    checkButton(buttonPin_4, buttonState_4, prev_buttonState_4);
    checkButton(buttonPin_5, buttonState_5, prev_buttonState_5);

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

void checkButton (int buttonPin, int& buttonState, int& prev_buttonState) {
  buttonState = digitalRead(buttonPin);


  if(buttonState == LOW && prev_buttonState == HIGH){
    Serial.print("pressed button ");
    Serial.println(buttonPin);
    delay(50);
  }
  prev_buttonState = buttonState;

}

void checkTimeButton() {
  greenButtonState = digitalRead(greenButtonPin);
  blackButtonState = digitalRead(blackButtonPin);

  if(greenButtonState == LOW && prev_greenButtonState == HIGH) {
    delay(longPressDelay);
    if (digitalRead(greenButtonPin) == LOW) {
      setTime(greenButtonPin);
      digitalWrite(ledPin_1, HIGH);
      digitalWrite(ledPin_2, LOW);
    }
  }
  prev_greenButtonState = greenButtonState;

  if(blackButtonState == LOW && prev_blackButtonState == HIGH){
    delay(longPressDelay);
    if(digitalRead(blackButtonPin) == LOW){
      setTime(blackButtonPin);
      digitalWrite(ledPin_2, HIGH);
      digitalWrite(ledPin_1, LOW);
    }
  }
  prev_blackButtonState = blackButtonState;
}

void setTime(int buttonPin) {
  time = buttonPin;
  if(time != prev_time){
    Serial.print("change time to");
    Serial.println(time);
  }
  prev_time = time;
}








