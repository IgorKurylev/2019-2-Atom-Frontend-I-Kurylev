const template = document.createElement('template');
template.innerHTML = `
<style>
  :host{
    border-width:1px;
    border-style: solid;
    border-image: linear-gradient(135deg, #e0dcdc, #e3e1e1) 1 2;
    background-color: #FFFFFF;
    display: flex;
    height: 60px;
    flex-direction: row;
  }
  
  input{
    color: #656668;
    outline: 0;
    flex: auto;
    height: 100%;
    font-size: 25px;
  }

  .clipButton{
    background: url(https://image.flaticon.com/icons/png/512/23/23188.png) no-repeat  center;
    background-size: 115%;
  }

  .sendButton{
    margin: 0 10px;
    background: url(https://static.thenounproject.com/png/373675-200.png) no-repeat  center;
    background-color:#FFFFFF;
    background-size: 100%;
  }

  .inputButton{
    height: 100%;
    width: 50px;
    cursor: pointer;
    opacity: 0.85;
    transition-duration: 0.15s;
  }

  .inputButton:hover{
    opacity: 1.0;
  }

  .inputButton:active{
    opacity: 0.6;
  }
</style>
<input/>
<div class="inputButton clipButton"></div>
<div class="inputButton sendButton"></div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
    this.$sendButton = this.shadowRoot.querySelector('.sendButton');
    this.$clipButton = this.shadowRoot.querySelector('.clipButton');
    this.$sendButton.addEventListener('click', this.onSubmit.bind(this));
    this.$clipButton.addEventListener('click', this.onclipButton.bind(this));
    this.$input.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit() {
    this.dispatchEvent(new Event('onSubmit'));
  }

  onclipButton() {
    this.dispatchEvent(new Event('clickclipButton'));
  }

  onKeyPress(event) {
    if (event.keyCode === 13) this.onSubmit();
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') this.$input.value = newValue;
    this.$input.setAttribute(name, newValue);
  }

  clearInput() {
    this.$input.value = '';
  }

  get value() {
    return this.$input.value;
  }
}

customElements.define('form-input', FormInput);
