const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('error-msg');

emailInput.addEventListener('input', () => {
  if (emailInput.validity.valueMissing) {
    errorMsg.textContent = 'email required';
  } else if (emailInput.validity.typeMismatch) {
    errorMsg.textContent = 'enter a valid email';
  } else {
    errorMsg.textContent = '';
  }

  if (!emailInput.validity.valid) {
    emailInput.style.outline = '2px solid red';
  } else {
    emailInput.style.outline = '2px solid green';
  }
});

form.addEventListener('click', (e) => {
  if (!emailInput.validity.valid) {
    e.preventDefault();
  }
});
