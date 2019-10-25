import React from 'react';
import { Button, Container, Col, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      countries: [],
      countryDestination: '',
      countryOrigin: '',
      destination: '',
      endDate: '',
      origin: '',
      passengerId: '',
      result: [],
      startDate: ''
    };
  }

  _handleChangeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  _handleChangeSelectCityDestination(event) {
    this.setState({ destination: event.target.value })
  }

  _handleChangeSelectCityOrigin(event) {
    this.setState({ origin: event.target.value });
  }

  _handleChangeSelectCountryDestination(event) {
    this.setState({ countryDestination: event.target.value })
  }

  _handleChangeSelectCountryOrigin(event) {
    this.setState({ countryOrigin: event.target.value });
  }

  _handleChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  _onClickSearchFlights = async () => {
    if (this.state.origin === '' || this.state.destination === '') {
      window.confirm("Debe ingresar origen y destino para la busqueda.")
    }
    else if (this.state.endDate === '' || this.state.startDate === '') {
      window.confirm("Debe ingresar un rango de fehcas.")
    }
    else {
      this.setState({
        result: []
      })
      await fetch('URL_GET_Flights_byFilters',
        {
          method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ result: responseJson, origin: '', destination: '', endDate: '', startDate: '' })
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  _submitData = async () => {
    //TODO
  }


  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Comprar Boletos</h3>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSelectDestination" >
              <Form.Label>País de Origen</Form.Label>
              <Form.Control as="select" value={this.state.countryOrigin} onChange={this._handleChangeSelectCountryOrigin.bind(this)}>
                <option>Seleccionar pais origen</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectOrigin" >
              <Form.Label>Cuidad de Origen</Form.Label>
              <Form.Control as="select" value={this.state.origin} onChange={this._handleChangeSelectCityOrigin.bind(this)}>
                <option>Seleccionar cuidad origen</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectDestination" >
              <Form.Label>País de Destino</Form.Label>
              <Form.Control as="select" value={this.state.countryDestination} onChange={this._handleChangeSelectCountryDestination.bind(this)}>
                <option>Seleccionar pais destino</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectDestination" >
              <Form.Label>Cuidad de Destino</Form.Label>
              <Form.Control as="select" value={this.state.destination} onChange={this._handleChangeSelectCityDestination.bind(this)}>
                <option>Seleccionar cuidad destino</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlInputStartDate">
              <Form.Label>Desde</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeStartDate.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId="ControlInputEndDate">
              <Form.Label>Hasta</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeEndDate.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridName'>
              <Button
                variant='primary'
                size='lg'
                onClick={this._onClickSearchFlights}>
                Buscar
                </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <div style={{ margin: '5%' }}>
          <Table responsive>
            <thead>
              <tr>
                <th>Columnas resultado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}


export default Ticket;
