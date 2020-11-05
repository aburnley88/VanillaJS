const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small  = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';   
}

//what is wrapped in the forward slashes is the regular expression of an email. object name is re
//test method is called on re to determine if it is a string and then it is converted to lowercase
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}


function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
        isRequired = true;
      } else {
        showSuccess(input);
      }
    });
  
    return isRequired;
  }

  //check input length
  function checkLength(input, min, max) {
    if(input.value.length < min)
    {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
      showError(input, `${getFieldName(input)} must be less than ${max} characheters`)
    } else {
      showSuccess(input);
    }    
  }

  //check that password entries match
  function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passowrds do not match');
    }
  }

  // Get fieldname
  //this method takes the input id and returns it with the first letter capitalized
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

//Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
   
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);  
    checkEmail(email);
    checkPasswordsMatch(password, password2)
});