window.onload = () => {
  let first_name = Array.from(document.querySelectorAll('.first-name'));
  let last_name = Array.from(document.querySelectorAll('.last-name'))
  let email = Array.from(document.querySelectorAll('.email'));
  let phone = Array.from(document.querySelectorAll('.phone'));
  let password_mobile = document.querySelector('#password-mobile');
  let confirm_password_mobile = document.querySelector('#confirm-password-mobile');
  let password_widescreen = document.querySelector('#password-widescreen');
  let confirm_password_widescreen = document.querySelector('#confirm-password-widescreen');
  let password_match_prompt = Array.from(document.querySelectorAll('.password-match-prompt'));
  let sign_up_forms = Array.from(document.querySelectorAll('.sign-up'))
  let prompts = Array.from(document.querySelectorAll('.prompt'));

  const prompt_message = 'Sign up below to create a CCF account, or log in to an existing CCF account. We are counting on you to build a better future for our cities.'

  for (let prompt of prompts) {
    prompt.textContent = prompt_message
  }

  errorMsg();
  console.log(first_name)
  for (let i = 0; i < 2; i++) {
    first_name[i].addEventListener('input', e => { distributeFormData(e.target, first_name) });
    last_name[i].addEventListener('input', e => distributeFormData(e.target, last_name));
    email[i].addEventListener('input', e => distributeFormData(e.target, email));
    phone[i].addEventListener('input', e => distributeFormData(e.target, phone));
  }
  password_mobile.addEventListener('input', e => distributePasswords(e, password_mobile, password_widescreen));
  password_widescreen.addEventListener('input', e => distributePasswords(e, password_mobile, password_widescreen));
  confirm_password_mobile.addEventListener('input', e => distributePasswords(e, confirm_password_mobile, confirm_password_widescreen));
  confirm_password_widescreen.addEventListener('input', e => distributePasswords(e, confirm_password_mobile, confirm_password_widescreen));

  for (let form of sign_up_forms) {
    form.addEventListener('submit', e => {
      if (password_mobile.value !== confirm_password_mobile.value) {
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
  }

  function passwordErrorColor() {
    for (let prompt of password_match_prompt) {
      prompt.style.color = 'red';
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
      password_match_prompt[i].textContent = message;
    }
  }

  function distributePasswords(event, mobile, widescreen) {
    mobile.value = event.target.value;
    widescreen.value = event.target.value;
    errorMsg();
  }

  function errorMsg() {
    if (password_mobile.value.length === 0 && password_widescreen.value.length === 0) {
      invalidInput("* Please enter a password");
    }
    else if (password_mobile.value !== confirm_password_mobile.value || password_widescreen.value !== confirm_password_widescreen.value) {
      invalidInput("* Passwords do not match");
    }
    else {
      for (let prompt of password_match_prompt) {
        prompt.textContent = "Passwords match";
        prompt.style.color = 'green';
      }
      password_mobile.style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
      confirm_password_mobile.style.cssText = "outline-color: blue;outline-style: solid;outline-width: 1px;";
    }
  }
}