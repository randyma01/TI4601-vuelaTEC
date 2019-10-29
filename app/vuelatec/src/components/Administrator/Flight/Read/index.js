import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

class Flight extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listFlights: []
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    await fetch('http://localhost:3000/admin/findAllFlights/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          this.setState({
            listFlights: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onClickRefreshFlights = async () => {
    await fetch('http://localhost:3000/admin/findAllFlights/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            listFlights: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Ver Vuelos</h3>
        </div>
        <div style={{ margin: '1%', height: '560px', overflow: 'auto' }}>
          <IconButton aria-label="refresh" onClick={this._onClickRefreshFlights}>
            <Refresh />
          </IconButton>
          <Table responsive>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Nombre</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Itinerario</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Capacidad permitida</th>
                <th>Código de Aerolinea</th>
                <th>Restricciones</th>
                <th>Servicios</th>
                <th>Boletos Vendidos</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listFlights.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.origin}</td>
                  <td>{item.destination}</td>
                  <td>Salida: {item.takeOff} [{item.departure}] - Llegada: {item.landing} [{item.arrives}]</td>
                  <td>$ {item.price}</td>
                  <td>{item.state}</td>
                  <td>{item.capacityPlane}</td>
                  <td>{item.airline_id}</td>
                  <td>{JSON.stringify(item.restrictions)}</td>
                  <td>{JSON.stringify(item.services)}</td>
                  <td>{item.ticketsSold}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}


export default Flight;
