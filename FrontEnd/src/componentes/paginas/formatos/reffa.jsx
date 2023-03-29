import React, { useRef, useState, useEffect, createRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { useHistory } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas'
import {getData, sendCodes, sendData, sendElaboration} from "../../Functions/Codigos_REFFA"
import {getAutobus} from "../../Functions/CedulaTRAFunctions"
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import Search from "@material-ui/icons/Search";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";    
import {IoReturnUpBack} from "react-icons/io5";
import {IoReturnUpForwardOutline} from "react-icons/io5"; 

const Reffa = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
  }));

    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: '#992830',
          '&:hover': {
            backgroundColor: '#BE1A25',
          },
        },
      }))(Button);
      
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
            backgroundColor: theme.palette.action.hover,
            
          },
        },
      }))(TableRow);
          

      const classes = useStyles();           
      function getCurrentDate(separator='/'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
	return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
        	//return `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
        }
        var fecha = getCurrentDate();     
        const history = useHistory();
    
  const [selectedValue, setSelectedValue]= useState(null);
  const tam = useRef('')
  const dato = '';

    const [rows, setRows] = useState([{}]);
    const [rowe, setRowe] = useState([{}]);
    const [p, setp] = useState([{}]);
    // var numrow = 0;
    var [numrow, setNum] = useState(1)
    var aumrow = useRef();
    var row_l = 1;


//Datos del Autobús
const NumeroEconomicoR = useRef('')
const EmpresaOperadoraR = useRef('')
const AñoR = useRef('')
const NoMotorR = useRef('')
const NoChasisR = useRef('')
const NoTransmisionR = useRef('')
const MarcaR = useRef('')
const ModeloR = useRef('')
const PlacasR = useRef('')
const KilometrajeRef = useRef('')
//Datos de la tabla de códigos y mal funcionamiento
const Codigos = useRef([])
const Elemento = useRef([])
const Estatus = useRef([])
const Detalle = useRef([])
const Localizacion = useRef([])
const Observaciones = useRef([])
//Datos del anexo
const FechaUltimoMantenimiento = useRef('')
const Verificacion = useRef('')
const ConsumoPromedio = useRef('')
const FechaFumigacion = useRef('')
const NotaExtra = useRef('')
//Recepcion de Empresa Operadora
const Cargo = useRef('')
const Fecha = useRef('')
const Nombre = useRef('')
const Hora = useRef('')
//Encargados
const item = ''
const Elaboro = useRef([])

  const prueba = async() => {
    
    const formData = {
      NumeroEconomico: NumeroEconomicoR.current.value
    }
    
    const _data = await getAutobus(formData);
    if(_data.data)
    {
		EmpresaOperadoraR.current = _data.data.NombreEmpresaOperadora
		AñoR.current = _data.data.Año
		NoMotorR.current = _data.data.NumeroMotor
		NoChasisR.current = _data.data.NumeroChasis
		NoTransmisionR.current = _data.data.NumeroTransmision
		MarcaR.current = _data.data.Marca
		ModeloR.current = _data.data.Modelo
		PlacasR.current = _data.data.PlacaVehicular
	
    }
    else
    {	
		EmpresaOperadoraR.current = ""
		AñoR.current = ""
		NoMotorR.current = ""
		NoChasisR.current = ""
		NoTransmisionR.current = ""
		MarcaR.current = ""
		ModeloR.current = ""
		PlacasR.current = ""
    }
    
      
    const item = {
          Codigo: "",
          Elemento: "",
          Estatus: "",
          Detalle: "",
          Localización: "",
          Observaciones: "" 
     }
        p.push(item); 

        setp([...rows, item]);
  
  }
const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState();
      
