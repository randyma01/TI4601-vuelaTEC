import React from 'react';
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import IconButton from '@material-ui/core/IconButton';

class Boarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: [],
      idFlight: '',
      idPassenger: '',
      passenger: [],
      ticketsToBeBoarding: []
    };
  }

  _handleChangePassenger(event) {
    this.setState({ idPassenger: event.target.value })
  }

  _handleChangeFlight(event) {
    this.setState({ idFlight: event.target.value })
  }

  _onClickApplyBoarding = async (ticket, passenger) => {
    let verify = window.confirm(`Desea aplicar abordaje al ticket con código: ${ticket}`);
    if (verify) {
      let data = {
        _id: ticket,
        passenger_id: passenger
      }
      await fetch('http://localhost:3000/employee/boardingPass/',
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.ok === 1) {
            window.confirm('Se aplico el abordaje correctamente para el ticket seleccionado');
            this.setState({ ticketsToBeBoarding: [] })
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  _onClickSearchFlight = async () => {
    if (this.state.idFlight === '' || this.state.idPassenger === '') {
      window.confirm("Debe ingresar parametros de busqueda.")
    } else {
      this.setState({
        ticketsToBeBoarding: []
      })
      let flightInfo = await fetch(`http://localhost:3000/employee/findFlightsId/${this.state.idFlight}`,
        {
          method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
          return responseJson;
        })
        .catch(error => {
          console.error(error);
        });

      await fetch(`http://localhost:3000/employee/passengerInfo/${this.state.idPassenger}`,
        {
          method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
          let passengerInfo = [];
          passengerInfo = responseJson[0].ticketsInfo;
          passengerInfo.forEach(element => {
            if (element.flight_id === flightInfo._id) {
              this.setState({
                ticketsToBeBoarding: [...this.state.ticketsToBeBoarding, element],
                idFlight: '', idPassenger: ''
              })
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Abordaje de Pasajero a Vuelo</h3>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '2%' }}>
            <Form.Group as={Col} controlId='formGridPassenher'>
              <Form.Control type='string' placeholder='Identificador de pasajero' value={this.state.idPassenger} onChange={this._handleChangePassenger.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridFlight'>
              <Form.Control type='string' placeholder='Código de vuelo' value={this.state.idFlight} onChange={this._handleChangeFlight.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridButton'>
              <Button onClick={this._onClickSearchFlight}>Buscar</Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <Table striped bordered hover responsive >
          <thead>
            <tr>
              <th>Código Boleto</th>
              <th>Código Vuelo</th>
              <th>Identificación Pasajero</th>
              <th>Cantidad Boletos</th>
              <th>Cantidad Maletas</th>
              <th>Fecha Compra</th>
              <th>Asientos</th>
              <th>Estado de abordaje</th>
              <th>Aplicar Abordaje</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ticketsToBeBoarding.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.flight_id}</td>
                <td>{item.passenger_id}</td>
                <td>{item.amount}</td>
                <td>{item.baggage}</td>
                <td>{item.dateBought}</td>
                <td>{JSON.stringify(item.seats)}</td>
                <td>{item.boarded ? ('Abordado') : 'Sin abordar'}</td>
                <td>
                  <IconButton aria-label="apply" style={{ color: 'red' }} onClick={this._onClickApplyBoarding.bind(this, item._id, item.passenger_id)} disabled={item.boarded}>
                    <FlightTakeoff />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}


export default Boarding;
