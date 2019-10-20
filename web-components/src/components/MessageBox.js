const template = document.createElement('template');
template.innerHTML = `
<style>
  li{
    list-style: none;
  }
  .messageBox{
    display: inline-block;
    background-color: #e5cfe6;
    
    padding: 10px;
    text-align: justify;
    max-width: 60%;
    word-break: break-all;
  }
  .messageBox .time{
    width: 100%;
    text-align: right;
    margin-top: 5px;
    color: #656668;
  }
  .self{
    float: right;
    background-color: #f9c5fa !important;
    color: #77787A !important;
    border-width:1px;
    border-style: solid;
    border-image: linear-gradient(135deg, #e0dcdc, #e3e1e1) 1 2;
  }
  .self .time{
    color: #77787A !important;
  }
  .self:after{
    clear: both;
  }
</style>
<li>
  <div class="messageBox">
    <div class="text"></div>
    <div class="time"></div>
  </div>
</li>
`;

class MessageBox extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$wrap = this.shadowRoot.querySelector('.messageBox');
    this.$text = this.shadowRoot.querySelector('.text');
    this.$time = this.shadowRoot.querySelector('.time');
  }

  static get observedAttributes() {
    return ['messageID', 'owner', 'text', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'messageID':
        this.$wrap.attr('messageID', newValue);
        break;

      case 'owner':
        this.$wrap.classList.add(newValue);
        break;

      case 'text':
        this.$text.innerText = newValue;
        break;

      case 'time':
        let date = new Date(Number(newValue));
        date = date.toString().split(' ')[4].split(':');
        this.$time.innerText = `${date[0]}:${date[1]}`;
        break;

      default:
        break;
    }
  }
}

customElements.define('message-box', MessageBox);
