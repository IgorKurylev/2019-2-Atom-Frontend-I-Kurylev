const template = document.createElement('template');
template.innerHTML = `
<style>
  :host{
    height: 60px;
    display: flex;
    flex-direction: row;
  }
  .headerButton{
    height: 100%;
    width: 60px;
    margin: 0 15px;
    cursor: pointer;
  }
  .headerButton:hover{
    opacity: 4.0;
  }
  .headerButton:active{
    opacity: 0.6;
  }

  .nameContainer{
    flex: auto;
    height: 100%;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  .nameContainer .userName{
    height: 100%;
    padding-top: 5px;
  }
  .userName .name{
    font-size: 25px;
    color: #fbfbff;
  }
  .userName .status{
    font-size: 15px;
    color: #fbfbff;
  }

  .backButton{
    background: url(https://cdn2.iconfinder.com/data/icons/simple-circular-icons-line/84/Left_Carrot-512.png);
    height: 100%;
    background-size : 100% 100%;
    opacity: 0.25;
    transition-duration: 0.15s;
  }
  
  .searchButton{
    background: url(http://www.pngmart.com/files/8/Search-Button-PNG-Image-Free-Download.png);
    height: 100%;
    background-size : 100% 100%;
 
    opacity: 0.25;
    transition-duration: 0.15s;    
  }

  .optionsButton{
    background: url(https://image.flaticon.com/icons/png/512/15/15185.png);
    background-size : 100% 100%;
    height: 100%;
    opacity: 0.25;
    transition-duration: 0.15s;
  }
</style>
<div class="headerButton backButton"></div>
<div class="nameContainer">
  <div class="userName">
    <div class="name">Kurylev Igor</div>
    <div class="status">был в сети недавно</div>
    
  </div>
  
</div>
<div class="headerButton searchButton"></div>
<div class="headerButton optionsButton"></div>
`;

class DialogInfo extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dialog-info', DialogInfo);