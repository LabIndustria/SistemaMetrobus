import React, {useState,useEffect} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
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
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { useHistory } from "react-router-dom";
import {getData, activar_Empleado,cambiarCargo} from "../../Functions/UserFunctions"



const Empleados = () => {
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
          color: '#FFFFFF',
          backgroundColor: '#992830',
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);
      
      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#992830',
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
        
          return `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
        }

        var fecha = getCurrentDate();     
        const history = useHistory();
    
      const [age, setAge] = React.useState('');
      const [selectedValue, setSelectedValue]= useState(null);
      const dato = '';

      const handleChange = (event) => {
        setAge(event.target.value);  
      };

      const handleCargo = (event,row) =>
      {}

      const [preload, setPreload] = useState(true);
      //Precarga
      const [data, setData] = useState([]);
	const [cargo,setCargo] = useState([]);

      useEffect(() => {
        getUsers();
	setCargo(Cookies.get("Cargo"))
      }, [])

      const getUsers = async () => {
        const url = 'Users/get_Users'
        const _data = await getData(url)
          setData(_data.data)

          setPreload(false)
      }

      const UserEstado = (row) =>{
        if(row.estado=="ACTIVO")
          return <CheckIcon />
        if(row.estado=="INACTIVO")
          return <BlockIcon />
      }
  
    return (       
     
      <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>        
      <br/>
      <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
          <Box mr={2}>*/}
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Apellido</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Departamento</StyledTableCell>
                  <StyledTableCell align="center">Cargo</StyledTableCell>
                  <StyledTableCell align="center">Estado</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={data.Nombre}>
                    <StyledTableCell align="center" component="th" scope="row">
                    {row.Nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Apellido}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.Departamento}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Select labelId="Tipo de Empleado" id="Tipo" name="Tipo" defaultValue={row.Tipo} onChange={(event) => {    
                        if(row.Tipo != "JUD" || cargo == "Gerente" || cargo == "Administrador"){                                
                        row.Tipo = event.target.value
                        cambiarCargo(row)
                        }
                      }}
                      >
			<MenuItem value={"Administrador"}>Administrador</MenuItem>
                        <MenuItem value={"Gerente"}>Gerente</MenuItem>
                        <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                        <MenuItem value={"Auditor"}>Auditor</MenuItem>
                        <MenuItem value={"JUD"}>JUD</MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <ColorButton variant="contained" name = {row.Email} color="Primary" className={classes.submit} onClick={() => {
                        if(row.Tipo != "JUD"|| cargo == "Gerente" || cargo == "Administrador"){                                  
                        activar_Empleado(row)
                        }
                      }}>
                    {UserEstado(row)}
                    </ColorButton></StyledTableCell>                 
                  </StyledTableRow>
                ))}
              </TableBody>
              </Table>
          {/* </Box>
        </Grid>*/}
      </TableContainer>
    </div>
  </Container>
    );
}
 
export default withRouter(Empleados);
