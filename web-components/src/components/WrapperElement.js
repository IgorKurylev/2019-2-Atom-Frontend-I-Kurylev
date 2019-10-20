const template = document.createElement('template');
template.innerHTML = `
<style>
  .wrap{
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .wrap *{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }
  message-form{
    z-index: 1;
    display: none;
  }

  message-form.apear{
    display: flex;
  }

  message-form.disapear{
    display: none;
    
  }

</style>
<div class="wrap">
  <dialog-list></dialog-list>
  <message-form></message-form>
</div>
`;

class WrapperElement extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$wrap = this.shadowRoot.querySelector('.wrap');
    this.$dialogList = this.shadowRoot.querySelector('dialog-list');
    this.$chatForm = this.shadowRoot.querySelector('message-form');
  }

  connectedCallback() {
    this.loadDialog();
    this.addEventOpenDialog();
  }

  loadDialog() {
    let dialogList = [];
    dialogList = JSON.parse(localStorage.getItem('dialogList'));

    if (dialogList != null && dialogList.length) { this.$dialogList.$content.innerHTML = ''; }

    let lastTime = 0;

    for (const dialogID of Object.keys(dialogList)) {
      let messageList = JSON.parse(localStorage.getItem(`dialogID_${dialogID}`));
      if (messageList === null) { messageList = {}; }

      const lastMessageID = Math.max(...Object.keys(messageList));

      let countOfUnreadMessages = null;

      for (const value of Object.values(messageList)) {
        if (value.owner !== 'self' && value.status === 'new') { countOfUnreadMessages++; }
      }

      const dialogInfo = messageList[lastMessageID];
      dialogInfo.unreadMessages = countOfUnreadMessages;
      dialogInfo.dialogName = this.$dialogList.dialogName(dialogID);
      dialogInfo.dialogAvatar = this.$dialogList.dialogAvatar(dialogID);
      delete dialogInfo.owner;

      const messageTime = dialogInfo.time;
      if (messageTime > lastTime) {
        this.$dialogList.renderDialog(dialogID, dialogInfo);
      } else {
        this.$dialogList.renderDialog(dialogID, dialogInfo, false);
      }
      lastTime = messageTime;
    }
  }

  openDialog(dialogID) {
    this.currentDialog = dialogID;
    this.$chatForm.setAttribute('dialogid', dialogID);

    this.$chatForm.classList.remove('disapear');
    this.$chatForm.classList.add('apear');

    this.$chatForm.renderPrevMessages();
    this.$chatForm.$header.addEventListener('clickBackButton', () => this.closeDialog());
    this.$chatForm.$input.addEventListener('onSubmit', () => this.onSubmitMessage(this.currentDialog));
  }

  closeDialog() {
    this.$chatForm.classList.remove('apear');
    this.$chatForm.classList.add('disapear');
  }

  onSubmitMessage(dialogID) {
    const inputLine = this.$chatForm.$input.value;
    if (!inputLine) { return false; }
    this.$chatForm.$input.clearInput();

    let messageList = {};
    messageList = JSON.parse(localStorage.getItem(`dialogID_${dialogID}`));
    if (messageList === null) messageList = {};

    let lastMessageID = Math.max(...Object.keys(messageList));

    const currentMessage = messageList[++lastMessageID] = {
      text: inputLine,
      time: (new Date()).getTime(),
      owner: 'self',
      status: 'sending',
    };

    localStorage.setItem(`dialogID_${dialogID}`, JSON.stringify(messageList));
    this.$chatForm.renderMessage(lastMessageID, currentMessage, true);

    const dialogInfo = currentMessage;
    dialogInfo.dialogAvatar = this.$dialogList.dialogAvatar(dialogID);
    dialogInfo.dialogName = this.$dialogList.dialogName(dialogID);

    this.$dialogList.dialogUpdate(dialogID, dialogInfo);
  }

  addEventOpenDialog() {
    if (this.addedEvent === undefined) { this.addedEvent = []; }

    let dialogList = [];
    dialogList = JSON.parse(localStorage.getItem('dialogList'));

    dialogList.forEach((dialogID) => {
      if (!(dialogID in this.addedEvent)) {
        const elem = this.$dialogList.$content.querySelector(`dialog-model[dialogid="${dialogID}"]`);
        elem.addEventListener('click', () => this.openDialog(dialogID));
        this.addedEvent.push(dialogID);
      }
    });
  }
}

customElements.define('wrapper-component', WrapperElement);
