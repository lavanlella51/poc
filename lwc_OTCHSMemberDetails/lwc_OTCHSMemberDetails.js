import { LightningElement, api } from 'lwc';

export default class Lwc_OTCHSMemberDetails extends LightningElement {

    benefitInformation = {};
    memberInformation = {};

    @api
    get apiResponse() {
        return this.memberInformation;
    }

    set apiResponse(value) {
        this.transformResponse(value);    
    }

    transformResponse(value){
        if(value && value.data && value.data.otchsMemberDashBoard){
            let address = '';
            for(let i=0; i < value.data.otchsMemberDashBoard.address.length; i++){
                if(value.data.otchsMemberDashBoard.address[i].line && value.data.otchsMemberDashBoard.address[i].line.length > 0){
                    address += value.data.otchsMemberDashBoard.address[i].line[0]
                }
                if(value.data.otchsMemberDashBoard.address[i].line && value.data.otchsMemberDashBoard.address[i].line.length > 1){
                    address += ' ' +value.data.otchsMemberDashBoard.address[i].line[1]
                }
                if(value.data.otchsMemberDashBoard.address[i].city){
                    address += ' ' + value.data.otchsMemberDashBoard.address[i].city;
                }
                if(value.data.otchsMemberDashBoard.address[i].state){
                    address += ' ' + value.data.otchsMemberDashBoard.address[i].state;
                }
                if(value.data.otchsMemberDashBoard.address[i].postalCode){
                    address += ' ' + value.data.otchsMemberDashBoard.address[i].postalCode;
                }
            }
            let transformedResponse = {...value.data.otchsMemberDashBoard};
            transformedResponse['memAddress'] = address;
            transformedResponse['emailAddress'] = value.data.otchsMemberDashBoard.otchsRegisteredEmailInfo.email;
            transformedResponse['optionalEmailAddress'] = value.data.otchsMemberDashBoard.otchsRegisteredEmailInfo.optionalEmail;
            
            this.memberInformation = transformedResponse;

        }else{
            this.memberInformation = [];
        }
    }
    
    toggleMemberSection(){
        this.template.querySelector('.member-section').classList.toggle("slds-is-open");
    }

    toggleBenefitSection(){
        this.template.querySelector('.benefit-section').classList.toggle("slds-is-open");
    }

    toggleAgentSection(){
        this.template.querySelector('.agent-section').classList.toggle("slds-is-open");
    }

    showStatusPopover(){
        this.template.querySelector('.status-popover').classList.remove("slds-hide");
        this.template.querySelector('.status-popover').classList.add("slds-show");
    }

    hideStatusPopover(){
        this.template.querySelector('.status-popover').classList.add("slds-hide");
        this.template.querySelector('.status-popover').classList.remove("slds-show");
    }

    showBenefitPopover(){
        this.template.querySelector('.benefit-popover').classList.remove("slds-hide");
        this.template.querySelector('.benefit-popover').classList.add("slds-show");
    }

    hideBenefitPopover(){
        this.template.querySelector('.benefit-popover').classList.add("slds-hide");
        this.template.querySelector('.benefit-popover').classList.remove("slds-show");
    }

    showHouseHoldTable(){
        this.template.querySelector('.household-table-section').classList.toggle("slds-hide");
    }

    handleRadioChange(event){
        console.log('-------'+event.detail.checked);
        console.log('-------'+event.target.label);
    }

    get benefitOptions(){
        let benefitOptionArray = [];
        let benefits = this.memberInformation.benefits;

        for (var key in benefits) {
            console.log(benefits[key].benefitId);
            if(key === '0'){
                this.benefitInformation =  benefits[key];   
            }
            benefitOptionArray.push({
                "label" : benefits[key].benefitDescription,
                "value" : benefits[key].benefitId,
                "checked" : key === '0'
            });
        }
        console.log('----benefitOptionArray---'+JSON.stringify(benefitOptionArray));
        return benefitOptionArray;
    }
}