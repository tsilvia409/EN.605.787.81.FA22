// Thomas Silvia
// EN.605.787.81.FA22
// JHU Engineering for Professionals

// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)

(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

// STEP 10:
// Loop over the names array and say either 'Hello' or "Good Bye"
// using either the helloSpeaker's or byeSpeaker's 'speak' method.
// See Lecture 50, part 1
  for (var i = 0; i < names.length; i++) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[i].charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }

  }

  // STEP 15: 
  // Use map function to create array with list of concatenated greetings and names

  // Create named function for the logic of concatenating greeting with name
  var pairNameGreeting = function (firstName) {
    var firstLetter = firstName.charAt(0).toLowerCase();
    if (firstLetter === 'j') {
     return byeSpeaker.speakSimple(firstName);
    } else {
      return helloSpeaker.speakSimple(firstName);
    }
  }

  // Call mapNamesGreetings function for each element of the names array
  var pairedArray = names.map(pairNameGreeting);

  // Loop through each greeting/name pair in new array and print to console
  // Note using the array of from ES6 for cleaner code
  for (pair of pairedArray) {
    console.log(pair);
  }
  
   // Set initial value as per requirement
   var initialValue = {
    hello: [],
    bye: []
  };

  // Generate an object containing arrays of greetings (to be used to accumulate grouped greetings below)
  var generateGreeting = function(greetingsWrapper,currName) {
    var firstLetter = currName.charAt(0).toLowerCase();
    if (firstLetter === 'j') {
      greetingsWrapper.bye[greetingsWrapper.bye.length] = byeSpeaker.speakSimple(currName);
    } else {
      greetingsWrapper.hello[greetingsWrapper.hello.length] = helloSpeaker.speakSimple(currName);
    }
    return greetingsWrapper;
  }

  // // NOTE: Could also be written like the following using ES6 spread syntax
  // var generateGreeting = function(greetingsWrapper,currName) {
  //   var firstLetter = currName.charAt(0).toLowerCase();
  //   if (firstLetter === 'j') {
  //     greetingsWrapper.bye = [...greetingsWrapper.bye, byeSpeaker.speakSimple(currName)];
  //   } else {
  //     greetingsWrapper.hello = [...greetingsWrapper.hello, helloSpeaker.speakSimple(currName)];
  //   }
  //   return greetingsWrapper;
  // }

  // NOTE: Could also be written with the push() method to be cleaner
  // var generateGreeting = function(greetingsWrapper,currName) {
  //   var firstLetter = currName.charAt(0).toLowerCase();
  //   if (firstLetter === 'j') {
  //     greetingsWrapper.bye.push(byeSpeaker.speakSimple(currName));
  //   } else {
  //     greetingsWrapper.hello.push(helloSpeaker.speakSimple(currName));
  //   }
  //   return greetingsWrapper;
  // }

  // Call reduce function to create wrapper object out of array of names
  var helloBye = names.reduce(generateGreeting, initialValue);

 
  // Loop through each hello greeting/name pair in array created using reduce and print to console
  // Note using the array of from ES6 for cleaner code
  for (helloPair of helloBye.hello) {
    console.log(helloPair);
  }

  // Loop through each bye greeting/name pair in array created using reduce and print to console
  // Note using the array of from ES6 for cleaner code
  for (byePair of helloBye.bye) {
    console.log(byePair);
  }

})();
