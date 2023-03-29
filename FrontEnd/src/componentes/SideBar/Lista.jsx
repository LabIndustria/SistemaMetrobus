import React,{useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom"
import { List, ListItem, ListItemIcon, ListItemText,Typography, makeStyles } from '@material-ui/core'
import {BrowserRouter as Router,Link,Route,Switch,} from 'react-router-dom'
import babel from 'babel-core';
import swal from "sweetalert";
import {IoPersonOutline} from "react-icons/io5";
import {RiImageEditLine} from "react-icons/ri";
import {AiOutlineFileSearch} from "react-icons/ai";
import {IoDocumentsOutline} from "react-icons/io5";

const Lista = () => {
    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        icon: {
        color: '#FFFFFF',
        marginRight: 5,
        }
    }));
    const classes = useStyles()
    const [nombre, setNombre] = useState([])
    const [cargo, setCargo] = useState([])
    const [departamento, setDepartamento] = useState([])
    const [lis,setLis] = useState() 
    const [values,setValues] = useState([])
    useEffect(() => {
        getLocal();
    }, []);

    function createData(direccion, nombre, icono) {
        return {direccion, nombre, icono};

      }
      var rows_g = [
                createData('/Empleados',"Empleados",<IoPersonOutline color="#FFFFFF" size={20} />),
                createData('/Busqueda',"Búsqueda",<AiOutlineFileSearch color="#FFFFFF" size={20} />),
                createData('/Revisiones/Formatos',"Formatos",<IoDocumentsOutline color="#FFFFFF" size={20} />),
                createData('/Header',"Cambio de logo",<RiImageEditLine color="#FFFFFF" size={20} />),
            ]

    var rows_j = [
                createData('/Empleados',"Empleados",<IoPersonOutline color="#FFFFFF" size={20} />),
                createData('/Busqueda',"Búsqueda",<AiOutlineFileSearch color="#FFFFFF"size={20} />),
                createData('/Revisiones/Formatos',"Formatos",<IoDocumentsOutline color="#FFFFFF"size={20} />),
                createData('/Header',"Cambio de logo",<RiImageEditLine color="#FFFFFF" size={20} />),
            ]
    var rows_e = [
                createData('/Busqueda',"Búsqueda",<AiOutlineFileSearch color="#FFFFFF" size={20} />),
                createData('/Revisiones/Formatos',"Formatos",<IoDocumentsOutline color="#FFFFFF" size={20} />),
            ]
    var row_a = []

    const getLocal = async () => {
            let data = Cookies.get("Nombre")
            setNombre(data)
            let data1 = Cookies.get("Cargo")
            setCargo(data1)
            let data2 = Cookies.get("Departamento")
            setDepartamento(data2)
            if( (data1 == "Gerente" && data2 == "Transporte") || (data1 == "Administrador" && data2 == "Transporte"))
            {
                setValues(rows_g)
            }
            else if(data1 == "JUD" && data2 == "Transporte")
            {
                setValues(rows_j)
            }
            else if(data1 == "Supervisor" && data2 == "Transporte")
            {
                setValues(rows_e)
            }
            else if(data1 == "Auditor" || data2 == "Transporte")
            {
                setValues(rows_e)
            }
        
    } 
    const handleclick = (name) => {
        history.push(name)    
        history.go(0)   
    }

    return ( 
        <div>
            <Router>
            <List component="nav">
                {values.map((row) => (
                    <ListItem button onClick={() => {      
                                handleclick(row.direccion)
                              }}
>
                        <ListItemIcon onClick={() => {      
                                handleclick(row.direccion)
                              }}
>
                            {row.icono}
                            <ListItemText disableTypography primary={<Typography variant="h5" style={{ color: '#FFFFFF' }} onClick={() => {                                    
                                handleclick(row.direccion)
                              }}
                      >{row.nombre}</Typography>} />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
            </Router>

            
        </div>
     );
}
 
export default Lista;
