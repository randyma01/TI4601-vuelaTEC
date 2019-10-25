import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      
    };
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Reportes Admin - Cantidad de operaciones de compra de boletos registradas en el
sistema, esta información se puede filtrar por pasajero, por rango
de fechas, por estado de vuelo. También mostrar los tres pasajeros
con más vuelos adquiridos. </h3>
        </div>
      </Container>
    );
  }
}


export default Report;
