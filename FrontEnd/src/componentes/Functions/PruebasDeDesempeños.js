import axios from 'axios'

export const sendDataP = newForm => {
	return axios
		.post('pruebasdesempeno/pruebasdedesempeno',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: "2020",
			NombredeEmpresaOperadora: newForm.NombredeEmpresaOperadora,
			Ruta: newForm.Ruta,
			Fecha: newForm.Fecha,
			NombredeEncargado: newForm.NombredeEncargado,
			NombredeRevision: newForm.NombredeRevision,
			NombreVistoBueno: newForm.NombreVistoBueno
		})
		.then(response => {
			console.log('..')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}

export const getDataPruebas = url => {
    return axios
    .post('pruebasdesempeno/getData')
    .then(resp => {
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        return {success:false}
    })
}