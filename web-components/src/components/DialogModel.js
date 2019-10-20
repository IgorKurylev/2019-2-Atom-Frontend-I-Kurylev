const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dialog{
    display: flex;
    padding: 10px 10px 0 10px;
    width: 100%;
    height: 90px;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .dialog{
    background-color: #fcf2f2;
  }

  .dialog:hover{
    background-color: #f5e1e1;
  }

  .dialogAvatar{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    margin: 0 12px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .dialogInfo{
    flex: auto;
    height: 100%;
    padding: 12px;
    width: calc(100% - 108px);
  }

  .dialogName{
    margin-bottom: 10px;
  }

  .dialogName a{
    
    font-weight: bold;
  }

  .lastMessage{
    color: #939395;
    display: flex;
  }

  .lastMessage p{
    flex: auto;
    overflow: hidden;
    margin-right: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .messageStatus{
    height: 18px;
    width: 18px;
    display: inline-block;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .sending{
    background: url(https://www.freeiconspng.com/uploads/blue-tick-icon-1.png) no-repeat center center;
    background-size: 18px;
  }

  .sent{
    background: url(https://www.clipartmax.com/png/middle/28-289588_whatsapp-double-ticks-clip-art-at-clker-double-check-whatsapp-png.png) no-repeat center center;
    background-size: 18px;
    background-color: #fcf2f2;
  }

  .read{
    background: url(http://tipograff.com.ua/wp-content/uploads/check-mark-blue-25.png);
    background-size: 18px;
  }

  .newMessages{
    background-color: #8E24AA;
    border-radius: 10px;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    color: #FFFFFF;
    padding: 3px 8px;
    width: unset;
    height: unset;
  }
</style>
<div class="dialog">
  <div class="dialogAvatar"></div>
  <div class="dialogInfo">
    <div class="dialogName">
      <a></a>
    </div>
    <div class="lastMessage">
      <p></p>
      <span class="messageStatus"></span>
    </div>
  </div>
</div>
`;

class ObjectDialog extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$userName = this.shadowRoot.querySelector('.dialogName a');
    this.$userAvatar = this.shadowRoot.querySelector('.dialogAvatar');
    this.$lastMessage = this.shadowRoot.querySelector('.lastMessage p');
    this.$messageStatus = this.shadowRoot.querySelector('.messageStatus');
  }

  dialogRender(dialogInfo) {
    this.dialogInfo = dialogInfo;
    this.$userName.innerText = this.dialogInfo.dialogName;
    this.$lastMessage.innerText = this.dialogInfo.text;
    this.$userAvatar.setAttribute('style', `background: url(${this.dialogInfo.dialogAvatar}) no-repeat center center; background-size: cover;`);
    this.statusRender(this.dialogInfo.status, this.dialogInfo.unreadMessages);
  }

  statusRender(dialogStatus, unreadMessages = '!') {
    switch (dialogStatus) {
      case 'new':
        this.$messageStatus.className = 'messageStatus';
        this.$messageStatus.classList.add('newMessages');
        this.$messageStatus.innerText = unreadMessages;
        break;

      default:
        this.$messageStatus.className = 'messageStatus';
        this.$messageStatus.classList.add(dialogStatus);
        this.$messageStatus.innerText = '';
        break;
    }
  }

  static get observedAttributes() {
    return ['dialogid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dialogID = newValue;
  }
}

customElements.define('dialog-model', ObjectDialog);
