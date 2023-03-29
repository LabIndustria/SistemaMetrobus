const path = require('path')
const express = require('express')
const reffa = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

var pdfName = ''

const Reffa = require('../Models/REFFA.js')
reffa.use(cors())

process.env.SECRET_KEY = 'secret'

reffa.post('/reffaT',async (req, res) => {
    console.log("Datos generales REFFA")
	console.log("Alo "+req.body.Kilometraje)
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		FechaMantePreventivo: req.body.FechaUltimoMantenimiento,
		Kilometraje: req.body.Kilometraje,
		VerificacionVehicular: req.body.Verificacion,
		ConsumoPromedioDispCalc: req.body.ConsumoPromedio,
		UltFechaFumigacion: req.body.FechaFumigacion,
		NotaExtra: req.body.NotaExtra,
		PersonaElaboro: req.body.Nombre,
		Fecha: req.body.Fecha
	}
	Reffa.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Fecha: req.body.Fecha
        }
    })
    .then(reffa => {
        if (!reffa) {
            Reffa.create(formData)
            .then(reffa => {
		        console.log("Registrado.")
				res.send({ status: 'Registrado!' })
            })
            .catch(err => {
				console.log(err)
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'El numero economico ya existe' })
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// reffa.post('/ReffaPDF'),(req,res) => {
//     console.log(req)
//     Reffa.findOne({
//         where:{
//             NumeroEconomico: "ECO121"
//         }
//     })
//     .then(obj1 =>{
//         console.log(obj1)
//     })

// }

module.exports = reffa
