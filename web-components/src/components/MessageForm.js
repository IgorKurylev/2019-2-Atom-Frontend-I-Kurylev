const template = document.createElement('template');
template.innerHTML = `
<style>
  :host{
    width: 100%;
    height: 100%;
    background-color: #f0e9e9;
    background-size: 50px;
    display: flex;
    flex-direction: column;
  }

  .header{
    background-color: #8E24AA;
    width: 100%;
    z-index: 1;
    box-shadow: 0 0 2px 0 #151716;
  }

  .content{
    width: 100%;
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    align-content: flex-end;
    z-index: 0;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  .messageWrap{
    display: block;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }

  message-box{
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px 20px 10px;
  }

  .bottom{
    width: 100%;
    z-index: 1;
  }
</style>
<div class="header">
  <dialog-info></dialog-info>
</div>
<div class="content">
  <div class="messageWrap"></div>
</div>
<div class="bottom">
  <form-input placeholder="Сообщение"></form-input>
</div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('form-input');
    this.$messages = this.shadowRoot.querySelector('.messageWrap');

    this.$input.addEventListener('onSubmit', this.onSendListener.bind(this));
  }

  connectedCallback() {
    this.renderPrevMessages();
  }

  renderPrevMessages() {
    const msgs = JSON.parse(localStorage.getItem('msgs'));
    if (msgs === null) {
      localStorage.setItem('msgs', JSON.stringify(new Array()));
    } else
    for(let i = 0; i < msgs.length; i++)
      this.renderMessage(msgs[i]);
  }

  renderMessage(messageBox) {
    let elem = document.createElement('message-box');
    elem = this.$messages.appendChild(elem);

    elem.setAttribute('messageID', messageBox.messageID);
    elem.setAttribute('owner', messageBox.owner);
    elem.setAttribute('text', messageBox.message);
    elem.setAttribute('time', messageBox.time);
  }

  newMessage(owner, text) {
    let msgs = JSON.parse(localStorage.getItem('msgs'));
    const time = new Date();
    const messageBox = {
      owner: ((owner) ? 'companion' : 'self'),
      message: text,
      time: time.getTime(),
    };
    msgs.push(messageBox);
    localStorage.setItem('msgs',JSON.stringify(msgs));
    this.renderMessage(messageBox);
  }

  onSendListener() {
    if (this.$input.value !== '') {
      this.newMessage(0, this.$input.value);
      this.$input.setAttribute('value', '');
    }
  }
}

customElements.define('message-form', MessageForm);
