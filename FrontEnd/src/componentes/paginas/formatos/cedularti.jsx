import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TrainIcon from '@material-ui/icons/TrainOutlined'; //Agregado para la parte de validaciones 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { formRegisterA, formRegisterCompleto } from '../../Functions/RevTecnicaInicial'
import { formRegisterE } from '../../Functions/RTIEstado'
import { formRegisterF } from '../../Functions/RTIFuncionamiento'
import SignatureCanvas from 'react-signature-canvas'
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";   
import {IoReturnUpBack} from "react-icons/io5";
import {IoReturnUpForwardOutline} from "react-icons/io5"; 

/* function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Proyecto Metrobus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} 

<TableRow>
  <TableCell component='th' scope='row'>
  	Firma
  </TableCell>

  <TableCell align='left'>
  	<SignatureCanvas penColor='blue' backgroundColor = "#ededed"
			canvasProps={{ width: 500, height: 200, className: 'sigCanvas'}} ref={FirmaRef} />
  </TableCell>

</TableRow>

*/

const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#7D2027',
          color: theme.palette.common.white,
          size:  'small',
        
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            
          },
        },
      }))(TableRow);
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          
        },
        table: {
          minWidth: "100%",
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
      }));

export default function CedulaRTI() {
	const history = useHistory();
  	const classes = useStyles();

  	const [Mensajes, setMensajes] = useState([]); //Const para los mensajes agregada para validaciones

  	function getCurrentDate(separator='')
	{
		let newDate = new Date()
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
	 	return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
	}

	const fecha = String(getCurrentDate())
	const [forms, setForms] = useState({})
	const [forms2, setForms2] = useState({})
	const [forma, setForma] = useState({})
	const [imageURL,setImageURL] = useState(null)
	const SeñalizaciónRef = useRef()
	
	const EmpresaOperadora = useRef('')
	const Año = useRef('')
	const MotorElectrico = useRef('')
	const Carroceria = useRef('')
	const LecturaOdometro = useRef('')
	const Modelo = useRef('')
	const Motor = useRef('')
	const Chasis = useRef('')
	const Transmision =  useRef('')
	const TipoAutobus = useRef('')
	const FechaRef = useRef('')
	const SeñalInteriorExterior = useRef('')
	const Economico = useRef('')
	const LaminacionPinturaExterior = useRef('')
	const Defensas = useRef('')
	const ChasisGancho = useRef('')
	const Puertas = useRef('')
	const CristalesParabrisas = useRef('')
	const Limpiaparabrisas = useRef('')
	const CristalesVentanillas = useRef('')
	const CristalMedallon = useRef('')
	const Espejos = useRef('')
	const Visera = useRef('')
	const AsientoConductor = useRef('')
	const AsientosPasajeros = useRef('')
	const ElementosSujección = useRef('')
	const Escotillas = useRef('')
	const Extintores = useRef('')
	const Botiquin = useRef('')
	const AccesoriosSeguridad = useRef('')
	const Pisos = useRef('')
	const Articulacion = useRef('')
	const Motor2 = useRef('')
	const AireComprimido = useRef('')
	const Hibrido = useRef('')
	const Transmision2 = useRef('')
	const Enfriamiento = useRef('')
	const Ignicion = useRef('')
	const Tablero = useRef('')
	const Electrico = useRef('')
	const LetreroRuta = useRef('')
	const Claxon = useRef('')
	const SistemaDesempañante = useRef('')
	const SistemaAire = useRef('')
	const Extractores = useRef('')
	const AlumbradoEI = useRef('')
	const Frenos = useRef('')
	const CajaDireccion = useRef('')
	const Suspensión = useRef('')
	const TuboEscape = useRef('')
	const SistemaRecaudo = useRef('')
	const SistemaTelematica = useRef('')
	const TanqueCombustible = useRef('')
	const NeumaticoSisControl = useRef('')
	const Observaciones = useRef('')
	const FirmaRef = useRef({})

	const errorEmpresaO = useRef('') //Const agregada para validaciones
	const errorAño = useRef('')
	const errorMotorE = useRef('')
	const errorCarroc = useRef('')
	const errorOdometro = useRef('')
	const errorModelo = useRef ('')
	const errorMotor = useRef('')
	const errorChasis = useRef('')
	const errorTransmi = useRef('')
	const errorTipoAuto = useRef('')


	const HandleRadioChange = async(event) =>{
			let name = event.target.name
			let value = event.target.value
			await setForms(forms => ({ ...forms,[name]: value }))
	    	if(name.indexOf("-F") >= 0)
	    	{
	    		name = name.substring(0,name.indexOf("-F"))
	    		await setForms2(forms2 => ({ ...forms2,[name]: value}))
	    	}
	    	else
	    	{
	    		await setForms(forms => ({ ...forms,[name]: value}))
	    	}
	}

	const Validaciones = (event) => {

	    const nombre = event.currentTarget.id;
	    const valor = event.currentTarget.value;

	    if(nombre=='EmpresaOperadora'){
	      if(!/^[A-Za-z0-9áéíóúÁÉÍÓÚ\-'\s]+$/i.test(valor)){
	        errorEmpresaO.current = "La empresa operadora no admite caracteres especiales.";
	        EmpresaOperadora.current.error=true;
	        setMensajes("");
	      }
	      else{
	        errorEmpresaO.current = "";
	        EmpresaOperadora.current.error=false;
	        setMensajes("a");
	      		}
	      }		

		else if(nombre=='Modelo'){
	      if(!/^[A-Za-z0-9áéíóúÁÉÍÓÚ'\s]+$/i.test(valor)){
	        errorModelo.current = "El modelo no admite caracteres especiales.";
	        Modelo.current.error=true;
	        setMensajes("b");
	      }
	      else{
	        errorModelo.current = "";
	        Modelo.current.error=false;
	        setMensajes("c");
	      }
	    }

	    else if(nombre=='Año'){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorAño.current = "El año solo admite números.";
	        Año.current.error=true;
	        setMensajes("d");
	      }
	      else{
	        errorAño.current = "";
	        Año.current.error=false;
	        setMensajes("e");
	      }
	    }

	    else if(nombre=='Motor'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorMotor.current = "El motor no admite caracteres especiales.";
	        Motor.current.error=true;
	        setMensajes("f");
	      }
	      else{
	        errorMotor.current = "";
	        Motor.current.error=false;
	        setMensajes("g");
	      }
	    }

	    else if(nombre=='MotorE'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorMotorE.current = "El motor eléctrico no admite caracteres especiales.";
	        MotorElectrico.current.error=true;
	        setMensajes("h");
	      }
	      else{
	        errorMotorE.current = "";
	        MotorElectrico.current.error=false;
	        setMensajes("i");
	      }
	    }

	    else if(nombre=='Chasis'){
	      if(!/^[A-Za-z0-9]+$/i.test(valor)){
	        errorChasis.current = "El chasis no admite caracteres especiales.";
	        Chasis.current.error=true;
	        setMensajes("j");
	      }
	      else{
	        errorChasis.current = "";
	        Chasis.current.error=false;
	        setMensajes("k");
	      }
	    }

	    else if(nombre=='Carroceria'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorCarroc.current = "La carrocería no admite caracteres especiales.";
	        Carroceria.current.error=true;
	        setMensajes("l");
	      }
	      else{
	        errorCarroc.current = "";
	        Carroceria.current.error=false;
	        setMensajes("m");
	      }
	    }

	    else if(nombre=='Transmision'){
	      if(!/^[A-Za-z0-9]+$/i.test(valor)){
	        errorTransmi.current = "La transmisión no acepta caracteres especiales.";
	        Transmision.current.error=true;
	        setMensajes("n");
	      }
	      else{
	        errorTransmi.current = "";
	        Transmision.current.error=false;
	        setMensajes("o");
	      }
	    }

	    else if(nombre=='Odometro'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorOdometro.current = "La lectura del odómetro solo admite números.";
	        LecturaOdometro.current.error=true;
	        setMensajes("p");
	      }
	      else{
	        errorOdometro.current = "";
	        LecturaOdometro.current.error=false;
	        setMensajes("q");
	      }
	    }

	    else if(nombre=='TipoAuto'){
	      if(!/^[A-Za-záéíóúÁÉÍÓÚ0-9.\s]+$/i.test(valor)){
	        errorTipoAuto.current = "El tipo de autobús no admite caracteres especiales.";
	        TipoAutobus.current.error=true;
	        setMensajes("r"); 
	      }
	      else{
	        errorTipoAuto.current = "";
	        TipoAutobus.current.error=false;
	        setMensajes("s");
	      }
	    }
	
	}  

