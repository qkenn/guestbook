class FormField {
  constructor(element) {
    this.element = element;
    this.validityState = element.validity;
    this.valid = false;
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
      this.valid = true;
      handleErr(this.element, '');
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
          'password must contain one uppercase, one number and one special charactor';
    }

    switch (true) {
      case this.validityState.valueMissing:
        handleErr(this.element, `${this.element.id} required`);
        break;
      case this.validityState.typeMismatch:
        handleErr(this.element, 'enter a valid email');
        break;
      case this.validityState.patternMismatch:
        handleErr(this.element, patternMsg);
        break;
      case this.validityState.tooShort:
        handleErr(
          this.element,
          `too short, needs more ${minLength - valueLength} charactors`
        );
        break;
      case this.validityState.tooLong:
        handleErr(
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
