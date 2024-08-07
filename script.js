class FormField {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init = () => {
    if (this.element.id === 'confirm') return;

    this.element.addEventListener('input', () => {
      this.validate();
    });
  };

  validate = () => {
    if (this.element.validity.valid) {
      displayErr(this.element, '');
      return;
    }

    const minLength = +this.element.getAttribute('minlength') ?? null;
    const maxLength = +this.element.getAttribute('maxlength') ?? null;
    const valueLength = this.element.value.length;

    let patternMsg = '';

    switch (this.element.id) {
      case 'zip':
        patternMsg =
          'must be five digits with optional space after third digit';
        break;
      case 'password':
        patternMsg =
          'password must be at least 8 charactors and contain one uppercase, one number and one special charactor';
    }

    switch (true) {
      case this.element.validity.valueMissing:
        displayErr(this.element, `${this.element.id} required`);
        break;
      case this.element.validity.typeMismatch:
        displayErr(this.element, 'enter a valid email');
        break;
      case this.element.validity.patternMismatch:
        displayErr(this.element, patternMsg);
        break;
      case this.element.validity.tooShort:
        displayErr(
          this.element,
          `too short, needs more ${minLength - valueLength} charactors`
        );
        break;
      case this.element.validity.tooLong:
        displayErr(
          this.element,
          `too long, ${this.element.id} should be ${maxLength} charactors`
        );
        break;
    }
  };
}

const username = new FormField(document.getElementById('username'));
const email = new FormField(document.getElementById('email'));
const country = new FormField(document.getElementById('country'));
const zip = new FormField(document.getElementById('zip'));
const password = new FormField(document.getElementById('password'));
const confirmPass = new FormField(document.getElementById('confirm'));

function displayErr(element, msg) {
  const errorMsgEl = element.nextElementSibling;
  errorMsgEl.textContent = msg;

  msg
    ? (element.style.outline = '2px solid #ce1212')
    : (element.style.outline = '2px solid #3b3b3b');
}

function handleMatch() {
  password.element.addEventListener('input', checkMatch);
  confirmPass.element.addEventListener('input', checkMatch);
}

function checkMatch() {
  const passValue = password.element.value;
  const confirmValue = confirmPass.element.value;
  const errMsg = confirmPass.element.nextElementSibling;

  if (passValue !== confirmValue && confirmValue) {
    errMsg.textContent = 'password not match';
    confirmPass.element.style.outline = '2px solid #ce1212';
    return;
  }

  errMsg.textContent = '';
  confirmPass.element.style.outline = '2px solid #3b3b3b';
}

handleMatch();

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    username.element.validity.valid &&
    email.element.validity.valid &&
    zip.element.validity.valid &&
    country.element.validity.valid &&
    password.element.validity.valid &&
    confirmPass.element.validity.valid
  ) {
    window.alert('Success');
    document
      .querySelectorAll('.input-field')
      .forEach((input) => (input.value = ''));
    return;
  }

  window.alert('Failed, Enter valid information');
});
