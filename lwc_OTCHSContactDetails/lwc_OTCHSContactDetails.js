import { LightningElement, api } from 'lwc';
import getContact from '@salesforce/apex/OTCHSContactController.getContact'

export default class Lwc_OTCHSContactDetails extends LightningElement {
    
    @api recordId;
    contactRecord;

    connectedCallback(){
        this.getContactData();
    }

    getContactData(){
        getContact({recordId: this.recordId}).then(response =>{
            this.contactRecord = response;
            console.log('----contact-----'+JSON.stringify(response));
        }).catch(error =>{
            console.error('Error in getting the accounts', error.body.message);
        })
    }

}