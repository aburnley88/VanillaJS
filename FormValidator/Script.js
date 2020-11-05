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
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    
}

//show success outline
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

  // Get fieldname
  //this method takes the input id and returns it with the first letter capitalized
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

//Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
   
    checkRequired([username, email, password, password2]);  
});