// Assignment Code
var generateBtn = document.querySelector("#generate"),
  checkboxes = document.querySelectorAll("input[type=checkbox]"),
  resetBtn = document.querySelector("#resetBtn"),
  passwordText = document.querySelector("#password");


// made a few global variables, since this is a simple application and it will make a couple things easier. 
var passwordLength;
// These are the booleans for the checkboxes
var upperCase;
var lowerCase;
var specialCase;
var numbers;

// setting up the value slider.
// this is NOT a part of the assignment, but i feel that it greatly improves the user experience, so why not?
var slider = document.getElementById("passwordLength");
var output = document.getElementById("passwordValue");
output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};

// I chose to use checkboxes in the html for selecting password criteria instead of prompts, 
// Like the slider, I know the assignment called for something else, but i felt that checkboxes were more use friendly. 
// This section of the code simply checks the checkboxes and sets a true/false statement depending on their position. 
document.getElementById('upperCase').onclick = function () {
  if (this.checked) {
    upperCase = true;
  }
  else {
    upperCase = false;
  }
  console.log(upperCase)//console check
};
document.getElementById('lowerCase').onclick = function () {
  if (this.checked) {
    lowerCase = true;
  }
  else {
    lowerCase = false;
  }
  console.log(lowerCase)//console check
};
document.getElementById('specialChar').onclick = function () {
  if (this.checked) {
    specialCase = true;
  }
  else {
    specialCase = false;
  }
  console.log(specialCase)//console check
};
document.getElementById('numbers').onclick = function () {
  if (this.checked) {
    numbers = true;
  }
  else {
    numbers = false;
  }
  console.log(numbers)//console check
};


// Write password to the #password input
function generatePassword() {
  // if/else to check and make sure at least one of the criteria had been selected. 
  if (upperCase || lowerCase || specialCase || numbers) {

    passwordLength = document.getElementById("passwordLength").value;
    var password = generateRandomPassword();
    if (password === undefined) { // give an alert if the password generator fails for some reason. for dev purposes
      alert("error");
    }
    else {
      passwordText.value = password;
    }
  }
  // if user did not check at least one box, you will get this else statement
  else {
    alert("You must chose at least one of the password criteria")
  }
}

// Here is the function that actually generates a random password.
function generateRandomPassword() {

  let randomSet = []; // Array for a bunch of random, possible characters, that will then go on to be randomly chosen from for the final password
  let ensureSet = []; // Array for ensuring that at least one of each selected char-set will be included in the final password
  let passwordString = []; // Array for the final, randomly generated password. 

  // AND the variables for the contents of each possible character set. 
  var upperRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerRange = "abcdefghijklmnopqrstuvwxyz";
  var specialRange = "!@#$%^&*()_+~`-=:;',.<>?/{}[]";
  var numberRange = "1234567890";

  // doing truth checks to make sure the character sets are only included if the user selected them, then running the functions to include them if they pass.
  truthCheck(upperCase, upperRange);
  truthCheck(lowerCase, lowerRange);
  truthCheck(specialCase, specialRange);
  truthCheck(numbers, numberRange);

  // Truth-check function for the character selection.
  function truthCheck(x, y) {
    if (x) {
      randomSelector(y); // details below::
      charsetEnsure(y); // details below::
    };
  };
  // this is the function that provides a bunch of random characters to chose from, and sends them into the randomSet array, to later be chosen from randomly agin.
  // There are different methods that could be used in place of the for-loop, specifically the middle parameter. 
  // I chose i < 100 so that it would really fill up the randomSet array with options to choose from, to ensure a thoroughly random password, 
  // without running too many iterations and causing the function to run really slow. 
  function randomSelector(x) {
    for (let i = 0; i < 100; i++) {
      xChar = x.charAt(Math.floor(Math.random() * x.length));
      randomSet.push(xChar);
    };
  };
  // This function is what ensures that if a char-set passes its truth check, at least one of that sets characters will show up in the generated password. 
  function charsetEnsure(x) {
    xChar = x.charAt(Math.floor(Math.random() * x.length));
    ensureSet.push(xChar);
  };
  //then::
  //push the ensured chars to the passwordString, while joining them together so that they don't print with commas later.
  passwordString.push(ensureSet.join(''));

  // this loop picks random characters form the randomSet array that was filled earlier by the previous loop (randomSelector())
  // it uses (passwordLength - ensureSet.length) to ensure the generated password is the same length as specified by the user
  // (you must subtract ensureSet, because those characters will be added by force, and do not account for what the user specified the length to be)
  for (let i = 0; i < (passwordLength - ensureSet.length); i++) {
    var charPicked = randomSet[Math.floor(Math.random() * randomSet.length)];
    passwordString.push(charPicked);
  };

  // finally, log the result to the console, as well as return the result
  // so that the main function can access the randomly generated password. 
  console.log(passwordString); //console check
  return passwordString.join('').toString();
};

// Lastly, adding a function to reset the password, along will all criteria, to default state. 
function resetPassword() {
  passwordText.value = '';
  slider.value = 8;
  output.innerHTML = 8;
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  };
  upperCase = false;
  lowerCase = false;
  specialCase = false;
  numbers = false;
};

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
resetBtn.addEventListener("click", resetPassword);