import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData =  newForm => {
    return axios
        .post('ConsumoE/consumoE',{
            NumeroEconomico: newForm.NumeroEconomico,
	    Mes: newForm.Mes,
            KilometrajePorMes: newForm.KilometrajePorMes,
            RendimientoDiesel: newForm.RendimientoDiesel,
            RendimientoAdblue: newForm.RendimientoAdblue,
            ConsumoMensualDiesel: newForm.ConsumoMensualDiesel,
            ConsumoMensualAdblue: newForm.ConsumoMensualAdblue
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export function downloadPDF(name){
    console.log(name);
    return axios
	.get('ConsumoE/fetch-pdf', { params: {PDF: name},responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                saveAs(pdfBlob, 'Factura'+name+'.pdf')
            })
}

export const getDataConsumoEmpresa = url => {
    return axios
	.post('ConsumoE/getData')
    .then(resp => {
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
	   console.log("Eror al cargar los datos de >: "+url+" error "+err);
       return {success:false}
    })
}

export const EPDF = newForm => {
	console.log(newForm)
	return axios
	.post('consumoE/ConsumoEPDF', {
		Mes: newForm.Mes,
		Año: newForm.Año
	})
            .then((res) => {
//                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
		console.log("Creado")
  //            saveAs(pdfBlob, 'Factura'+newForm.NumeroFactura+'.pdf')
            })
	.catch(err => {
		console.log(err)
	})
}

