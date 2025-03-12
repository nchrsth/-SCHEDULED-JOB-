var query = 'cat_item.sys_idSTARTSWITHb04389911b1ff010ca3b6280f54bcbc8^sys_created_onONThis year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()';
var gr = new GlideRecord('sc_req_item'); // consulta na tabela de requisições
gr.addEncodedQuery(query); //filtra a consulta baseada na variável 'query'
gr.query();//executa a consulta
var dados = []; //cria uma variável para receber os registros
while (gr.next()) { // enquanto houver registros que atendam o filtro executa
    var varSets = JSON.parse(gr.variables.investimentos_capex); //para cada registro parsifica o variable set 
      varSets   
    varSets.forEach(function(e) { //para cada item do variable set 
        var body = e;
        body.numero = gr.number.toString()
      body.criado_por = gr.sys_created_by.getDisplayValue()
        dados.push(body)
    })
}


var attachment = new GlideSysAttachment();

//set up inputs
var rec = new GlideRecord('sc_cat_item');
rec.get('b04389911b1ff010ca3b6280f54bcbc8'); //sys_id do item de catálogo do Capex
var fileName = 'capex.csv';
var contentType = 'text/csv';
var content = '';
for(var i=0; i< dados.length; i++){
    var Obj = dados[i];
    if(i==0){
        var column = [];
        for(var key in Obj){
            column.push(key.toString());
        }
        content += column.join(';') + "\n";
    }
    var values = [];
    for(var key in Obj){
        values.push(Obj[key].toString().replaceAll("\r\n"," ").replaceAll("\n"," ").replaceAll(";",","));
    }
    content += values.join(';') + "\n";
}


var agr = attachment.write(rec, fileName, contentType, content);

gs.info('The attachment sys_id is: ' + agr);