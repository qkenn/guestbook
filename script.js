class FormField {
  constructor(element) {
    this.element = element;
    this.id = element.id;
    this.validityState = element.validity;
    this.valid = false;
    this.init();
  }

  init = () => {
    if (this.id === 'confirm') return;

    this.element.addEventListener('input', () => {
      this.validate();
    });
  };

  validate = () => {
    if (this.element.validity.valid) {
      this.valid = true;
      handleErr(this.element, '');
      return;
    }

    switch (true) {
      case this.validityState.valueMissing:
        handleErr(this.element, 'required');
        break;
      case this.validityState.typeMismatch:
        handleErr(this.element, 'invalid email');
        break;
      case this.validityState.patternMismatch:
        handleErr(this.element, 'invalid pattern');
        break;
      case this.validityState.tooShort:
        handleErr(this.element, 'too short');
        break;
      case this.validityState.tooLong:
        handleErr(this.element, 'too long');
        break;
    }
  };
}

const username = new FormField(document.getElementById('username'));
const email = new FormField(document.getElementById('email'));
const country = new FormField(document.getElementById('country'));
const zip = new FormField(document.getElementById('zip'));
const password = new FormField(document.getElementById('password'));
const confirm = new FormField(document.getElementById('confirm'));

function handleErr(element, msg) {
  const errorMsgEl = element.nextElementSibling;
  errorMsgEl.textContent = msg;

  msg
    ? (element.style.outline = '2px solid #ce1212')
    : (element.style.outline = '2px solid #3b3b3b');
}

function handleMatch() {
  password.element.addEventListener('input', checkMatch);
  confirm.element.addEventListener('input', checkMatch);
}

function checkMatch() {
  const passValue = password.element.value;
  const confirmValue = confirm.element.value;
  const errMsg = confirm.element.nextElementSibling;

  if (passValue !== confirmValue && confirmValue) {
    errMsg.textContent = 'password not match';
    confirm.element.style.outline = '2px solid #ce1212';
    return;
  }

  confirm.valid = true;
  errMsg.textContent = '';
  confirm.element.style.outline = '2px solid #3b3b3b';
}

handleMatch();
