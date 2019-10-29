import React from 'react';
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Refresh from '@material-ui/icons/Refresh';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: props.dataUser,
      flight: [],
      idFlight: '',
      idPassenger: '',
      passenger: [],
      ticketsToBeCheckin: []
    };
  }

  _handleChangePassenger(event) {
    this.setState({ idPassenger: event.target.value })
  }

  _handleChangeFlight(event) {
    this.setState({ idFlight: event.target.value })
  }

  _onClickApplyCheckIn = async (ticketId, amountTickets, passenger) => {
    let verify = window.confirm(`Desea aplicar check-in al ticket con código: ${ticketId}`);
    if (verify) {
      //TODO Assign seats
      let seatsTemp = []
      const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
      for (let i = 0; i < amountTickets; i++) {
        let randomSeats = [...Array(1)].map(i => chars[Math.random() * chars.length | 0]).join``;
        let randomSeatsNumber = Math.floor((Math.random() * 100) + 1);
        seatsTemp.push(randomSeats + randomSeatsNumber)
      }
      let data = {
        ticketId: ticketId,
        passengerId: passenger,
        seats: seatsTemp
      }
      await fetch('http://localhost:3000/passenger/makeCheckIn/',
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
            this.setState({ ticketsToBeCheckin: [] })
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
    }
    else if (parseInt(this.state.idPassenger) !== parseInt(this.state.dataUser._id)) {
      window.confirm("La identificación del pasajero no concuerda con su cuenta, verifique.")
    }
    else {
      this.setState({
        ticketsToBeCheckin: []
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
                ticketsToBeCheckin: [...this.state.ticketsToBeCheckin, element],
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
          <h3 align='center'>Check-in de Ticket</h3>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '2%' }}>
            <Form.Group as={Col} controlId='formGridPassenher'>
              <Form.Control type='number' placeholder='Identificador de pasajero' value={this.state.idPassenger} onChange={this._handleChangePassenger.bind(this)} />
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
              <th>Estado de Check-in</th>
              <th>Aplicar Check-in</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ticketsToBeCheckin.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.flight_id}</td>
                <td>{item.passenger_id}</td>
                <td>{item.amount}</td>
                <td>{item.bagagge}</td>
                <td>{item.dateBought}</td>
                <td>{JSON.stringify(item.seats)}</td>
                <td>{item.checked ? ('Chequeado') : 'Sin chequear'}</td>
                <td>
                  <IconButton aria-label="apply" style={{ color: 'green' }} onClick={this._onClickApplyCheckIn.bind(this, item._id, item.amount, item.passenger_id)} disabled={item.checked}>
                    <CheckCircleOutlineIcon />
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


export default Flight;
