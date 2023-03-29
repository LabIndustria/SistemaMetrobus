import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red} from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

const Formatos = () => {

    const ColorButton = withStyles((theme) => ({
        root: {
          color: '#FFFFFF',
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
      
      function createData(name, dir) {
        return { name, dir};
      }
      
      const rows = [
        createData('Cédula de revisión técnica inicial del autobús','/cedularti'),
        createData('Cédula técnica de registro del autobús','/cedulatra'),
        createData('Consumo de combustible', '/consumo'),
        createData('Consumo y mantenimiento','/consumomantenimiento'),
        createData('Ingreso estatus de patio','/estatuspatio'),
        createData('Liberación estatus de patio','/estatuspatioS'),
        createData('Kilometraje','/km'),
        createData('Pruebas de desempeño','/pruebades'),
        createData('REFFA','/reffa'),
        createData('REFFA Fotos','/reffaindice'),
        createData('Rendimientos','/rendimiento')
      ];      

      const Disponible= (row)=>{
        if(row.name=="Consumo de combustible")
          return false;
        else if(row.name=="Kilometraje")
          return false;
        else{
          return false;
        }
      }

      const useStyles = makeStyles(theme => ({
        table: {
            minWidth: 50
        }
        
      }));
      const history = useHistory();
    const handleclick = (name) => {
    	history.push(name)    	
    }

      const classes = useStyles();

    return (  
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre del formato</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center"><ColorButton style={{width:'400px'}} variant="contained" color="primary" id={row.dir} onClick={() => {                                    
                        handleclick(row.dir)
                      }} className={classes.margin} disabled={Disponible(row)}>
                            {row.name}
              </ColorButton></StyledTableCell>

            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    
    );
}
 
export default withRouter(Formatos);
