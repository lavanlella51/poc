import { LightningElement, api, wire, track  } from 'lwc';
//import {makeCallOut}  from 'c/ssCompLwcApexContinuation';
//import getCachedData from '@salesforce/apex/OtchsMemberInfoCache.getCachedmembershipJson';


export default class OTCHSOrderCreationLwc extends LightningElement {

    cartItems = [];
    catalogItems = [];
    serverData = [];

    connectedCallback(){
        /*let items = [];
        for(let i=1; i < 5; i++){
            items.push({"label":"Placeholder Cart Item "+i, "amount" : 10*i, "id":i});
        }
        this.cartItems = items;*/
        this.getCatalogInfo();


        /*getCachedData({membershipId: '123'})
        .then(result => {
            console.log('---tile result---'+JSON.stringify(result))
            
          
        })
        .catch(error => {
            console.log('Comments --> error: '+error);
            console.log('Comments --> error: '+JSON.stringify(error.body.message));
        }); */
    }

    getCatalogInfo(){
        
            let reqBody = {
                "data": {
                    "id": "1",
                    "idType": "OTCHS_MEMBER_ID_TYPE",
                    "otchsMemberInfoInput": {
                    "benefitID": "251300028",
                    "caseStatus": "Y",
                    "claimOrderTypeEnum": "OTCHS_ORDER_ID",
                    "enrolled": true,
                    "entityID": "",
                    "formId": "251320",
                    "memberID": "otcaetna16",
                    "orderID": "14451733",
                    "paymentType": "TRUEINCOMM",
                    "planID": "13",
                    "planTypeIndicator": "",
                    "programCode": "PCA8-4905",
                    "zipCode": null
            }
                }
            };
            this.runApi(reqBody);
    }
    receivedData;
    runApi(requestBody){
      
    
            let parsedResponse = this.catalogInfo();
            console.log('----parsedResponse----'+JSON.stringify(parsedResponse));
            let records = parsedResponse.response.data.getOTCHSPortalCatalog;
            let recordMap = new Map();
            for(let i=0; i < records.length; i++){
                let key = records[i].departmentDscription;
                console.log('----key-----'+key);
                console.log('----has-----'+recordMap.has(key));
                let transformedObj = {...records[i]};
                transformedObj['serialNumber'] = i+1;
                transformedObj['isOutOfStock'] = records[i].availableBohQty === "0" ? true : false;
                transformedObj['disaleInput'] = records[i].recallInd == "Y" || records[i].availableBohQty === "0" ? false : false;
                transformedObj['maxQuantity'] = this.minValue(parseInt(records[i].availableBohQty), parseInt(records[i].limits));
                if (!recordMap.has(key)) {
                    console.log('----inside false-----');
                    recordMap.set(key, [transformedObj]);
                } else{
                    console.log('----inside true-----');
                    recordMap.get(key).push(transformedObj);
                }
            }
            let catalogs = [];
            for (let [key, value] of recordMap) {
                console.log(key + " is " + value);
                catalogs.push({"description":key, "tableData": value, "identifier":key.replaceAll(' ','')});
            }
            this.catalogItems = catalogs;
            this.serverData = catalogs;
        
    }

    handleAddCart(event){
        console.log('---input num---'+event.target.value);
        console.log('----'+event.target.dataset.skuid);
        console.log('----'+event.target.dataset.description);
        let tableRecords = this.catalogItems.find(item => item.identifier === event.target.dataset.description).tableData;
        console.log('-----sp-----'+JSON.stringify(tableRecords));
        let selectedProduct = tableRecords.find(item => item.skuId === event.target.dataset.skuid);
        let items = [...this.cartItems];

        let isExisting = false;
        for(let i=0; i < items.length; i++){
            if(items[i].id === selectedProduct.skuId){  
                isExisting = true;              
                items[i].quantity = event.target.value;
                items[i].total = (selectedProduct.price * event.target.value);
                break;    
            }
        }
        if(!isExisting){
            items.push({"label": selectedProduct.description, "amount" : selectedProduct.price, "total" : (selectedProduct.price * event.target.value), "id":selectedProduct.skuId, "quantity":event.target.value, "imageUrl": selectedProduct.imageUrl});
        }
        console.log('-----items-----'+JSON.stringify(items));
        this.cartItems = [...items];
    }

    handleCartDelete(event){
        console.log('---delete id---'+event.target.dataset.id);
        let items = [...this.cartItems];
        let index = items.findIndex(item => item.id === event.target.dataset.id);
        items.splice(index, 1);
        this.cartItems = [...items];
    }

    minValue(val1, val2){
        return Math.min(val1, val2);
    }

        handleSearch(event){
        console.log('---search value---'+event.target.value);
        if(event.target.value != '' && event.target.value != null){
            this.filterResults(event.target.value);
        }else{
            this.catalogItems = [...this.serverData];
        }
        
    }

