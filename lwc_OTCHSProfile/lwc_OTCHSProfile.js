import { LightningElement } from 'lwc';

export default class Lwc_OTCHSProfile extends LightningElement {

    cartItems = [];
    categories = [];
    tableData = [];

    connectedCallback(){
        let items = [];
        for(let i=1; i < 5; i++){
            items.push({"label":"Placeholder Cart Item "+i, "amount" : 10*i, "id":i});
        }
        this.cartItems = items;
        
        this.categories = [
            {"label":"Allergy Remedies", "value":"1"},
            {"label":"Adult Care", "value":"2"},
            {"label":"Acne/HSC", "value":"3"},
            {"label":"Printing and Typesetting", "value":"4"}
        ];

        this.tableData = [
            {"Id" : "1", "Product" : "Nasal Mist", "Quantity" : "1", "UPC" : "", "SKU" : "", 
                "Unit" : "", "Compare" : "", "Price" : "10,000", "CatalogSKU" : "10,000"},
            {"Id" : "2", "Product" : "Cetirizine 10 mg Softgel", "Quantity" : "2", "UPC" : "", "SKU" : "", 
                "Unit" : "", "Compare" : "", "Price" : "10,000", "CatalogSKU" : "10,000"},
                
        ];
    }
}