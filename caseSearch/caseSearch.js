import { LightningElement } from 'lwc';
import getCases from '@salesforce/apex/CaseSearch.getCases';

const columns = [
    { label: 'Issue Id', fieldName: 'RecordLink', sortable: true, type: 'url', typeAttributes: { label: { fieldName: 'CaseNumber' } } },
    { label: 'Plan Name', fieldName: 'CaseNumber', sortable: true},
    { label: 'Importance', fieldName: 'Subject', sortable: true},
    { label: 'Importance Sub Reason', fieldName: 'Reason', sortable: true},
    { label: 'Member Id', fieldName: 'Status', sortable: true},
    { label: 'Member Name', fieldName: 'Priority', sortable: true},
    { label: 'Comment', fieldName: 'Comments', sortable: true},
    { label: 'Claim Id/Order Id', fieldName: 'AccountId', sortable: true},
    { label: 'Created By', fieldName: 'CreatedByName', sortable: true},
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date-local', sortable: true, 
        typeAttributes:{timeZone: "UTC", year: "numeric", month: "short"}}
];

export default class CaseSearch extends LightningElement {

    data = [];
    serverData = [];
    showData = false;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    
    handlePlanChange(){
        this.fetchCases();
    }

    fetchCases(){
        getCases({}).then(response =>{
            let recordArray = [];
            for(let i=0; i < response.length; i++){
                let recordData = {...response[i]};
                recordData.RecordLink = '/'+response[i].Id;
                recordData.CreatedByName = response[i].CreatedBy.Name;    
                recordArray.push(recordData);
            }
            this.data = recordArray;
            this.serverData = recordArray;
            this.showData = true;
        }).catch(error =>{
            this.showToast('Something went wrong. Please try later.','error','Error!');
        })
    }

    get options() {
        return [
            { label: 'All', value: 'All' },
            { label: 'Aetna Commercial - (11)', value: 'Aetna Commercial - (11)' },
            { label: 'Aetna Dental - (3)', value: 'Aetna Dental - (3)' },
            { label: 'Aetna Medicaid - (16)', value: 'Aetna Medicaid - (16)' },
            { label: 'Aetna Medical Supplement - (1)', value: 'Aetna Medical Supplement - (1)' },
            { label: 'Aetna Medicare - (38)', value: 'Aetna Medicare - (38)' },
            { label: 'Blue Shield California - (5)', value: 'Blue Shield California - (5)' },
            { label: 'Clear Health Alliance - (1)', value: 'Clear Health Alliance - (1)' }
        ];
    }

    handleSearch(event){
        let searchText = event.target.value;
        this.filterResults(searchText);
    }

    handleTierChange(){
        const inputFields = this.template.querySelectorAll(
            '.tier-input'
        );
        let tier1Checked = false;
        let tier2Checked = false;
        if (inputFields) {
            inputFields.forEach(field => {
                console.log('---------'+field.checked);
                console.log('---------'+field.label);
                if(field.label == 'Tier 1'){
                    tier1Checked = field.checked;
                }else if(field.label == 'Tier 2'){
                    tier2Checked = field.checked;
                }
            });
        }

        if((tier1Checked && tier2Checked) || (!tier1Checked && !tier2Checked)){
            this.filterResults(undefined);
        }else if(tier1Checked){
            this.filterResults('Tier 1');
        }else if(tier2Checked){
            this.filterResults('Tier 2');
        }
    }

    filterResults(filterText){
        let filteredResults = [];
        if(filterText){
            filteredResults = this.serverData.filter(record => JSON.stringify(record).toLowerCase().includes(filterText.toLowerCase()));
        }else{
            filteredResults = this.serverData;
        }
        console.log('----filteredResults-----'+filteredResults.length);
        this.data = [...filteredResults];
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    // Used to sort the 'Age' column
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }
}