    filterResults(filterText){
        let catalogs = [];
        for(let i=0; i < this.serverData.length; i++){
            let filteredResults = [];
            filteredResults = this.serverData[i].tableData.filter(record => JSON.stringify(record).toLowerCase().includes(filterText.toLowerCase()));       
            if(filteredResults.length > 0){
                catalogs.push({"description": this.serverData[i].description, "tableData": filteredResults, "identifier":this.serverData[i].description.replaceAll(' ','')});
            }
        }
        console.log('----catalogs-----'+JSON.stringify(catalogs));
        this.catalogItems = [...catalogs];
    }

    toggleSection(){
        
    }

    showModal
    handleAddressChange(){

        this.showModal = true;
    }

    validationMsg ='';
    showValidationMsg = false;
    isChangeAddress = true;
    @track addressValidationResult = {};
    @track editAddressObj = {};
    disableInfoBtn  = true;

    sendAddressValidationRequest(event){
      
        let requestBody = event.detail;

        makeCallOut('OTCHS_Address_APIGEE', JSON.stringify(requestBody)).then(result => {
            console.log('-----result-----'+JSON.stringify(result)) ;

            let value = JSON.parse(result.response);
            console.log('-----result-----'+value) ;

            if(value.statusCode == 'ERROR'){
                this.template.querySelector('c-bell-credit-card-toast-lwc').showToast('error', '<strong>System is not Responding</strong>',
                JSON.stringify(value.description), 'utility:warning', 10000);
            }
            else{
            this.addressValidationResult = value;
            }
            
        })
        .catch(error => {
            console.log('Comments --> error: ' + error);
            console.log('Comments --> error: ' + JSON.stringify(error.body.message));
        });

    }

   

  
    /* API response, reading the JSON and setting the values to properties */
    set jsonaddressValidationResponse(value) {
     //   console.log('----address validation response-----'+JSON.stringify(value));
        if(value.statusCode == 'ERROR'){
            this.template.querySelector('c-bell-credit-card-toast-lwc').showToast('error', '<strong>System is not Responding</strong>',
            JSON.stringify(value.description), 'utility:warning', 10000);
        }
        else{
        this.addressValidationResult = value;
        }
    }
    @track validatedAdressResponse = {};    
    handleSelectedAddress(event){
        console.log('-------handle selected address-------'+JSON.stringify(event.detail.address1));
       
        this.validatedAdressResponse = event.detail;
        this.disableInfoBtn = false;        
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.showModal = false;
       
    }

    handleCancelButtonKeydown(event){
        if(event.which == 9){
            event.preventDefault();
            if(event.shiftKey){
                if(this.template.querySelector(".child-panel")){
                    this.template.querySelector(".child-panel").focus();   
                }else if(this.template.querySelector(".last-input")){
                    this.template.querySelector(".last-input").focus();
                }
            }else{
                if(this.disableInfoBtn){
                    this.template.querySelector(".modalClose").focus();
                }else{
                    this.template.querySelector(".submitBtn").focus();
                }
            }
        }
    }

    handleCloseButtonKeydown(event){
        if(event.which == 9){
            event.preventDefault();
            if(event.shiftKey){
                if(this.disableInfoBtn){
                    this.template.querySelector(".closeBtn").focus();
                }else{
                    this.template.querySelector(".submitBtn").focus();
                }   
            }else{
                if(this.template.querySelector("lightning-input")){
                    this.template.querySelector("lightning-input").focus();
                }else if(this.template.querySelector(".child-panel")){
                    this.template.querySelector(".child-panel").focus();
                }
            }
        }
    }

    handleSubmitButtonKeydown(event){
        if(event.which == 9){
            event.preventDefault();
            if(event.shiftKey){
                this.template.querySelector(".closeBtn").focus();   
            }else{
                this.template.querySelector(".modalClose").focus();
            }
        }
    }

    handleSubmitOrder(){
        console.log('------handle submit order-----');
        
        let requestBody = {
                "data": {
                  "idType": "OTCHS_AGENT_ID_TYPE",
                  "addItemsToBasketInput": {
                    "benefitId": "m2hTKggHBZHQrjnRZOeodQ==",
                    "memberId": "94",
                    "planId": "17",
                    "items": [
                      {
                        "dcId": "AU",
                        "benefitUPC": "P38",
                        "idType": "OTCHS",
                        "id": "255045",
                        "qty": "1",
                        "shippingMethod": "500",
                        "stockLevel": "30"
                      }
                    ],
                    "orderType": "RETAIL_OTCHS_ORDER_ID_TYPE"
                  },
                  "id": "94",
                  "planId": "17"
              }

        };
       

        makeCallOut('OtchsAddBasket', JSON.stringify(requestBody)).then(result => {
            console.log('-----result-----'+JSON.stringify(result)) ;
            let value = JSON.parse(result.response);
            console.log('-----result-----'+value) ;
            this.makegetOrderdetailscall(result);
            
        })
        .catch(error => {
            console.log('Comments --> error: ' + error);
            console.log('Comments --> error: ' + JSON.stringify(error.body.message));
        });
    }

