import { html, render } from 'lit-html';

class PasswordChecker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.password = this.getAttribute('password');
    this.clave = this.getAttribute('password');
    this.tryID = this.getAttribute('tryID');
    console.log("Password", this.password);
    console.log("Clave", this.clave);
    console.log("TryID", this.tryID);
  }

  get password() { return this._password; }

  set password(value) {
    this._password = value;
    this.setAttribute('password', value);
    this.update();
  }

  update() {
    render(this.template(), this.shadowRoot, {eventContext: this});
  }

  isValid(passwd) { 
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
    return re.test(passwd);
  }

  template() {
    return html`
      <span>Your password is <strong>${this.isValid(this.password) ? 'valid 👍' : 'INVALID 👎'}</strong></span>
      ${this.isValid(this.password) ? 
        html`<div>Strength: <progress value=${this.password.length-3} max="5"</progress></div>` : ``}`;

  }
}

customElements.define('password-checker', PasswordChecker);