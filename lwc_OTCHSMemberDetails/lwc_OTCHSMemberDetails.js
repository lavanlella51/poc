import { LightningElement } from 'lwc';

export default class Lwc_OTCHSMemberDetails extends LightningElement {

    benefitInformation = {};
    memberInformation = {};

    connectedCallback(){
        this.memberInformation = this.apiMemberInfo.result;
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

    showHouseHoldTable(){
        this.template.querySelector('.household-table-section').classList.toggle("slds-hide");
    }

    handleRadioChange(event){
        console.log('-------'+event.detail.checked);
        console.log('-------'+event.target.label);
    }

    get apiMemberInfo(){
        return {
          "success": true,
          "statusCode": 200,
          "message": "Success",
          "result": {
                "memberEntityId": "0",
                "alternativeId": "",
                "memberId": "otcaetna10",
                "firstName": "AetnaNational10",
                "lastName": "OTCHS",
                "middleNameInitial": "X",
                "dob": "2000-02-14",
                "address_1": "ONE CVS DRIVE",
                "address_2": "MC 1180",
                "city": "WOONSOCKET",
                "stateCode": "RI",
                "zipcode": "02895",
                "status": null,
                "statusReason": null,
                "phoneNumber": "4017702500",
                "cellPhone": "5555551212",
                "year": "2025",
                "email": "otcaetna10@cvs.com",
                "optionalEmail": "optout",
                "verified": "Yes",
                "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                "url": null,
                "lockedDt": "",
                "fraudDt": "",
                "planActInd": "Y",
                "opAddrChngInd": "Y",
                "specialHandlingDsc": "White Glove-UPS and Box",
                "paymentUrl": "https://sycuriolab.cvshealth.com/semafone/service/capture/getSycurioIncommTokenFragment.html",
                "ordHistList": [
                
            ],
                "claimHistList": [
                
            ],
                "commentHistList": [
                
            ],
                "oneCardInd": "",
                "ncpdpInd": "N",
                "shipMethodInd": "B",
                "deliverRegularDate": "2025-04-15",
                "deliverHazmatDate": "2025-04-15",
                "deliverWhitegloveDate": "2025-04-12",
                "dateRegistered": "2024-10-21",
                "datePasswordChanged": "",
                "dateResentLink": "",
                "paymentType": "OTC",
                "sponsorId": "",
                "sponsorName": "",
                "hdPobInd": "N",
                "benefits": [
                  {
                        "benefitId": "250600687",
                        "benefitAmount": 100.0,
                        "benefitPlan": "H0628-003-000",
                        "benefitTypeInd": "O",
                        "logoFilename": "logo_aetna.png",
                        "canOrder": false,
                        "orderCount": 0,
                        "catalogId": 0,
                        "catalogPdf": "250600.pdf",
                        "invoiceLob": "Aetna National North Quarterly",
                        "status": "Enabled",
                        "statusReason": "By valid date",
                        "periodFactor": "Quarterly",
                        "maxOrders": "U",
                        "rolloverInd": "No",
                        "rolloverAmt": 0.0,
                        "faqPdf": "25_faq_aetna.pdf",
                        "storeInd": "Y",
                        "storeLimitInd": "Y",
                        "memberServicePhone": "1-833-570-6670",
                        "ttyPhone": null,
                        "otchsDedicatedPhone": "1-844-428-8147",
                        "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                        "ncpdpInd": "N",
                        "premiumPackageCd": "0001",
                        "shipMethodInd": "B",
                        "nextPeriodDate": null,
                        "dcId": "OR",
                        "sponsorId": "",
                        "sponsorName": "",
                        "benefitDescription": "OTC MEDICARE 1",
                        "enrollDate": "2019-01-01",
                        "disenrollDate": "2025-01-11",
                        "catalogDescription": "Aetna Medicare",
                        "subgroup": "Ohio/Kentucky",
                        "segment": "000",
                        "totalOrders": "3",
                        "url": "https://www.cvs.com/benefits",
                        "paymentType": "OTC",
                        "memberReferenceId": null,
                        "cardSerialNumber": null,
                        "hdPobInd": "N",
                        "planTypeInd": "O",
                        "programCd": "",
                        "adminAlias": "",
                        "year": 2025,
                        "purseOptInInd": "",
                        "flexcardOptInDatetime": "",
                        "lastBenefitUpdate": "2025-01-10 12:14:02",
                        "benefitStartDt": "2025-01-01",
                        "purseName": "",
                        "cardMemberId": "",
                        "catalogInd": "Y",
                        "household": "",
                        "householdInd": "No",
                        "agentMessage": "One time courtesy claim can be processed for a missed benefit period, and another to reship an order that appears delivered but member claims non-receipt. Remember, these claims are to be processed by the MS team. Leave an open comment under MST-Member Outreach.",
                        "balanceAmt": 52.0      
            },
            {
                        "benefitId": "250600688",
                        "benefitAmount": 100.0,
                        "benefitPlan": "H0628-003-000",
                        "benefitTypeInd": "O",
                        "logoFilename": "logo_aetna.png",
                        "canOrder": false,
                        "orderCount": 0,
                        "catalogId": 0,
                        "catalogPdf": "250600.pdf",
                        "invoiceLob": "Aetna National North Quarterly",
                        "status": "Enabled",
                        "statusReason": "By valid date",
                        "periodFactor": "Quarterly",
                        "maxOrders": "U",
                        "rolloverInd": "No",
                        "rolloverAmt": 0.0,
                        "faqPdf": "25_faq_aetna.pdf",
                        "storeInd": "Y",
                        "storeLimitInd": "Y",
                        "memberServicePhone": "1-833-570-6670",
                        "ttyPhone": null,
                        "otchsDedicatedPhone": "1-844-428-8147",
                        "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                        "ncpdpInd": "N",
                        "premiumPackageCd": "0001",
                        "shipMethodInd": "B",
                        "nextPeriodDate": null,
                        "dcId": "OR",
                        "sponsorId": "",
                        "sponsorName": "",
                        "benefitDescription": "OTC MEDICARE 2",
                        "enrollDate": "2019-01-01",
                        "disenrollDate": "2025-01-11",
                        "catalogDescription": "Aetna Medicare",
                        "subgroup": "Ohio/Kentucky",
                        "segment": "000",
                        "totalOrders": "3",
                        "url": "https://www.cvs.com/benefits",
                        "paymentType": "OTC",
                        "memberReferenceId": null,
                        "cardSerialNumber": null,
                        "hdPobInd": "N",
                        "planTypeInd": "O",
                        "programCd": "",
                        "adminAlias": "",
                        "year": 2025,
                        "purseOptInInd": "",
                        "flexcardOptInDatetime": "",
                        "lastBenefitUpdate": "2025-01-10 12:14:02",
                        "benefitStartDt": "2025-01-01",
                        "purseName": "",
                        "cardMemberId": "",
                        "catalogInd": "Y",
                        "household": "",
                        "householdInd": "No",
                        "agentMessage": "One time courtesy claim can be processed for a missed benefit period, and another to reship an order that appears delivered but member claims non-receipt. Remember, these claims are to be processed by the MS team. Leave an open comment under MST-Member Outreach.",
                        "balanceAmt": 52.0      
            }    ,
            {
                        "benefitId": "250600689",
                        "benefitAmount": 100.0,
                        "benefitPlan": "H0628-003-000",
                        "benefitTypeInd": "O",
                        "logoFilename": "logo_aetna.png",
                        "canOrder": false,
                        "orderCount": 0,
                        "catalogId": 0,
                        "catalogPdf": "250600.pdf",
                        "invoiceLob": "Aetna National North Quarterly",
                        "status": "Enabled",
                        "statusReason": "By valid date",
                        "periodFactor": "Quarterly",
                        "maxOrders": "U",
                        "rolloverInd": "No",
                        "rolloverAmt": 0.0,
                        "faqPdf": "25_faq_aetna.pdf",
                        "storeInd": "Y",
                        "storeLimitInd": "Y",
                        "memberServicePhone": "1-833-570-6670",
                        "ttyPhone": null,
                        "otchsDedicatedPhone": "1-844-428-8147",
                        "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                        "ncpdpInd": "N",
                        "premiumPackageCd": "0001",
                        "shipMethodInd": "B",
                        "nextPeriodDate": null,
                        "dcId": "OR",
                        "sponsorId": "",
                        "sponsorName": "",
                        "benefitDescription": "OTC MEDICARE 3",
                        "enrollDate": "2019-01-01",
                        "disenrollDate": "2025-01-11",
                        "catalogDescription": "Aetna Medicare",
                        "subgroup": "Ohio/Kentucky",
                        "segment": "000",
                        "totalOrders": "3",
                        "url": "https://www.cvs.com/benefits",
                        "paymentType": "OTC",
                        "memberReferenceId": null,
                        "cardSerialNumber": null,
                        "hdPobInd": "N",
                        "planTypeInd": "O",
                        "programCd": "",
                        "adminAlias": "",
                        "year": 2025,
                        "purseOptInInd": "",
                        "flexcardOptInDatetime": "",
                        "lastBenefitUpdate": "2025-01-10 12:14:02",
                        "benefitStartDt": "2025-01-01",
                        "purseName": "",
                        "cardMemberId": "",
                        "catalogInd": "Y",
                        "household": "",
                        "householdInd": "No",
                        "agentMessage": "One time courtesy claim can be processed for a missed benefit period, and another to reship an order that appears delivered but member claims non-receipt. Remember, these claims are to be processed by the MS team. Leave an open comment under MST-Member Outreach.",
                        "balanceAmt": 52.0      
            }    ,
            {
                        "benefitId": "250600680",
                        "benefitAmount": 100.0,
                        "benefitPlan": "H0628-003-000",
                        "benefitTypeInd": "O",
                        "logoFilename": "logo_aetna.png",
                        "canOrder": false,
                        "orderCount": 0,
                        "catalogId": 0,
                        "catalogPdf": "250600.pdf",
                        "invoiceLob": "Aetna National North Quarterly",
                        "status": "Enabled",
                        "statusReason": "By valid date",
                        "periodFactor": "Quarterly",
                        "maxOrders": "U",
                        "rolloverInd": "No",
                        "rolloverAmt": 0.0,
                        "faqPdf": "25_faq_aetna.pdf",
                        "storeInd": "Y",
                        "storeLimitInd": "Y",
                        "memberServicePhone": "1-833-570-6670",
                        "ttyPhone": null,
                        "otchsDedicatedPhone": "1-844-428-8147",
                        "planMessage": "2025 Catalogs will be mailed to all Aetna Medicare members starting mid December - January 15; Review comment history before requesting a new catalog after January 15th.",
                        "ncpdpInd": "N",
                        "premiumPackageCd": "0001",
                        "shipMethodInd": "B",
                        "nextPeriodDate": null,
                        "dcId": "OR",
                        "sponsorId": "",
                        "sponsorName": "",
                        "benefitDescription": "OTC MEDICARE 4",
                        "enrollDate": "2019-01-01",
                        "disenrollDate": "2025-01-11",
                        "catalogDescription": "Aetna Medicare",
                        "subgroup": "Ohio/Kentucky",
                        "segment": "000",
                        "totalOrders": "3",
                        "url": "https://www.cvs.com/benefits",
                        "paymentType": "OTC",
                        "memberReferenceId": null,
                        "cardSerialNumber": null,
                        "hdPobInd": "N",
                        "planTypeInd": "O",
                        "programCd": "",
                        "adminAlias": "",
                        "year": 2025,
                        "purseOptInInd": "",
                        "flexcardOptInDatetime": "",
                        "lastBenefitUpdate": "2025-01-10 12:14:02",
                        "benefitStartDt": "2025-01-01",
                        "purseName": "",
                        "cardMemberId": "",
                        "catalogInd": "Y",
                        "household": "",
                        "householdInd": "No",
                        "agentMessage": "One time courtesy claim can be processed for a missed benefit period, and another to reship an order that appears delivered but member claims non-receipt. Remember, these claims are to be processed by the MS team. Leave an open comment under MST-Member Outreach.",
                        "balanceAmt": 52.0      
            }        
            ]  
        }
        };
    }

    get benefitOptions(){
        let benefitOptionArray = [];
        let memberInfo = this.apiMemberInfo.result.benefits;
        for (var key in memberInfo) {
            console.log(memberInfo[key].benefitId);
            if(key === '0'){
                this.benefitInformation =  memberInfo[key];   
            }
            benefitOptionArray.push({
                "label" : memberInfo[key].benefitDescription,
                "value" : memberInfo[key].benefitId,
                "checked" : key === '0'
            });
        }
        console.log('----benefitOptionArray---'+JSON.stringify(benefitOptionArray));
        return benefitOptionArray;
    }
}