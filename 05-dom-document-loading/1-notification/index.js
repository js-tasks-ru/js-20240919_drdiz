// import { template } from "@babel/core";

export default class NotificationMessage {
   element 
        
   
  constructor(text = '', {    
    duration = 0,
    type = ''
  } = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  get createTemplate() {
    return `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">
          ${this.type}
        </div>
        <div class="notification-body">
         ${this.text}
        </div>
      </div>
    </div>`;

  } 

  render() {
    const div = document.createElement('div');
    div.innerHTML = this.createTemplate; 
    this.element = div.firstElementChild;     
  }

  show(elementTarget) {     

    if (NotificationMessage.activeNotification) {
        NotificationMessage.activeNotification.remove();
      }
       
    if (!elementTarget) {
        elementTarget = document.body
    }
    elementTarget.append(this.element);    
    setTimeout(() => this.remove(), this.duration);
    NotificationMessage.activeNotification = this;
  }
  
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();      
  }

}
