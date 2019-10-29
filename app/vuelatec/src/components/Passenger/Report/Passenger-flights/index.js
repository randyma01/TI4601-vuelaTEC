import React from 'react';
import { Col, Container, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

class Report extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      allFlights: [],
      stateFlight: '',
      startDateFlight: '',
      endDateFlight: '',
      filtersDate: [],
      filtersState: [],
      tickets: [],
      flights: [],
      flightsTemp: [],
      dataUser: props.dataUser
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    await fetch(`http://localhost:3000/passenger/myTickets/${this.state.dataUser._id}`,
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          this.setState({
            tickets: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    await fetch('http://localhost:3000/passengers/allFlights/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          this.setState({
            allFlights: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    if (this._isMounted) {
      this.state.allFlights.forEach(flight => {
        this.state.tickets.forEach(ticket => {
          if (flight._id === ticket.flight_id && !this.state.flights.includes(flight)) {
            this.setState({
              flights: [...this.state.flights, flight],
              flightsTemp: [...this.state.flightsTemp, flight],
            })
          }
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _handleChangeEndDate(event) {
    let endDateFilter = event.target.value;
    let filterFlights = this.state.stateFlight === '' ? this.state.flightsTemp.filter(item => item.takeOff >= this.state.startDateFlight && item.landing <= endDateFilter) : this.state.filtersState.filter(item => item.takeOff >= this.state.startDateFlight && item.landing <= endDateFilter);
    this.setState({
      endDateFlight: endDateFilter,
      flights: filterFlights,
      filtersDate: filterFlights
    })
  }

  _handleChangeSelectState(event) {
    let stateFilter = event.target.value;
    let filterFlights = this.state.endDateFlight === '' ? this.state.flightsTemp.filter(item => item.state === stateFilter) : this.state.filtersDate.filter(item => item.state === stateFilter);

    if (stateFilter === 'Todos') {
      this.setState({
        stateFlight: stateFilter,
        flights: this.state.flightsTemp,
        filtersState: filterFlights
      })
    } else {
      this.setState({
        stateFlight: stateFilter,
        flights: filterFlights,
        filtersState: filterFlights
      })
    }
  }

  _handleChangeStartDate(event) {
    this.setState({ startDateFlight: event.target.value });
  }

  _onClickRefresTickets = async () => {
    this.setState({
      flights: this.state.flightsTemp,
      stateFlight: '', startDateFlight: '', endDateFlight: ''
    })
  }


  render() {
    return (
      <Container>
        <div style={{ margin: '5%' }}>
          <h5 align='center'>Consultar mis vuelos</h5>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSelectState" >
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectState.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar un estado de vuelo</option>
                <option value={'Todos'}>Todos</option>
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
                <th>Ticket</th>
              </tr>
            </thead>
            <tbody>
              {this.state.flights.map((flight, indexF) => (
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
                    {this.state.tickets.map((ticket, index) => (
                      flight._id === ticket.flight_id ? (
                        JSON.stringify(ticket)
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


export default Report;
