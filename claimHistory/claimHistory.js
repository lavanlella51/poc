import { LightningElement } from 'lwc';

export default class ClaimHistory extends LightningElement {

    toggleSection(){
       this.template.querySelector('.slds-section').classList.toggle("slds-is-open");
    }
}