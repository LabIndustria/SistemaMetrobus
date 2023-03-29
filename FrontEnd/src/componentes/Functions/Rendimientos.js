import axios from 'axios'

export const sendData = newForm => {
	return axios
		.post('Rendimientos/rendimientos',{
			NumeroEconomico: newForm.NumeroEconomico,
			Kilometraje: newForm.Kilometraje,
			ConsumoDiesel: newForm.ConsumoDiesel,
			RendimientoDiesel: newForm.RendimientoDiesel,
			Periodo: newForm.Periodo,
			Año: newForm.Año
		})
		.then(response => {
			console.log('...')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}

export const getDataRendimientos = url => {
    return axios
    .post('Rendimientos/getData')
    .then(resp => {
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        return {success:false}
    })
}

export const RPDF = newForm => {
        console.log("Creando PDF")
        return axios
        .post('Rendimientos/RendimientosPDF',  {
                Año: newForm.Año,
                Periodo: newForm.Mes
        })
            .then((res) => {
                        console.log("...")
            })
        .catch(err => {
                console.log(err)
        })
}
