import React from 'react';
import { Container, Col, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

class Report1 extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      allFlights: [],
      allTickets: [],
      allTicketsTemp: [],
      endDateFlight: '',
      filtersDate: [],
      filtersState: [],
      flights: [],
      flightsTemp: [],
      passengerForTicker: [],
      passengerName: '',
      passengerTemp: [],
      startDateFlight: '',
      stateFlight: ''
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    fetch('http://localhost:3000/employee/allTickets/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          this.setState({
            allTicketsTemp: responseJson
          });

        }
      })
      .catch(error => {
        console.error(error);
      });
    fetch('http://localhost:3000/passengers/allFlights/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          this.setState({
            allFlights: responseJson,
            flightsTemp: responseJson
          });
          this.state.allTicketsTemp.forEach(async ticket => {
            await fetch(`http://localhost:3000/employee/passengerInfo/${ticket.passenger_id}`,
              {
                method: "GET"
              })
              .then(response => response.json())
              .then(passenger => {
                if (passenger !== '') {
                  ticket["passenger"] = passenger[0];
                  this.setState({
                    allTickets: [...this.state.allTickets, ticket]
                  })
                }
              })
              .catch(error => {
                console.error(error);
              });
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

  _handleChangeEndDate(event) {
    let endDateFilter = event.target.value;
    let filterFlights = this.state.stateFlight === '' || this.state.endDateFlight
      ?
      this.state.flightsTemp.filter(item => item.takeOff >= this.state.startDateFlight && item.landing <= endDateFilter)
      :
      this.state.filtersState.filter(item => item.takeOff >= this.state.startDateFlight && item.landing <= endDateFilter);

    this.setState({
      endDateFlight: endDateFilter,
      allFlights: filterFlights,
      filtersDate: filterFlights
    })
  }

  _handleChangePassenger(event) {
    this.setState({ passengerName: event.target.value });

  }

  _handleChangePassengerFilter = () => {
    let filterTickets = this.state.allTickets.filter(ticket => ticket.passenger["firstName"] === this.state.passengerName);
    let filterFlights = [];
    this.state.allFlights.forEach(flight => {
      filterTickets.forEach(ticket => {
        if (flight._id === ticket.flight_id && !filterFlights.includes(flight)) {
          filterFlights.push(flight)
        }
      });
    });
    this.setState({
      allFlights: filterFlights
    })
  }

  _handleChangeSelectState(event) {
    let stateFilter = event.target.value;
    let filterFlights = this.state.endDateFlight === '' ? this.state.flightsTemp.filter(item => item.state === stateFilter) : this.state.filtersDate.filter(item => item.state === stateFilter);
    this.setState({
      stateFlight: stateFilter,
      allFlights: filterFlights,
      filtersState: filterFlights
    })
  }

  _handleChangeStartDate(event) {
    this.setState({ startDateFlight: event.target.value });
  }

  _onClickRefresTickets = async () => {
    this.setState({
      allFlights: this.state.flightsTemp,
      stateFlight: '', startDateFlight: '', endDateFlight: '',
    })
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSelectOrigin" >
              <Form.Label>Nombre
              </Form.Label>
              <IconButton aria-label="searchName" onClick={this._handleChangePassengerFilter}>
                <FindReplaceIcon />
              </IconButton>
              <Form.Control type='string' placeholder='Nombre de pasajero' onChange={this._handleChangePassenger.bind(this)}>

              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectState" >
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectState.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar un estado de vuelo</option>
                <option value={'A tiempo'}>A Tiempo</option>
                <option value={'Retrasado'}>Retrasado</option>
                <option value={'Cancelado'}>Cancelado</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlInputStartDate">
              <Form.Label>Desde</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeStartDate.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId="ControlInputEndDate">
              <Form.Label>Hasta</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeEndDate.bind(this)} />
            </Form.Group>
          </Form.Row>
        </Form>
        <div style={{ marginTop: '5%' }}>
          <IconButton aria-label="refresh" onClick={this._onClickRefresTickets}>
            <Refresh />
          </IconButton>
          <Table striped bordered hover responsive >
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
                <th>Boletos</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allFlights.map((flight, indexF) => (
                <tr key={indexF}>
                  <td>{flight._id}</td>
                  <td>{flight.name}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>Salida: {flight.takeOff} [{flight.departure}] - Llegada: {flight.landing} [{flight.arrives}]</td>
                  <td>$ {flight.price}</td>
                  <td>{flight.state}</td>
                  <td>{flight.capacityPlane}</td>
                  <td>{flight.airline_id}</td>
                  <td>{JSON.stringify(flight.restrictions)}</td>
                  <td>{JSON.stringify(flight.services)}</td>
                  <td>
                    {this.state.allTickets.map((ticket, index) => (
                      flight._id === ticket.flight_id ? (
                        <p key={index}>Código: {ticket._id} | Pasajero: {ticket.passenger["firstName"]}.</p>
                      ) : null
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}


export default Report1;
