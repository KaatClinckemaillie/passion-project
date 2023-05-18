#include "Keyboard.h"

// Closes when rotating starts
const int dialPin = 2;
// Opens and closes the number of time equal to the number rotated
const int numberPin = 3;
const int handlePin = 4;

int dialState = 0;
int numberState = 0;
int prev_numberState = 0;
int prev_dialState = 0;
int countNumber = 0;
int number = 0;


String state = "closed";


void setup() {
  Serial.begin(9600);
  pinMode(dialPin, INPUT_PULLUP); // HIGH when open
  pinMode(numberPin, INPUT_PULLUP);
  pinMode(handlePin, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {

  if(handlePin == LOW){
    // put your main code here, to run repeatedly:
    dialState = digitalRead(dialPin);
    numberState = digitalRead(numberPin);

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
      Keyboard.write(number);
      Serial.println("stop");
      Serial.println(number);
      countNumber = 0;
    }

    prev_dialState = dialState;
  }
}

int calculateNumber(){
  
}