const submitValue = async() => {
	await Computo()
	history.replace("/Revisiones/Formatos")
}

	const Computo = (event) =>{
		//event.preventDefault();
		if(!Observaciones.current.value)
			Observaciones.current.value = "Ninguna"
		const formData = {

			RevTecInID: Carroceria.current.value,
			EmpresaOperadora : EmpresaOperadora.current.value,
			Año : Año.current.value,
			MotorElectrico : MotorElectrico.current.value,
			Carroceria : Carroceria.current.value,
			LecturaOdometro : LecturaOdometro.current.value,
			Modelo : Modelo.current.value,
			Motor : Motor.current.value,
			Chasis : Chasis.current.value,
			Transmision : Transmision.current.value,
			Tipo : TipoAutobus.current.value,
			Fecha: FechaRef.current.value,

			SeñalInteriorExterior : forms2.Señalización,
			SeñalInteriorExteriorValue : forms.Señalización,
			Economico : forms2.NumeroEconomico,
			EconomicoValue : forms.NumeroEconomico,
			LaminacionPinturaExterior : forms2.Laminación,
			LaminaciónPinturaExteriorValue : forms.Laminación,
			Defensas : forms2.Defensas,
			DefensasValue : forms.Defensas,
			ChasisGancho : forms2.Chasis,
			ChasisValue : forms.Chasis,
			Puertas : forms2.Puertas,
			PuertasValue: forms.Puertas,
			CristalesParabrisas : forms2.CristalesParabrisas,
			CristalesParabrisasValue : forms.CristalesParabrisas,
			Limpiaparabrisas : forms2.Limpiaparabrisas,
			LimpiaparabrisasValue : forms.Limpiaparabrisas,
			CristalesVentanillas : forms2.CristalesVentanillas,
			CristalesVentanillasValue : forms.CristalesVentanillas,
			CristalMedallon : forms2.CristalMedallon,
			CristalMedallonValue : forms.CristalMedallon,
			Espejos : forms2.Espejos,
			EspejosValue : forms.Espejos,
			Visera : forms2.Visera, 
			ViseraValue : forms.Visera, 
			AsientoConductor : forms2.AsientoConductor,
			AsientoConductorValue : forms.AsientoConductor,
			AsientosPasajeros : forms2.AsientosPasajeros,
			AsientosPasajerosValue : forms.AsientosPasajeros,
			ElementosSujección : forms2.ElementosSujección,
			ElementosSujecciónValue : forms.ElementosSujección,
			Escotillas : forms2.Escotillas,
			EscotillasValue : forms.Escotillas,
			Extintores : forms2.Extintores,
			ExtintoresValue : forms.Extintores,
			Botiquin : forms2.Botiquin,
			BotiquinValue : forms.Botiquin,
			AccesoriosSeguridad : forms2.AccesoriosSeguridad,
			AccesoriosSeguridadValue : forms.AccesoriosSeguridad,
			Pisos : forms2.Pisos,
			PisosValue : forms.Pisos,
			Articulacion : forms2.Articulación,
			ArticulaciónValue : forms.Articulación,
			Motor2 : forms2.Motor,
			Motor2Value : forms.Motor,
			AireComprimido : forms2.SistemaAireComprimido,
			AirecomprimidoValue : forms.SistemaAireComprimido,
			Hibrido : forms2.SistemaHibrido,
			HibridoValue : forms.SistemaHibrido,
			Transmision2 : forms2.Transmisión,
			Transmision2Value : forms.Transmisión,
			Enfriamiento : forms2.SistemaEnfriamiento,
			EnfriamientoValue : forms.SistemaEnfriamiento,
			Ignicion : forms2.IgniciónAutobus,
			IgnicionValue : forms.IgniciónAutobus,
			Tablero : forms2.PanelInstrumentos,
			TableroValue : forms.PanelInstrumentos,
			Electrico : forms2.SistemaEléctrico,
			ElectricoValue : forms.SistemaEléctrico,
			LetreroRuta : forms2.LetreroRuta,
			LetreroRutaValue : forms.LetreroRuta,
			Claxon : forms2.Claxon,
			ClaxonValue : forms.Claxon,
			SistemaDesempañante : forms2.SistemaDesempañante,
			SistemaDesempañanteValue : forms.SistemaDesempañante,
			SistemaAire : forms2.SistemaAC,
			SistemaAireValue: forms.SistemaAC,
			Extractores : forms2.Extractores,
			ExtractoresValue : forms.Extractores,
			AlumbradoEI : forms2.Alumbrado,
			AlumbradoEIValue : forms.Alumbrado,
			Frenos : forms2.Frenos,
			FrenosValue : forms.Frenos,
			CajaDireccion : forms2.CajaDireccion,
			CajaDireccionValue : forms.CajaDireccion,
			Suspensión : forms2.Suspensión,
			SuspensiónValue : forms.Suspensión,
			TuboEscape : forms2.TuboEscape,
			TuboEscapeValue : forms.TuboEscape,
			SistemaRecaudo : forms2.SistemaRecaudo,
			SistemaRecaudoValue : forms.SistemaRecaudo,
			SistemaTelematica : forms2.SistemaTelematica,
			SistemaTelematicaValue : forms.SistemaTelematica,
			TanqueCombustible : forms2.TanqueCombustible,
			TanqueCombustibleValue : forms.TanqueCombustible,
			NeumaticoSisControl : forms2.Neumáticos,
			NeumaticoSisControlValue : forms.Neumáticos,
			Observaciones : Observaciones.current.value
		}

		formRegisterA(formData).then(response =>{
			
		})
		formRegisterE(formData).then(response =>{
				
		})

		formRegisterF(formData).then(response => {
//			swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");
			//history.replace('/Revisiones/Formatos') 
		})
	
		formRegisterCompleto(formData).then(response =>{
//			swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");
		})
		swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");		
//		history.replace("/Revisiones/Formatos")
		//save()
	}
  return (
    <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Cédula de Revisión Técnica Inicial
          </Typography>
		  <Typography component="h1" variant="h5" align="left">
		 	 {fecha}
		  </Typography>
          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>
				  
					<TableRow>
					<StyledTableCell>I. Empresa Operadora</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="EmpresaOperadora" 
							inputRef = {EmpresaOperadora}
							error={EmpresaOperadora.current.error}
               				helperText={errorEmpresaO.current}
                			onBlur={Validaciones} 
                			required
						/>
						</TableCell>
					  <StyledTableCell>VI. Modelo</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Modelo" 
					  		inputRef = {Modelo}
					  		error={Modelo.current.error}
               				helperText={errorModelo.current}
                			onBlur={Validaciones} 
                			required 
					  	/>
					  </TableCell>
					</TableRow>			
				</TableBody>
				
				<TableRow>
					  <StyledTableCell>II. Año</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Año" 
							inputRef = {Año}
							error={Año.current.error}
               				helperText={errorAño.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>VII. Motor No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Motor" 
					  		inputRef = {Motor}
					  		error={Motor.current.error}
               				helperText={errorMotor.current}
                			onBlur={Validaciones} 
                			required 
					  		/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>III. Motor Eléctrico No.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="MotorE"  
							inputRef = {MotorElectrico}
							error={MotorElectrico.current.error}
               				helperText={errorMotorE.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>VIII. Chasis No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Chasis" 
					  		inputRef = {Chasis}
					  		error={Chasis.current.error}
               				helperText={errorChasis.current}
                			onBlur={Validaciones} 
                			required  
					  	/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>IV. Carrocería No.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Carroceria"  
							inputRef = {Carroceria}
							error={Carroceria.current.error}
               				helperText={errorCarroc.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>IX. Transmisión No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Transmision" 
					  		inputRef = {Transmision}
					  		error={Transmision.current.error}
               				helperText={errorTransmi.current}
                			onBlur={Validaciones} 
                			required  
					  	/>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <StyledTableCell>V. Lectura del Odómetro.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Odometro"  
							inputRef = {LecturaOdometro}
							error={LecturaOdometro.current.error}
               				helperText={errorOdometro.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>X. Tipo de autobús</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="TipoAuto" 
					  		inputRef = {TipoAutobus} 
					  		error={TipoAutobus.current.error}
               				helperText={errorTipoAuto.current}
                			onBlur={Validaciones} 
                			required 
					  	/>
					  </TableCell>
					</TableRow>	
					<TableRow>
                        <StyledTableCell>XI. Fecha</StyledTableCell>
                        <TableCell>
                        <Typography component="h1" align="right">
            <TextField      
                id=""
                type="date"
                defaultValue={fecha}
		inputRef = {FechaRef}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
            />
            </Typography>  
                        </TableCell>
                    </TableRow>
			  </Table>
			</TableContainer>			 							
           </Grid>
          </form>

          <br></br>
          <br></br>

          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>No.</StyledTableCell>
					<StyledTableCell align="left">Descripción</StyledTableCell>
					<StyledTableCell align="left">Estado</StyledTableCell>
					<StyledTableCell
					align="left">Funcionamiento</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  
					<TableRow>
					  <TableCell component="th" scope="row">
					  	1
					  </TableCell>
					  <TableCell align="left">
						Señalización interior y exterior
						</TableCell>
					  <TableCell align="left">
						  <RadioGroup aria-label="" name="Señalización"  onChange={HandleRadioChange} row>
		  					  <FormControlLabel id="SeñalizaciónAC" value="AC" control={<Radio />} label="Correcto"/>
		  					  <FormControlLabel id="SeñalizaciónER" value="ER" control={<Radio />} label="Incorrecto"/>
		  					  <FormControlLabel id="SeñalizaciónNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <RadioGroup aria-label="" name="Señalización-F"  onChange={HandleRadioChange} row>
		  					  <FormControlLabel id="Señalización-FAC" value="AC" control={<Radio />} label="Correcto"/>
		  					  <FormControlLabel id="Señalización-FER" value="ER" control={<Radio />} label="Incorrecto"/>
		  					  <FormControlLabel id="Señalización-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					</TableRow>			
				</TableBody>
				
				<TableRow>
					  <TableCell component="th" scope="row">
					  2
					  </TableCell>
					  <TableCell align="left">
					  Número económico de la unidad
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="NumeroEconomico"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="NumeroEconomicoAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="NumeroEconomicoER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="NumeroEconomicoNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="NumeroEconomico-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="NumeroEconomico-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="NumeroEconomico-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="NumeroEconomico-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <TableCell component="th" scope="row">
					  3
					  </TableCell>
					  <TableCell align="left">
					  Laminación y pintura exterior e interior de la unidad
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Laminación"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="LaminaciónAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="LaminaciónER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="LaminaciónNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Laminación-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Laminación-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Laminación-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Laminación-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <TableCell component="th" scope="row">
					  4
					  </TableCell>
					  <TableCell align="left">
					  Defensas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Defensas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="DefensasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="DefensasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="DefensasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Defensas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Defensas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Defensas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Defensas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  5
					  </TableCell>
					  <TableCell align="left">
					  Chasis y gancho de arrastre
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Chasis"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ChasisAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="ChasisER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="ChasisNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Chasis-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Chasis-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Chasis-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Chasis-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  6
					  </TableCell>
					  <TableCell align="left">
					  Puertas
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Puertas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="PuertasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="PuertasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="PuertasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Puertas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Puertas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Puertas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Puertas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  7
					  </TableCell>
					  <TableCell align="left">
					  Cristales del parabrisas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalesParabrisas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalesParabrisasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalesParabrisasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalesParabrisasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="CristalesParabrisas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalesParabrisas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalesParabrisas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalesParabrisas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  8
					  </TableCell>
					  <TableCell align="left">
						Limpiaparabrisas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Limpiaparabrisas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="LimpiaparabrisasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="LimpiaparabrisasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="LimpiaparabrisasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Limpiaparabrisas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Limpiaparabrisas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Limpiaparabrisas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Limpiaparabrisas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  9
					  </TableCell>
					  <TableCell align="left">
						Cristales de ventanillas, ventilas y emergencia
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalesVentanillas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalesVentanillasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalesVentanillasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalesVentanillasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="CristalesVentanillas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalesVentanillas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalesVentanillas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalesVentanillas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  10
					  </TableCell>
					  <TableCell align="left">
					  Cristal de medallón
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalMedallon" onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalMedallonAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalMedallonER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalMedallonNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="CristalMedallon-F" onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CristalMedallon-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="CristalMedallon-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="CristalMedallon-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  11
					  </TableCell>
					  <TableCell align="left">
					  Espejos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Espejos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="EspejosAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="EspejosER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="EspejosNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Espejos-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Espejos-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Espejos-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Espejos-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  12
					  </TableCell>
					  <TableCell align="left">
					  Visera o parasol
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Visera"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ViseraAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="ViseraER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="ViseraNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Visera-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Visera-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Visera-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Visera-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  13
					  </TableCell>
					  <TableCell align="left">
					  Asiento del conductor
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AsientoConductor"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AsientoConductorAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="AsientoConductorER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="AsientoConductorNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="AsientoConductor-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AsientoConductor-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="AsientoConductor-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="AsientoConductor-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  14
					  </TableCell>
					  <TableCell align="left">
					  Asientos de pasajeros
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AsientosPasajeros"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AsientosPasajerosAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="AsientosPasajerosER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="AsientosPasajerosNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="AsientosPasajeros-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AsientosPasajeros-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="AsientosPasajeros-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="AsientosPasajeros-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  15
					  </TableCell>
					  <TableCell align="left">
						Elementos de sujección
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="ElementosSujección"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ElementosSujecciónAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="ElementosSujecciónER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="ElementosSujecciónNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="ElementosSujección-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ElementosSujección-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="ElementosSujección-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="ElementosSujección-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  16
					  </TableCell>
					  <TableCell align="left">
					  Escotillas o fallebas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Escotillas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="EscotillasAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="EscotillasER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="EscotillasNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Escotillas-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Escotillas-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Escotillas-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Escotillas-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  17
					  </TableCell>
					  <TableCell align="left">
					  Extintores
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Extintores"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ExtintoresAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="ExtintoresER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="ExtintoresNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Extintores-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Extintores-FAC" value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel id="Extintores-FER" value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel id="Extintores-FNA" value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  18
					  </TableCell>
					  <TableCell align="left">
				      Botiquín
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Botiquin"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="BotiquinAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="BotiquinER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="BotiquinNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Botiquin-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Botiquin-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Botiquin-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Botiquin-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  19
					  </TableCell>
					  <TableCell align="left">
					  Accesorios de seguridad vial
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AccesoriosSeguridad"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AccesoriosSeguridadAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="AccesoriosSeguridadER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="AccesoriosSeguridadNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="AccesoriosSeguridad-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AccesoriosSeguridad-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="AccesoriosSeguridad-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="AccesoriosSeguridad-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  20
					  </TableCell>
					  <TableCell align="left">
					  Pisos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Pisos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="PisosAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="PisosER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="PisosNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Pisos-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Pisos-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Pisos-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Pisos-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  21
					  </TableCell>
					  <TableCell align="left">
					  Articulación
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Articulación"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ArticulaciónAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="ArticulaciónER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="ArticulaciónNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	 <RadioGroup aria-label="" name="Articulación-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Articulación-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Articulación-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Articulación-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  22
					  </TableCell>
					  <TableCell align="left">
					  Motor
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Motor"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="MotorAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="MotorER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="MotorNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Motor-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Motor-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Motor-FRE" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Motor-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  23
					  </TableCell>
					  <TableCell align="left">
					  Sistema de aire comprimido
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaAireComprimido"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaAireComprimidoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaAireComprimidoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaAireComprimidoNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaAireComprimido-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaAireComprimido-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaAireComprimido-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaAireComprimido-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  24
					  </TableCell>
					  <TableCell align="left">
					  Sistema Híbrido
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaHibrido" onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaHibridoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaHibridoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaHibridoNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaHibrido-F" onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaHibrido-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaHibrido-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaHibrido-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  25
					  </TableCell>
					  <TableCell align="left">
					  Transmisión
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Transmisión"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="TransmisiónAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="TransmisiónER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="TransmisiónNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Transmisión-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Transmisión-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Transmisión-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Transmisión-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  26
					  </TableCell>
					  <TableCell align="left">
					  Sistema de enfriamiento
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaEnfriamiento"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaEnfriamientoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaEnfriamientoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaEnfriamientoNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaEnfriamiento-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaEnfriamiento-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaEnfriamiento-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaEnfriamiento-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  27
					  </TableCell>
					  <TableCell align="left">
					  Ignición del autobús
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="IgniciónAutobus"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="IgniciónAutobusAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="IgniciónAutobusER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="IgniciónAutobusNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="IgniciónAutobus-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="IgniciónAutobus-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="IgniciónAutobus-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="IgniciónAutobus-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  28
					  </TableCell>
					  <TableCell align="left">
					  Panel o Tablero de instrumentos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="PanelInstrumentos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="PanelInstrumentosAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="PanelInstrumentosER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="PanelInstrumentosNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="PanelInstrumentos-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="PanelInstrumentos-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="PanelInstrumentos-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="PanelInstrumentos-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  29
					  </TableCell>
					  <TableCell align="left">
					  Sistema eléctrico
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaEléctrico"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaEléctricoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaEléctricoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaEléctricoNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaEléctrico-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaEléctrico-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaEléctrico-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaEléctrico-FNA" value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  30
					  </TableCell>
					  <TableCell align="left">
					  Letrero electrónico de ruta
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="LetreroRuta"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="LetreroRutaAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="LetreroRutaER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="LetreroRutaNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="LetreroRuta-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="LetreroRuta-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="LetreroRuta-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="LetreroRuta-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  31
					  </TableCell>
					  <TableCell align="left">
					  Claxon
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Claxon"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ClaxonAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="ClaxonER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="ClaxonNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Claxon-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Claxon-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Claxon-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Claxon-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  32
					  </TableCell>
					  <TableCell align="left">
					  Sistema desempañante del parabrisas
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="SistemaDesempañante"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaDesempañanteAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaDesempañanteER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaDesempañanteNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaDesempañante-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaDesempañante-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaDesempañante-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaDesempañante-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  33
					  </TableCell>
					  <TableCell align="left">
					  Sistema de aire acondicionado
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="SistemaAC"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaACAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaACER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaACNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaAC-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaAC-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaAC-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaAC-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  34
					  </TableCell>
					  <TableCell align="left">
					  Extractores y ventiladores
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Extractores"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="ExtractoresAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="ExtractoresER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="ExtractoresNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Extractores-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Extractores-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Extractores-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Extractores-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  35
					  </TableCell>
					  <TableCell align="left">
					  Alumbrado exterior e interior
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Alumbrado"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="AlumbradoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="AlumbradoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="AlumbradoNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Alumbrado-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Alumbrado-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Alumbrado-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Alumbrado-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  36
					  </TableCell>
					  <TableCell align="left">
					  Frenos
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Frenos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="FrenosAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="FrenosER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="FrenosNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Frenos-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Frenos-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Frenos-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Frenos-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  37
					  </TableCell>
					  <TableCell align="left">
					  Caja de Dirección y Soportes 
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="CajaDireccion"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CajaDireccionAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="CajaDireccionER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="CajaDireccionNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="CajaDireccion-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="CajaDireccion-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="CajaDireccion-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="CajaDireccion-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  38
					  </TableCell>
					  <TableCell align="left">
					  Suspensión
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Suspensión"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SuspensiónAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SuspensiónER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SuspensiónNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Suspensión-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Suspensión-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Suspensión-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Suspensión-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  39
					  </TableCell>
					  <TableCell align="left">
					  Tubo de escape y silenciador
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="TuboEscape"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="TuboEscapeAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="TuboEscapeER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="TuboEscapeNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="TuboEscape-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="TuboEscape-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="TuboEscape-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="TuboEscape-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  40
					  </TableCell>
					  <TableCell align="left">
					  Sistema de recaudo
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="SistemaRecaudo"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaRecaudoAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaRecaudoER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaRecaudoNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaRecaudo-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaRecaudo-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaRecaudo-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaRecaudo-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  41
					  </TableCell>
					  <TableCell align="left">
					  Sistema de telemática
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="SistemaTelematica"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaTelematicaAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaTelematicaER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaTelematicaNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="SistemaTelematica-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="SistemaTelematica-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="SistemaTelematica-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="SistemaTelematica-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  42
					  </TableCell>
					  <TableCell align="left">
					  Tanque de combustible y Urea
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="TanqueCombustible"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="TanqueCombustibleAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="TanqueCombustibleER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="TanqueCombustibleNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="TanqueCombustible-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="TanqueCombustible-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="TanqueCombustible-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="TanqueCombustible-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  43
					  </TableCell>
					  <TableCell align="left">
					  Neumáticos y sistemas de control de presión
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Neumáticos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="NeumáticosAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="NeumáticosER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="NeumáticosNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<RadioGroup aria-label="" name="Neumáticos-F"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel id="Neumáticos-FAC" value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel id="Neumáticos-FER" value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel id="Neumáticos-FNA" value="NA" control={<Radio />} label="No Aplica" />
						</RadioGroup>	
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	Observaciones
					  </TableCell>
					  <TableCell align="left" colspan="3">
					  <TextField fullWidth="true" id="desc1" inputRef = {Observaciones} />
					  </TableCell>

					</TableRow>
			  </Table>
			</TableContainer>			 							
           </Grid>
	<Button
                            width= "25%"
                            align= "left"
                            variant="contained"
                            color="secondary"
                            style={{backgroundColor:"#CC353F"}}
                            className={classes.submit}
                            type="submit"
                            onClick={()=> {
			    	history.push('/Revisiones/Formatos')
			    }}>
                           <IoReturnUpBack size={20}/>
                    </Button>	
			<Button
		            width= "25%"
		            align= "right"
		            variant="contained"
		            color="secondary"
			    style={{float: 'right',backgroundColor:"#CC353F"}}
		            className={classes.submit}
		            
		            onClick={submitValue}>
		          <IoReturnUpForwardOutline size={20}/>   
		    </Button>
          </form>
				
            
        </div>
	</Container>	
  );
}
const rootElement = document.getElementById("root");
