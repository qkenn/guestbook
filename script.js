// class Form {
//   constructor() {
//     this.form = document.getElementById('form');
//     this.submitBtn = document.getElementById('submit');

//     this.username = document.getElementById('username');
//     this.email = document.getElementById('email');
//     this.zip = document.getElementById('zip');
//     this.password = document.getElementById('password');
//     this.confirm = document.getElementById('confirm');
//   }

//   handleInput = () => {
//     this.username.addEventListener('input', () => {
//       this.validateUsername();
//     });
//   };

//   validateUsername = () => {
//     const validityState = this.username.validity;

//     switch (true) {
//       case validityState.valueMissing:
//         console.log('value missing');
//         break;
//     }
//   };
// }

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
      console.log('input is valid');

      return;
    }

    switch (true) {
      case this.validityState.valueMissing:
        console.log('value missing');
        break;
      case this.validityState.typeMismatch:
        console.log('wrong type');
        break;
      case this.validityState.patternMismatch:
        console.log('not match the pattern');
        break;
      case this.validityState.tooShort:
        console.log('too short');
        break;
      case this.validityState.tooLong:
        console.log('too long');
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
