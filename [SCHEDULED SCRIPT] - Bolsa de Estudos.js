var grBeneficios = new GlideRecord('x_aapas_benef_cios_beneficios');
grBeneficios.addEncodedQuery('tipo_beneficio=Bolsa de Estudos^status=em_andamento');
grBeneficios.query();
	while (grBeneficios.next()){
		var fimBeneficio = grBeneficios.data_fim_do_beneficio;
		if (fimBeneficio) {
				var diffDays = Math.floor((new GlideDateTime(fimBeneficio).getNumericValue() - new GlideDateTime().getNumericValue()) / (1000 * 60 * 60 * 24));
					if (diffDays <= 0 && diffDays > -120 ){
						grBeneficios.status = 'atestado_conclusao';	
					} else if (diffDays <= -120){
						grBeneficios.status = 'aguardando_certificado';	
					}
				grBeneficios.update();
			}	
		
	}