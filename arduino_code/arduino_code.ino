#include "Keyboard.h"

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
int longPressDelay = 200;

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
  digitalWrite(ledPin_1, LOW);
  digitalWrite(ledPin_2, LOW);
  Keyboard.begin();
}

void loop() {
  hookState = digitalRead(hookPin);
  dialState = digitalRead(dialPin);
  numberState = digitalRead(numberPin);


  // when putting the phone back on the receiver
  if(prev_hookState == LOW && hookState == HIGH){
    Serial.println("reset");
    digitalWrite(ledPin_1, LOW);
    digitalWrite(ledPin_2, LOW);
    Keyboard.write('r');
  }else if(prev_hookState == HIGH && hookState == LOW){
    Serial.println("start");
    Keyboard.write('s');
  }
  prev_hookState = hookState;

  // if phone picked up, start checking buttons and dial

    checkTimeButton(greenButtonPin, greenButtonState, prev_greenButtonState);
    checkTimeButton(blackButtonPin, blackButtonState, prev_blackButtonState);

    checkButton(buttonPin_1, buttonState_1, prev_buttonState_1, 1);
    checkButton(buttonPin_2, buttonState_2, prev_buttonState_2, 2);
    checkButton(buttonPin_3, buttonState_3, prev_buttonState_3, 3);
    checkButton(buttonPin_4, buttonState_4, prev_buttonState_4, 4);
    checkButton(buttonPin_5, buttonState_5, prev_buttonState_5, 5);

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
      Serial.println(number);
      switch (number) {
      case 1:
        Keyboard.write('f');
        break;
      case 2:
        Keyboard.write('g');
        break;
      case 3:
        Keyboard.write('h');
        break;
      case 4:
        Keyboard.write('i');
        break;
      case 5:
        Keyboard.write('j');
        break;
      case 6:
        Keyboard.write('k');
        break;
      case 7:
        Keyboard.write('l');
        break;
      case 8:
        Keyboard.write('m');
        break;
      case 9:
        Keyboard.write('n');
        break;
      case 10:
        Keyboard.write('o');
        break;

      }



      countNumber = 0;
    }

    prev_dialState = dialState;
    

}

void checkButton (int buttonPin, int& buttonState, int& prev_buttonState, int number) {
  buttonState = digitalRead(buttonPin);


  if(buttonState == LOW && prev_buttonState == HIGH){
    Serial.print("pressed button ");
    Serial.println(buttonPin);

    switch (number) {
      case 1:
        Keyboard.write('a');
        break;
      case 2:
        Keyboard.write('b');
        break;
      case 3:
        Keyboard.write('c');
        break;
      case 4:
        Keyboard.write('d');
        break;
      case 5:
        Keyboard.write('e');
        break;
    }
    delay(50);
    }
  prev_buttonState = buttonState;

}

void checkTimeButton(int buttonPin, int& buttonState, int& prev_buttonState){
  buttonState = digitalRead(buttonPin);
  if(buttonState == LOW && prev_buttonState == HIGH) {
    delay(longPressDelay);
    if (digitalRead(buttonPin) == LOW) {
      setTime(buttonPin);
      if(buttonPin == 6){
        digitalWrite(ledPin_1, HIGH);
        digitalWrite(ledPin_2, LOW);
      }else if(buttonPin == 5){
        digitalWrite(ledPin_2, HIGH);
        digitalWrite(ledPin_1, LOW);
      }
      
    }else{
      // no button pressed
      setTime(0);
      digitalWrite(ledPin_1, LOW);
      digitalWrite(ledPin_2, LOW);
    }
  }

  if(buttonState == HIGH && prev_buttonState == LOW){
    setTime(0);
    digitalWrite(ledPin_1, LOW);
    digitalWrite(ledPin_2, LOW);
  }
  prev_buttonState = buttonState;
}

void checkTimeButton1() {
  greenButtonState = digitalRead(greenButtonPin);
  blackButtonState = digitalRead(blackButtonPin);

  if(greenButtonState == LOW && prev_greenButtonState == HIGH) {
    delay(longPressDelay);
    if (digitalRead(greenButtonPin) == LOW) {
      setTime(greenButtonPin);
      digitalWrite(ledPin_1, HIGH);
      digitalWrite(ledPin_2, LOW);
    }else{
      // no button pressed
      setTime(0);
      digitalWrite(ledPin_1, LOW);
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
    }else{
      // no button pressed
      setTime(0);
      digitalWrite(ledPin_1, LOW);
      digitalWrite(ledPin_2, LOW);
    }
  }
  prev_blackButtonState = blackButtonState;
}

void setTime(int buttonPin) {
  time = buttonPin;
  if(time != prev_time){
    if(time == 6){
      Keyboard.write('q');
    }else if(time == 5){
      Keyboard.write('p');
    }else if(time == 0){
      Keyboard.write('t');
    }
  }
  prev_time = time;
}