//Primera Tabla
    const handletablaidow = () => {
//      let a  = aumrow.current.value
	let a = 0 - 0
        if(aumrow.current.value)
                a = aumrow.current.value
        else
                a = 1 - 0

      setNum(numrow + parseInt(a))
      const item = {
          Codigo: "",
          Elemento: "",
          Estatus: "",
          Detalle: "",
          Localización: "",
          Observaciones: "",
     }
      
      for(let i = 0; i < a-1; i++)
        rows.push(item); 
      setRows([...rows, item])
    }

    function updateInputValue(evt) {
      numrow = evt.target.value;
      row_l = parseInt(row_l) + parseInt(numrow);      
      tam.current = row_l
    };

    const [preload, setPreload] = useState(true);
    //Precarga
    const [data, setData] = useState([]); 
    const [Codes,setCodes] = useState([]);
    const [Coded,setCodesD] = useState([]);
    const [data1, setData1] = useState([]);
    useEffect(() => {
      getUsers();
    }, [])

    const getUsers = async () => {
      const url = 'reffa/get_Codigo'
      const _data = await getData(url)
      if (data.success){
        setData(_data.data)

       // setPreload(false)
      }
     /* for(let i = 0; i < 2; i++)
        rowe.push(item); 
      setRowe([...rowe, item])*/
	let arr = []
	for(const i in _data.data)
		arr.push(_data.data[i].Codigo)
	setCodes(arr)
	setCodesD(_data.data)
    }

const Completar = (event) =>{
	let id = event.currentTarget.name.substring(8,event.currentTarget.name.length)
	swal("¡Felicidades!",Codigos.current[id].value, "success")
}	

