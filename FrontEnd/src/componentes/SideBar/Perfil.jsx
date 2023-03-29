import React,{useEffect,useState,useRef} from 'react'
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {getUserData} from "../Functions/UserFunctions";
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";

const Perfil = () => {
    
    const estilos = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'fit-content'
        },
        title: {
            flexGrow: 1
        },
        avatar: {
          width: 130,
          height: 130
        },
        name: {
          marginTop: theme.spacing(1)
        },
        offset: theme.mixins.toolbar
      }));
    const classes = estilos();

    const [preload, setPreload] = useState(true);
    const [data1, setData1] = useState();
  //Precarga
  const [nombre, setNombre] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const imagenes = useRef()

  useEffect(() => {
    getLocal();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const getLocal = async () => {
    const url = '/users/get_User'
    let email_p = Cookies.get("Email")
    const ema = {
      url: url,
      email: email_p
    }
    const _data = await getUserData(ema)
    if (_data.data.Foto)
    {
      var bufferBase64 = new Buffer( _data.data.Foto, 'binary' ).toString('ascii');
	imagenes.current = bufferBase64
      setData1('a')
    }
    else
    {
     imagenes.current = "/images/avatars/U_T_titular.png"
      setData1('abb')
    }
    
    let obj = _data.data
    let datas = _data.data.Nombre + ' ' + _data.data.Apellido
    setNombre(datas)
    let datas2 = _data.data.Tipo
    setCargo(datas2)
    let datas4 = _data.data.Departamento
    setDepartamento(datas4)
};   


    return ( 
      <div className={classes.root}>
	  <center>
          <Typography className={classes.title} style={{ color: '#FFFFFF' }} variant="h4" >
            Departamento de {departamento}
          </Typography>
          </center>
          <Avatar alt="Person" className={classes.avatar} src={imagenes.current}/>

          <Typography className={classes.name} style={{ color: '#FFFFFF' }} align="center" variant="h4">
		        {nombre}
          </Typography>
          <Typography style={{ color: '#FFFFFF' }} variant="h5">
      	   {cargo}
      	  </Typography>
            <Button color="#FFFFFF" href="/perfil">Editar Perfil</Button>
      </div>
     );
}
 
export default Perfil;
