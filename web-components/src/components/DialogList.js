const template = document.createElement('template');
template.innerHTML = `
<style>
  :host{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    position: relative;
  }

  .header{
    background-color: #8E24AA;
    width: 100%;
    height: 60px;
    z-index: 1;
    box-shadow: 0 0 2px 0 #151716;
    flex-shrink: 0;
    padding-left: 15px;
  }

  .header .hamburger{
    width: 60px;
    height: 100%;
    display: inline-block;
    margin-right: 20px;
    background: url(https://cdn4.iconfinder.com/data/icons/circles-1/32/364-01-512.png) no-repeat;
    background-size: 100%;
    float: left;
    opacity: 0.25;
    transition-duration: 0.15s;
  }

  .header .hamburger:hover{
    opacity: 4.0;
  }

  .header .hamburger:active{
    opacity: 0.6;
  }


  .header .formName{
    line-height: 60px;
    float: left;
    color: #FFFFFF;
 
  }

  .content{
    flex: auto;
    background: url(static/images/backgroundMain.png);
    overflow-y: auto;
    z-index: 0;
  }

  .noneMessages{
    width: 100%;
    text-align: center;
    padding-top: 50%;
    color: #4C4C4D;
  }

  .dialogWrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto; 
  }

  .buttonNew{
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    opacity: 0.7;
    background-color: #ffd500;
    border-radius: 30px;
    transition-duration: 0.4s;
    cursor: pointer;
    animation: pulse 3s infinite;    
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    }
    70% {
        box-shadow: 0 0 0 30px rgba(204,169,44, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    }
  }

  .buttonNew:hover{
    opacity: 1.0;
  }

  .pen{
    background: url(https://cdn4.iconfinder.com/data/icons/design-4/100/14-512.png) no-repeat center center;
    background-size: 30px;
    width: 30px;
    height: 60px;
    margin: auto;
  }
  
  dialog-model{
    display: block;
    overflow: hidden;
  }
  
</style>
<div class="header">
  <div class="hamburger"></div>
  <a class="formName">Сообщения</a>
</div>
<div class="content">
  <div class="noneMessages">Сообщений пока нет (</div>
</div>
<div class="buttonNew">
  <div class="pen"></div>
</div>
`;

class DialogList extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$content = this.shadowRoot.querySelector('.content');
  }

  dialogUpdate(dialogID, dialogInfo) {
    const elem = this.$content.querySelector(`dialog-model[dialogid="${dialogID}"]`);
    this.$content.insertBefore(elem, this.$content.firstChild);
    elem.dialogRender(dialogInfo);
  }

  renderDialog(dialogID, dialogInfo, intoFirst = true) {
    let elem = document.createElement('dialog-model');

    if (intoFirst) {
      elem = this.$content.insertBefore(elem, this.$content.firstChild);
    } else { elem = this.$content.appendChild(elem); }

    elem.setAttribute('dialogid', dialogID);
    elem.dialogRender(dialogInfo);
  }

  dialogAvatar() {
    return 'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-4.jpg';
  }

  dialogName() {
    return 'Igor Kurylev';
  }
}

customElements.define('dialog-list', DialogList);
