var rarray= email.recipients.toLowerCase().split(",");
rarray.push(gs.getUser().getEmail());
var aList = "";
for (var i = 0; i < rarray.length; i++){
	var recipient = rarray[i].toString();
	var grUser = new GlideRecord('sys_user');
	grUser.addQuery('email', recipient);
	grUser.query();
	if (grUser.next()){
		aList = aList ? grUser.getValue('sys_id') + ',' + aList : grUser.getValue('sys_id') ;
	}
}

current.opened_by = gs.getUserID();
current.comments = "recebido de: " + email.origemail + "\n\n" + email.body_text.toString();
current.description = email.body_text.toString();
current.short_description = email.subject;
current.state = "1";
current.assignment_group = '2353ebb31b7c38109c51ed7be54bcb83'; // CSAA - CORE - Fertilizante
//current.assigned_to = "d7a3414f1b005610e90cfc4e4b4bcb41";
current.watch_list = aList;
//current.additional_assignee_list = aList;
//current.category = "inquiry";
//current.notify = 2;
//current.contact_type = "email";
//current.incident_state = IncidentState.NEW;
//current.business_service = 'bca8bf211bfc4610ca3b6280f54bcb9b'; //Ranni

if (email.body_text) {
    var bodyLines = email.body_text.split('\n');
    
    for (var i = 0; i < bodyLines.length; i++) {
        var line = bodyLines[i];
        if (line.toLowerCase().startsWith("grupo responsável:")) {
            var assignmentGroupValue = line.substring("Grupo Responsável:".length).trim();
            
            current.assignment_group = assignmentGroupValue;
            break;
        }
    }
}

if (email.importance != undefined) {
    if (email.importance.toLowerCase() == "high") {
        current.impact = 1;
        current.urgency = 1;
    }
}

current.insert();