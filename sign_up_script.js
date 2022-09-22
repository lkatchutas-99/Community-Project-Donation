window.onload = () => {
  let first_name = Array.from(document.querySelectorAll('.first-name'));
  let last_name = Array.from(document.querySelectorAll('.last-name'))
  let email = Array.from(document.querySelectorAll('.email'));
  let phone = Array.from(document.querySelectorAll('.phone'));
  let password = Array.from(document.querySelectorAll('.password'));
  let confirm_password = Array.from(document.querySelectorAll('.confirm-password'));
  let password_match_prompt = Array.from(document.querySelectorAll('.password-match-prompt'));
  let prompts = Array.from(document.querySelectorAll('.prompt'));
  let sign_up_forms = Array.from(document.querySelectorAll('.sign-up'))

  const prompt_message = 'Sign up below to create a CCF account, or log in to an existing CCF account. We are counting on you to build a better future for our cities.'
  const allInputs = [first_name, last_name, email, phone, password, confirm_password]

  errorMsg();

  for (let prompt of prompts) {
    prompt.textContent = prompt_message
  }

  console.log(sign_up_forms)
  for (let input of allInputs) {
    for (let inputDevice of input) {
      inputDevice.addEventListener('input', e => { distributeFormData(e.target, input) });
    }
  }

  for (let form of sign_up_forms) {
    form.addEventListener('submit', e => {
      if (password[0].value !== confirm_password[0].value) {
        alert('Passwords do not match');
        e.preventDefault();
      }
      else {
        alert('Registration was successful, welcome to CCF');
        form.submit();
      }
    })
  }

  function distributeFormData(current_form, forms) {
    for (let form of forms) {
      form.value = current_form.value;
    }
    errorMsg();
  }

  function passwordErrorColor() {
    for (let i = 0; i < 2; i++) {
      password_match_prompt[i].style.color = 'red';
      password[i].style.cssText = "outline-color: red;outline-style: solid;outline-width: 1px;";
      confirm_password[i].style.cssText = "outline-color: red;outline-style: solid;outline-width: 1px;";
    }
  }

  function invalidInput(message) {
    updateAllPrompts(message);
    passwordErrorColor();
  }

  function updateAllPrompts(message) {
    for (let i = 0; i < password_match_prompt.length; i++) {
      password_match_prompt[i].textContent = message;
    }
  }

  function errorMsg() {
    if (password[0].value.length === 0) {
      invalidInput("* Please enter a password");
    }
    else if (password[0].value !== confirm_password[0].value) {
      invalidInput("* Passwords do not match");
    }
    else {
      for (let i = 0; i < password_match_prompt.length; i++) {
        password_match_prompt[i].textContent = "Passwords match";
        password_match_prompt[i].style.color = 'green';
        password[i].style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
        confirm_password[i].style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
      }
    }
  }
}