// Assignment Code
var generateBtn = document.querySelector("#generate"),
  resetBtn = document.querySelector("#resetBtn"),
  passwordText = document.querySelector("#password"),
  checkboxes = document.querySelectorAll("input[type=checkbox]"),
  savePasswordBtn = document.querySelector("#savePasswordBtn"),
  savedInfoList = document.querySelector("#savedInformation"),
  showPasswordListBtn = document.querySelector("#showPasswordList"),
  usernameORemail = document.querySelector("input[type=text]"),


  // made a few global variables, since this is a simple application and it will make a couple things easier. 
  passwordLength,
  // These are the booleans for the checkboxes
  upperCase,
  lowerCase,
  specialCase,
  numbers,
  // Array for saved usernames and passwords 
  savedInformationArr = [],

  // setting up the value slider.
  // this is NOT a part of the assignment, but i feel that it greatly improves the user experience, so why not?
  slider = document.getElementById("passwordLength"),
  output = document.getElementById("passwordValue");

output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};

// Adding a function that will always load upon page open, so load all previously saved passwords
init();
// Get all previously saved passwords from the local storage and save them to the array so 
// that they can be "shown" as desired, when the renderAllPasswords function runs.
function init() {
  var previouslySaved = JSON.parse(localStorage.getItem("storedPasswords"))
  if (!localStorage.getItem("storedPasswords")) {
    return;
  } else {
    savedInformationArr = previouslySaved;
    console.log(savedInformationArr);
  }
  renderAllPasswords();
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


// OUTPUT a randomly generated password to the #password input
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
  /* this is the function that provides a bunch of random characters to chose from, and sends them into the randomSet array, to later be chosen from randomly agin.
    There are different methods that could be used in place of the for-loop, specifically the middle parameter. 
    I chose i < 100 so that it would really fill up the randomSet array with options to choose from, to ensure a thoroughly random password, 
    without running too many iterations and causing the function to run really slow. */
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

  /* this loop picks random characters form the randomSet array that was filled earlier by the previous loop (randomSelector())
    it uses (passwordLength - ensureSet.length) to ensure the generated password is the same length as specified by the user
    (you must subtract ensureSet, because those characters will be added by force, and do not account for what the user specified the length to be) */
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

// This function is assigned to the save password button on the HTML
function savePassword(e) {
  e.preventDefault();
  //check to make sure that a password has been generated before you can click to save the password. 
  if (passwordText.value) {
    var signinForPassword = usernameORemail.value.trim();
    /* then validate that the answer to the prompt contained a valid email address,
      at least by terms of including an @ symbol and a .com
      may need to add more accessibility to this later. */
    if (signinForPassword) {
      // If the user inputted a valid email address, the address, and password will be saved as an object to this array
      var passwordToSave = passwordText.value;

      var signInANDPassword = {
        username: signinForPassword.trim(),
        password: passwordToSave.trim()
      };
      savedInformationArr.push(signInANDPassword);
    } else {
      alert("You must enter a valid username or email address");
    };
    storeInfoToLocal();
    renderAllPasswords();
  } else {
    alert("You must generate a password first!")
  };
};

// This function is run every-time you save a password. It takes the newly saved password and updates the object saved
// in the local storage, so that you can view it later after closing your browser. 
function storeInfoToLocal() {
  localStorage.setItem("storedPasswords", JSON.stringify(savedInformationArr));
};

// this bit takes the list of all passwords, both newly created and previously stored in local storage, 
// and assigns them to a list to be appended to the document so that you can view them at your leisure. 
function renderAllPasswords() {
  savedInfoList.innerHTML = ''
  for (let i = 0; i < savedInformationArr.length; i++) {

    var storedInfo = savedInformationArr[i].username;

    // the next chunk is all the code needed to creates a list item for each saved password, wether
    // newly created, or pulled from local storage. 
    var itemToList = document.createElement("li");
    itemToList.setAttribute("data-index", i);
    itemToList.classList.add("clear-fix", "saved-passwords-list");
    itemToList.textContent = storedInfo;

    var showPasswordBtn = document.createElement("button");
    showPasswordBtn.setAttribute("id", "showPasswordBtn");
    showPasswordBtn.classList.add("btn", "btn-save", "btn-small", "float-right", "btn-border")
    showPasswordBtn.textContent = "Show password"

    var deletePasswordBtn = document.createElement("button");
    deletePasswordBtn.setAttribute("id", "deletePasswordBtn");
    deletePasswordBtn.classList.add("btn", "btn-small", "float-right", "btn-border");
    deletePasswordBtn.textContent = "Delete password";

    var password = document.createElement("p");
    password.classList.add("hide");
    password.textContent = savedInformationArr[i].password;

    // the order that you append these in effects the way it appears on the page. 
    // Check your changes carefully before committing anything. 
    itemToList.appendChild(deletePasswordBtn);
    itemToList.appendChild(showPasswordBtn);
    itemToList.appendChild(password);
    savedInfoList.appendChild(itemToList);
  };
};

/* this function shows the password for the email/username you select in the list of passwords
  and stuff below everything else. */
function showPassword(event) {
  var click = event.target,
    sib = click.nextSibling;
  if (click.matches("button[id=showPasswordBtn")) {
    if (sib.getAttribute("class", "hide")) {
      sib.classList.remove("hide");
      click.innerHTML = "Hide Password"
    } else if (!sib.getAttribute("class", "hide")) {
      sib.classList.add("hide");
      click.innerHTML = "Show Password"
    };
  };
};

/* this functions is run by the delete buttons
  when clicked, it removes the entire parent from the array, and updates the local storage
  at the same time, and then re-renders the list so that the item you chose to delete
  disappears, never to be seen again. */
function deleteSavedInformation(event) {
  event.preventDefault();
  var click = event.target,
    index = click.parentElement.getAttribute("data-index");

  if (click.matches("button[id=deletePasswordBtn")) {
    var confirm = window.confirm("Are you sure you want to delete this information? You cannot get it back after it is gone.");
    if (confirm) {
      savedInformationArr.splice(index, 1);
      storeInfoToLocal();
      renderAllPasswords();
    };
  };
};

// Show the list of all previously saved passwords. 
function showPasswordList() {
  var classlist = savedInfoList.classList;

  if (savedInfoList.getAttribute("class", "hide")) {
    classlist.remove("hide"); // You can either show the list, by removing the "hide" class
    showPasswordListBtn.innerHTML = "Hide";
  } else {
    classlist.add("hide"); // or hide the list, by adding the "hide" class back. 
    showPasswordListBtn.innerHTML = "Show"
  };
};

// All event listeners added here. 
savePasswordBtn.addEventListener("click", savePassword)
generateBtn.addEventListener("click", generatePassword);
resetBtn.addEventListener("click", resetPassword);
showPasswordListBtn.addEventListener("click", showPasswordList);
savedInfoList.addEventListener("click", deleteSavedInformation);
savedInfoList.addEventListener("click", showPassword);




// for dev purposes.
function logSavedInfo() {
  console.log(savedInformationArr);
};
document.querySelector("#logSavedInfo").addEventListener("click", logSavedInfo);