    makegetOrderdetailscall(result){
        console.log('-----makegetOrderdetailscall-----'+result);
        let responseofAddBasket = JSON.parse(result.response);  
        let requestBody = {
            "data": {
                "id": "",
                "idType": "OTCHS_AGENT_ID_TYPE",
                "planId": "",
                "orderFilterInput": {
                  "memberId": "94",
                  "planId": "17",
                  "pageName": "cart",
                  "orderLite": false,
                  "idType": "RETAIL_OTCHS_ORDER_ID_TYPE",
                  "benefitId": "m2hTKggHBZHQrjnRZOeodQ=="
                }
              }

        };
        makeCallOut('OtchsGetOrderDetails', JSON.stringify(requestBody)).then(result => {
            console.log('-----result-----'+JSON.stringify(result)) ;
            let value = JSON.parse(result.response);
            console.log('-----result-----'+value) ;

        })
        .catch(error => {
            console.log('Comments --> error: ' + error);    
            console.log('Comments --> error: ' + JSON.stringify(error.body.message));
        });
    }

    catalogInfo(){
        return {
            "response": {
            "statusCode": "0000",
            "statusDescription": "Success",
            "data": {
            "getOTCHSPortalCatalog": [
                {
                "availableBohQty": "0",
                "benefitUpc": "A1",
                "catalogSkuId": "446761",
                "compBrand": "CERAVE",
                "departmentDscription": "ACNE/HSC",
                "description": "AcneControlCleanser",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/446761.png",
                "limits": "99",
                "price": "11.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "446761",
                "unit": "8OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A2",
                "catalogSkuId": "462266",
                "compBrand": "CERAVE",
                "departmentDscription": "ACNE/HSC",
                "description": "AcneControlGel",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/462266.png",
                "limits": "99",
                "price": "16.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "462266",
                "unit": "1.35OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A3",
                "catalogSkuId": "428504",
                "compBrand": "CLEAN&CLEAR",
                "departmentDscription": "ACNE/HSC",
                "description": "AcneTreatmentGel",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/428504.png",
                "limits": "99",
                "price": "5.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "428504",
                "unit": "1OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A4",
                "catalogSkuId": "427735",
                "compBrand": null,
                "departmentDscription": "ACNE/HSC",
                "description": "BODYWASHFORROUGHANDBUMPYSKIN",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/427735.png",
                "limits": "99",
                "price": "12.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "427735",
                "unit": "10OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A5",
                "catalogSkuId": "504917",
                "compBrand": null,
                "departmentDscription": "ACNE/HSC",
                "description": "OVERNIGHTACNESPOTPATCHES",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/504917.png",
                "limits": "99",
                "price": "8.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "504917",
                "unit": "40CT"
                },
                {
                "availableBohQty": "7908",
                "benefitUpc": "A6",
                "catalogSkuId": "412505",
                "compBrand": "CVSHEALTH",
                "departmentDscription": "ACNE/HSC",
                "description": "PanoxylAcneFoamingWash",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/412505.png",
                "limits": "99",
                "price": "12.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "412505",
                "unit": "5.5OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A7",
                "catalogSkuId": "112280",
                "compBrand": "CERAVE",
                "departmentDscription": "ACNE/HSC",
                "description": "RefiningRetinolSerum",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/112280.png",
                "limits": "99",
                "price": "17.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "112280",
                "unit": "1OZ"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A20",
                "catalogSkuId": "455786",
                "compBrand": null,
                "departmentDscription": "ADULTCARE",
                "description": "ADULTCAREWIPES",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/455786.png",
                "limits": "99",
                "price": "4.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "455786",
                "unit": "42CT"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A21",
                "catalogSkuId": "816326",
                "compBrand": null,
                "departmentDscription": "ADULTCARE",
                "description": "ADULTCAREWIPES",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/816326.png",
                "limits": "99",
                "price": "15.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "816326",
                "unit": "96CT"
                },
                {
                "availableBohQty": "0",
                "benefitUpc": "A22",
                "catalogSkuId": "520577",
                "compBrand": null,
                "departmentDscription": "ADULTCARE",
                "description": "AdultCareWipes",
                "discountPercentDetails": "0.0",
                "imageUrl": "https://www-qa1.cvs.com/bizcontent/otchs/products/520577.png",
                "limits": "99",
                "price": "8.0",
                "recallInd": "N",
                "reorderInd": false,
                "skuId": "520577",
                "unit": "48CT"
                }
            ]
            }
        }
        }
    }

}
