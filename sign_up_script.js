window.onload = () => {
  let inputs = Array.from(document.querySelectorAll('input'));
  let sign_up_forms = Array.from(document.querySelectorAll('.sign-up'));
  let first_name = Array.from(document.querySelectorAll('.first-name'))
  let last_name = Array.from(document.querySelectorAll('.last-name'))
  let email = Array.from(document.querySelectorAll('.email'))
  let phone = Array.from(document.querySelectorAll('.phone'))
  let password_mobile = document.querySelector('#password-mobile');
  let confirm_password_mobile = document.querySelector('#confirm-password-mobile');
  let password_widescreen = document.querySelector('#password-widescreen')
  let confirm_password_widescreen = document.querySelector('#confirm-password-widescreen')
  let password_match_prompt = Array.from(document.querySelectorAll('.password-match-prompt'));

  errorMsg();
  
  
  password_mobile.addEventListener('input', updatePasswordDetails)
  password_widescreen.addEventListener('input', updatePasswordDetails)
  confirm_password_mobile.addEventListener('input', updateConfirmPasswordDetails);
  confirm_password_widescreen.addEventListener('input', updateConfirmPasswordDetails);

  for (let form of sign_up_forms) {
    form.addEventListener('submit', e => {
      if (password_mobile.value !== confirm_password_mobile.value) {
        alert('Passwords do not match')
        e.preventDefault()
      }
      else {
        alert('Registration was successful, welcome to CCF')
        form.submit();
      }
    })
  }

  function passwordErrorColor() {
    for (let prompt of password_match_prompt) {
      prompt.style.color = 'red'
    }
    password_mobile.style.cssText = "outline-color: red;outline-style: solid;outline-width: 1px;";
    confirm_password_mobile.style.cssText = "outline-color: red;outline-style: solid;outline-width: 1px;";
  }

  function invalidInput(message) {
    updateAllPrompts(message);
    passwordErrorColor();
  }

  function updateAllPrompts(message) {
    for (let i = 0; i < password_match_prompt.length; i++) {
      password_match_prompt[i].textContent = message
    }
  }

  function updatePasswordDetails() {
    password_mobile.value = this.value;
    password_widescreen.value = this.value;
    errorMsg();
  }

  function updateConfirmPasswordDetails() {
    confirm_password_mobile.value = this.value;
    confirm_password_widescreen.value = this.value;
    errorMsg();
  }

  function errorMsg() {
    if (password_mobile.value.length === 0 && password_widescreen.value.length === 0) {
      invalidInput("* Please enter a password");
    }
    else if (password_mobile.value !== confirm_password_mobile.value || password_widescreen.value !== confirm_password_widescreen.value) {
      invalidInput("* Passwords do not match")
    }
    else {
      for (let prompt of password_match_prompt) {
        prompt.textContent = "Passwords match"
        prompt.style.color = 'green'
      }
      password_mobile.style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
      confirm_password_mobile.style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
    }
  }
}