public class CaseSearch {
    
    @AuraEnabled
    public static List<Case> getCases(){
        return [SELECT Id, CaseNumber, Status, Reason, Subject, Priority, Description, AccountId,
            CreatedDate, CreatedById, CreatedBy.Name, Comments, OTCHS_Tier__c FROM Case WHERE OTCHS_Tier__c != null];
    }

}