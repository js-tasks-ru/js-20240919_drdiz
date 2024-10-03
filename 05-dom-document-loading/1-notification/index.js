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
    this.createElement();
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

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = this.createTemplate; 
    this.element = div.firstElementChild;     
  }

  show(elementTarget = document.body) {     

    if (NotificationMessage.activeNotification) {
        NotificationMessage.activeNotification.remove();
      }       
    
    elementTarget.append(this.element);    
    this.timerId = setTimeout(() => this.remove(), this.duration);
    NotificationMessage.activeNotification = this;
  }
  
  remove() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.element.remove();
  }
  destroy() {
    this.remove();      
  }

}
