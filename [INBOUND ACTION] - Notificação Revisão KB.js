var grKb = new GlideRecord('kb_knowledge');
grKb.addEncodedQuery('kb_knowledge_base=4019c45a1b3a0154e90cfc4e4b4bcb4a^active=true');
grKb.query();
	while (grKb.next()){
		var valid = grKb.u_data_prox_revisao;
		if (valid) {
				var diffDays = Math.floor((new GlideDateTime(valid).getNumericValue() - new GlideDateTime().getNumericValue()) / (1000 * 60 * 60 * 24));
					if (diffDays <= 90){
						gs.eventQueue('aa.kb',grKb,grKb.u_envolvidos);
          }
			}	
		
	}