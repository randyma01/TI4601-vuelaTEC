import React from 'react';
import { Col, Container, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateFlight: '',
      startDateFlight: '',
      endDateFlight: '',
      flights: [],
      dataUser: props.dataUser
    };
  }

  componentDidMount = async () => {
    await fetch(`http://localhost:3000/passenger/myTickets/${this.state.dataUser._id}`,
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            flights: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleChangeEndDate(event) {
    this.setState({ endDendDateFlightate: event.target.value });
  }

  _handleChangeSelectState(event) {
    this.setState({ stateFlight: event.target.value })
  }

  _handleChangeStartDate(event) {
    this.setState({ startDateFlight: event.target.value });
  }

  _onClickRefresTickets = async () => {
    await fetch(`http://localhost:3000/passenger/myTickets/${this.state.dataUser._id}`,
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            flights: responseJson
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
        <div style={{ margin: '5%' }}>
          <h5 align='center'>Consultar mis vuelos</h5>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
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
        <div style={{ margin: '5%' }}>
          <IconButton aria-label="refresh" onClick={this._onClickRefresTickets}>
            <Refresh />
          </IconButton>
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
                <th>Estado de check-in</th>
              </tr>
            </thead>
            <tbody>
              {this.state.flights.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.flight_id}</td>
                  <td>{item.passenger_id}</td>
                  <td>{item.amount}</td>
                  <td>{item.baggage}</td>
                  <td>{item.dateBought}</td>
                  <td>{JSON.stringify(item.seats)}</td>
                  <td>{item.boarded ? ('Abordado') : 'Sin abordar'}</td>
                  <td>{item.checked ? ('Chequeado') : 'Sin chequear'}</td>
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
