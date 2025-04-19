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

    get apiMemberInfo(){
        return {
            "statusCode": "0000",
            "statusDescription": "Success",
            "data": {
              "otchsMemberDashBoard": {
                "OptedEmail": "optout",
                "address": [
                {
                "changeReasonCode": null,
                "city": "WOONSOCKET",
                "country": null,
                "county": null,
                "firstName": null,
                "lastName": null,
                "line": [
                "ONE CVS DRIVE",
                "MC 1180"
                ],
                "postalCode": "02895",
                "state": "RI",
                "type": null,
                "use": "Home"
}
                ],
                "addressChangeIndicator": "Y",
                "benefitDesc": null,
                "benefits": [
                {
                "agentMessage": "One time courtesy claim can be processed for a missed benefit period, and another to reship an order that appears delivered but member claims non-receipt. Remember, these claims are to be processed by the MS team. Leave an open comment under MST-Member Outreach.",
                "balanceAmount": 52,
                "benefitAmount": 100,
                "benefitDescription": "OTC MEDICARE",
                "benefitPlan": "H0628-003-000",
                "benefitUpdateDate": null,
                "benefitUrl": null,
                "canOrder": null,
                "cardDisplayNumber": null,
                "cardMemberId": "",
                "catalogInd": null,
                "catalogPdf": "250600.pdf",
                "dcId": "OR",
                "description": null,
                "effectiveDate": null,
                "expirationDate": null,
                "faqHeader": null,
                "faqPdf": "25_faq_aetna.pdf",
                "flexCardOptinDate": "",
                "flexCardOptinIndicator": "",
                "householdInd": "test",
                "id": "250600687",
                "idType": "OTCHS_BENEFIT_ID_TYPE",
                "invoiceLob": "Aetna National North Quarterly",
                "logoFileName": "logo_aetna.png",
                "maxOrders": "U",
                "memberServicePhone": "1-833-570-6670",
                "nextPeriodDate": null,
                "orderCount": "0",
                "ordersRemaining": null,
                "otchsDedicatedPhone": "1-844-428-8147",
                "otchsMemberStatus": {
                    "disEnrollDate": "2025-01-11",
                    "enrollDate": "2019-01-01",
                    "status": "Enabled",
                    "statusReason": "By valid date"
                },
                "typeIndicator": "O",
                "subgroup": "Ohio/Kentucky",
                "storeLimitInd": null,
                "storeInd": "Y",
                "status": null,
                "startDate": null,
                "segment": "000",
                "rollOverIndicator": "No",
                "rollOverAmt": 0,
                "referenceId": null,
                "purseName": "",
                "programCode": "",
                "premiumPackageCd": "0001",
                "planTypeInd": null,
                "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                "periodFactor": "Quarterly",
                "paymentType": "OTC"
                }
                ],
                "cellPhone": "5555551212",
                "dateOfBirth": "2000-02-14",
                "entityId": null,
                "firstName": "AetnaNational10",
                "lastName": "OTCHS",
                "middleNameInitial": "X",
                "otchsRegisteredEmailInfo": {
                "email": "otcaetna10@cvs.com",
                "pwdChangedDate": "",
                "registeredDate": "2024-10-21",
                "resentLinkDate": ""
                },
                "phoneNumber": "4017702500",
                "planId": null,
                "specialInstruction": "White Glove-UPS and Box",
                "supportPhone": null
                }
            }
        }
    }

}