const Envio = async() =>{
        await Computo()
        history.replace("/Revisiones/Formatos")
}
    function Computo()
    {
      //Enviando datos principales
      let nombre = Cookies.get("Nombre")
      let cargo = Cookies.get("Cargo")
	if(!NotaExtra.current.value)
		NotaExtra.current.value = "Ninguna"
      const formDatas = {
        NumeroEconomico: NumeroEconomicoR.current.value,
        EmpresaOperadora: EmpresaOperadoraR.current.value,
        Año: AñoR.current.value,
        NoMotor: NoMotorR.current.value,
        NoChasis: NoChasisR.current.value,
        NoTransmision: NoTransmisionR.current.value,
        Marca: MarcaR.current.value,
        Modelo: ModeloR.current.value,
        Placas: PlacasR.current.value,
        FechaUltimoMantenimiento: FechaUltimoMantenimiento.current.value,
        Verificacion: Verificacion.current.value,
        ConsumoPromedio: ConsumoPromedio.current.value,
        FechaFumigacion: FechaFumigacion.current.value,
        Kilometraje: KilometrajeRef.current.value,
	NotaExtra: NotaExtra.current.value,
        Cargo: cargo,
        Fecha: new Date(fecha),
        Nombre: nombre,
        Hora: Hora.current.value
      }
    
      
      sendData(formDatas).then(response => {      
        if(response)
	      {
	        console.log("...") 
	      }
      })
      //Enviando datos de la tabla de códigos
      for(let i = 0; i < parseInt(numrow); i++){       

	if(!Observaciones.current[i].value)
        	Observaciones.current[i].value = "Ninguna"
	if(!Codigos.current[i].value)
                Codigos.current[i].value = "0"	

	if(Elemento.current[i] && Estatus.current[i].value && Detalle.current[i].value && Localizacion.current[i]){

	
          const formData = {
            Codigos: Codigos.current[i].value,
            Elemento: Elemento.current[i],
            Estatus: Estatus.current[i].value,
            Detalle: Detalle.current[i].value,
            Localizacion: Localizacion.current[i],
            Observaciones: Observaciones.current[i].value,
            NumeroEconomico: NumeroEconomicoR.current.value,
            Fecha: (fecha)
          }
       
          
          sendCodes(formData).then(response => {    
		      if(response)
		      {
		        console.log("...")
		      }  
          })
          
        }        
}
      
      swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
      //history.replace("/Revisiones/Formatos")
      
    }

    return (       
      <Container align="center" component="main">
      <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="left">
            REFFA
          </Typography>
      <Typography component="h1" variant="h5" align="left">
       {fecha}
      </Typography>
          <br/>
          <br/>
          
          <form className={classes.form} noValidate>
      <Grid container spacing={2}>
       <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableBody>

        <TableRow>
          <StyledTableCell>Número Económico</StyledTableCell>
            <TableCell align="right">
            <TextField id="st1" inputRef={NumeroEconomicoR}/>
            </TableCell>
          </TableRow> 

          <TableRow>
          <StyledTableCell>Empresa Operadora</StyledTableCell>
            <TableCell align="right">
            <TextField id="EO" name="EO" value={EmpresaOperadoraR.current} 
            />
            </TableCell>
            <StyledTableCell>Marca</StyledTableCell>
            <TableCell component="th" scope="row">
              <TextField id="desc1" value={MarcaR.current} 
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
          </TableRow>     
        
        <TableRow>
            <StyledTableCell>Año</StyledTableCell>
            <TableCell align="right">
            <TextField id="st1" value={AñoR.current} 
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
            <StyledTableCell>Modelo</StyledTableCell>
            <TableCell component="th" scope="row">
              <TextField id="desc1" value={ModeloR.current}
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
          </TableRow> 
          
          <TableRow>
            <StyledTableCell>No. Motor</StyledTableCell>
            <TableCell align="right">
            <TextField id="st1" value={NoMotorR.current}
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
            <StyledTableCell>No. Transmisión</StyledTableCell>
            <TableCell component="th" scope="row">
              <TextField id="desc1" value={NoTransmisionR.current} 
            InputProps={{
                                      readOnly: true,
                                   }} />
            </TableCell>
          </TableRow> 
          
          <TableRow>
            <StyledTableCell>No. Chasis</StyledTableCell>
            <TableCell align="right">
            <TextField id="st1" value={NoChasisR.current}
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
            <StyledTableCell>Placas</StyledTableCell>
            <TableCell component="th" scope="row">
              <TextField id="desc1" value={PlacasR.current}
            InputProps={{
                                      readOnly: true,
                                   }}/>
            </TableCell>
          </TableRow> 

          <TableRow>
            <StyledTableCell>Kilometraje</StyledTableCell>
            <TableCell align="right">
            <TextField id="st1" inputRef={KilometrajeRef}/>
            </TableCell>
          </TableRow>
        </TableBody>  
        </Table>
        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor:"#CC353F"}}
           className={classes.submit}
	   align="center" 
           onClick={prueba}><Search />
        </Button>
      </TableContainer>                   
           </Grid>
            <br/>
            <br/>
            <br/>
            
           <Grid align="center" container spacing={7}>
       <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        
                <TableHead>
                <TableRow>                        
                    <StyledTableCell align="center" scope="row">No.</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Código</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Elemento</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Estatus</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Detalle</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Localización</StyledTableCell>
                    <StyledTableCell align="center" scope="row">Observaciones</StyledTableCell>
                    
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow id="tablaid" key={index}>
                            <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                            <TableCell align="center" component="th" scope="row">
       {/*                         <TextField
                                    type="text"
                                    name={"Codigo"+index}
                                    // value={rows[index].Codigo}
                                    inputRef = {(el) => (Codigos.current[index] = el)}
				    id={"Codigo"+index}
				    required
                                />*/}

			{/*<Autocomplete
        suggestions={Codes} onBlur={Completar}  name = {"Codigo"+index} inputRef = {(el) => (Codigos.current[index] = el)} />
			*/}
		<Autocomplete
        inputRef={(el) => (Codigos.current[index] = el)}
        onChange={(event, newValue) => {
          setValue(newValue);
	  console.log(newValue)
	  for(let a in Coded)
		if(Coded[a].Codigo == newValue)
		{
			console.log(Coded[a])
        		Localizacion.current[index] = Coded[a].Localizacion
			Elemento.current[index] = Coded[a].Descripcion
			console.log("Localizacion "+ Localizacion.current[index]+ ' ' + index)
		}
	}}
        inputValue={inputValue}
        id="controllable-states-demo"
        options={Codes}
        style={{ width: 300 }}
        renderInput={(params) => <TextField inputRef={(el) => (Codigos.current[index] = el)} {...params} name = { "Codigo" + index} />}
      />

                            </TableCell>
	                  <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    name={"Elemento"+index}
                                    value = {Elemento.current[index]}
					// value={rows[index].Elemento}
                                    //inputRef = {(el) => (Elemento.current[index] = el)}
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <Input
                                    type="text"
                                    name="Estatus"
                                    // value={rows[index].Estatus}
                                    inputRef = {(el) => (Estatus.current[index] = el)}
                                />
                            </TableCell>
                             <TableCell align="center" component="th" scope="row">
                                <Input
                                    type="text"
                                    name="Detalle"
                                    // value={rows[index].Detalle}
                                    inputRef = {(el) => (Detalle.current[index] = el)}
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <Input
                                    type="text"
                                    name="Localizacion"
                                    value = {Localizacion.current[index]}
				     // value={rows[index].Localizacion}
                                    //inputRef = {(el) => (Localizacion.current[index] = el)}
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <Input
                                    type="text"
                                    name="Observaciones"
                                    // value={rows[index].Observaciones}
                                    inputRef = {(el) => (Observaciones.current[index] = el)}
                                />
                            </TableCell>
                            
                        </TableRow>
                    ))}                               
        </TableBody>  
        </Table>
        &nbsp;&nbsp;
        <Input id="standart-basic" type="number" size="small" inputRef = {aumrow}/>&nbsp;&nbsp;
        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor:"#CC353F"}}
           className={classes.submit} 
           onClick={handletablaidow}><PlaylistAdd />
        </Button>
              </TableContainer>                   
           </Grid>
           <br/>
           <br/>
           <br/>
           <Grid>
           <Typography component="h2" variant="h2" align="center">
            ANEXO DEL REPORTE DEL ESTADO FÍSICO Y DEL FUNCIONAMIENTO DEL AUTOBÚS
          </Typography>
           </Grid>
           <br/>
           <br/>
           <br/>
           <Grid align="center" container spacing={7}>
       <TableContainer component={Paper}>
        
      </TableContainer>                   
           </Grid>
           <br/>
           <br/>
           <br/>
           
           <Typography component="h1" variant="h5" align="left">
            Fecha del último mantenimiento preventivo: <TextField      
                id="dateMantenimiento"
                type="date"
                align="left"
                defaultValue={fecha}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                inputRef = {FechaUltimoMantenimiento}
            />
            </Typography>      
            <br/>       
            <Typography component="h1" variant="h5" align="left">
            Verificación vehicular:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField id="veriVei"  inputRef = {Verificacion} />
            </Typography>
            <br/>
            <Typography component="h1" variant="h5" align="left">
            Consumo promedio display o calculado:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField id="consumoPromedio"  inputRef = {ConsumoPromedio} />
            </Typography>
            <br/>
            <Typography component="h1" variant="h5" align="left">
            Última fecha de fumigación:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField      
                id="dateFumigacion"
                label="Fecha"
                type="date"
                align="left"
                defaultValue={fecha}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                inputRef = {FechaFumigacion}
            />
            </Typography>
            <br/>
            <Typography component="h1" variant="h5" align="left">
            Nota extra:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <TextField id="notaExtra" fullWidth="true" inputRef = {NotaExtra} />
            </Typography>
		
            <br/>
            <br/>

            <div style={{float: 'left'}}>       
        <Button
                            width= "25%"
                            align= "left"
                            variant="contained"
                            color="secondary"
                            style={{backgroundColor:"#CC353F"}}
                            className={classes.submit}
                            onClick={()=> {
            history.push('/Revisiones/Formatos')
          }}>
                                 <IoReturnUpBack size={20}/>
                    </Button>       
                    </div>
        <Button
                width= "25%"
                align= "right"
                variant="contained"
                color="secondary"
          style={{float: 'right',backgroundColor:"#CC353F"}}
                className={classes.submit}                
                onClick={Envio}>
              <IoReturnUpForwardOutline size={20}/>    
        </Button>
       </form>          
    </div>
  </Container>
    );
}
 
export default withRouter(Reffa);
