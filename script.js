const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('error-msg');

emailInput.addEventListener('input', () => {
  if (emailInput.validity.valueMissing) {
    errorMsg.textContent = 'Please enter a value';
  } else if (emailInput.validity.typeMismatch) {
    errorMsg.textContent = 'valid pattern';
  } else {
    errorMsg.textContent = '';
  }
});

form.addEventListener('click', (e) => {
  if (!emailInput.validity.valid) {
    e.preventDefault();
  }
});
