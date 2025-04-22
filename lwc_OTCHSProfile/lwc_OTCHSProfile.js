import { LightningElement } from 'lwc';

export default class Lwc_OTCHSProfile extends LightningElement {

    cartItems = [];
    catalogItems = [];
    serverData = [];

    connectedCallback(){
        let items = [];
        for(let i=1; i < 5; i++){
            items.push({"label":"Placeholder Cart Item "+i, "amount" : 10*i, "id":i});
        }
        this.cartItems = items;

        let records = this.catalogInfo.response.data.getOTCHSPortalCatalog;
        let recordMap = new Map();
        for(let i=0; i < records.length; i++){
            let key = records[i].departmentDscription;
            console.log('----key-----'+key);
            console.log('----has-----'+recordMap.has(key));
            let transformedObj = {...records[i]};
            transformedObj['serialNumber'] = i+1;
            transformedObj['isOutOfStock'] = records[i].availableBohQty === "0" ? true : false;
            transformedObj['disaleInput'] = records[i].recallInd == "Y" || records[i].availableBohQty === "0" ? true : false;
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
            catalogs.push({"description":key, "tableData": value});
        }
        this.catalogItems = catalogs;
        this.serverData = catalogs;
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
                catalogs.push({"description": this.serverData[i].description, "tableData": filteredResults});
            }
        }
        console.log('----catalogs-----'+JSON.stringify(catalogs));
        this.catalogItems = [...catalogs];
    }

    get catalogInfo(){
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