class FormField {
  constructor(element) {
    this.element = element;
    this.validityState = element.validity;
    this.valid = false;
    this.init();
  }

  init = () => {
    this.element.addEventListener('input', () => {
      this.validate();
    });
  };

  validate = () => {
    if (this.element.validity.valid) {
      this.valid = true;
      handleErrors(this.element, '');
      return;
    }

    switch (true) {
      case this.validityState.valueMissing:
        handleErrors(this.element, 'required');
        break;
      case this.validityState.typeMismatch:
        handleErrors(this.element, 'invalid email');
        break;
      case this.validityState.patternMismatch:
        handleErrors(this.element, 'invalid pattern');
        break;
      case this.validityState.tooShort:
        handleErrors(this.element, 'too short');
        break;
      case this.validityState.tooLong:
        handleErrors(this.element, 'too long');
        break;
    }
  };
}

function handleErrors(element, msg) {
  const errorMsgEl = element.nextElementSibling;
  errorMsgEl.textContent = msg;

  msg
    ? (element.style.outline = '2px solid #ce1212')
    : (element.style.outline = '2px solid #3b3b3b');
}

const username = new FormField(document.getElementById('username'));
const email = new FormField(document.getElementById('email'));
const country = new FormField(document.getElementById('country'));
const zip = new FormField(document.getElementById('zip'));
const password = new FormField(document.getElementById('password'));
const confirm = new FormField(document.getElementById('confirm'));
