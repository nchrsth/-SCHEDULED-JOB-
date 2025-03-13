var grLicencas = new GlideRecord('x_aapas_licen_as_licencas');
grLicencas.query();
	while (grLicencas.next()){
		var venc = grLicencas.vencimento;
		var prazo = Math.floor(grLicencas.prazo_para_vencimento);
		if (venc) {
				var diffDays = Math.floor((new GlideDateTime(venc).getNumericValue() - new GlideDateTime().getNumericValue()) / (1000 * 60 * 60 * 24));
				grLicencas.dias_para_vencimento = diffDays;
					if (diffDays > prazo){
						grLicencas.status = 'Ok';	
					} else if (diffDays < 0){
						grLicencas.status = 'Vencido';	
					} else if (diffDays <= prazo && diffDays > 0){
						grLicencas.status = 'Renovar';	
					}
				grLicencas.update();
			}	
		
	}