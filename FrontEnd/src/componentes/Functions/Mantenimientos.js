import axios from 'axios'

export const sendDataM = newForm => {
	return axios
		.post('mantenimiento/mantenimientos',{
			EmpresaOperadora: newForm.EmpresaOperadora,
			NumeroEconomico: newForm.NumeroEconomico,
			Dia: newForm.Dia,
			Mes: newForm.Mes,
			Año: newForm.Año,
			TipoMantenimiento: newForm.TipoMantenimiento,
			LecturaOdometroAnterior: newForm.LecturaOdometroAnterior,
			LecturaOdometro: newForm.LecturaOdometro,
			Observaciones: newForm.Observaciones,

		})
		.then(response => {
			console.log('..')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}
