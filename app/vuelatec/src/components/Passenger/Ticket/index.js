import React from 'react';
import { Button, Container, Col, Form, Modal, Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import IconButton from '@material-ui/core/IconButton';

class Ticket extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      citiesDestination: [],
      citiesOrigin: [],
      countries: [],
      countryDestination: '',
      countryOrigin: '',
      dataUser: props.dataUser,
      destination: '',
      endDate: '',
      infoBuyTicker: [],
      origin: '',
      passengerId: '',
      result: [],
      startDate: ''
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const countries = await fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          return Object.keys(responseJson).sort()
        }
      })
      .catch(error => {
        console.error(error);
      });
    fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '' && this._isMounted) {
          const tempCountries = []
          responseJson.forEach(element => {
            if (countries.includes(element.name)) {
              tempCountries.push(element);
            }
          })
          this.setState({
            countries: tempCountries
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

  _handleChangeAmountBuyTicket(event) {
    let infoBuyTickerTemp = this.state.infoBuyTicker;
    infoBuyTickerTemp.amount = event.target.value;
    this.setState({ infoBuyTicker: infoBuyTickerTemp });
  }

  _handleChangeBagaggeBuyTicket(event) {
    let infoBuyTickerTemp = this.state.infoBuyTicker;
    infoBuyTickerTemp.bagagge = event.target.value;
    this.setState({ infoBuyTicker: infoBuyTickerTemp });
  }

  _handleChangeCarryOnBuyTicket(event) {
    let infoBuyTickerTemp = this.state.infoBuyTicker;
    infoBuyTickerTemp.carryOn = event.target.value;
    this.setState({ infoBuyTicker: infoBuyTickerTemp });
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
    this.setState({
      countryDestination: event.target.value,
      isLoadCountriesDestination: true
    })
    fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            citiesDestination: responseJson[this.state.countryDestination].sort(),
            isLoadCountriesDestination: false
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleChangeSelectCountryOrigin(event) {
    this.setState({
      countryOrigin: event.target.value,
      isLoadCountriesOrigin: true
    })
    fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            citiesOrigin: responseJson[this.state.countryOrigin].sort(),
            isLoadCountriesOrigin: false
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  _onClickBuyTicket = async (flight) => {
    let verify = window.confirm(`Desea comprar boletos para el vuelo: ${flight}`);
    if (verify) {
      //random id ticket
      const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
      let randomStringTicket_id = [...Array(3)].map(i => chars[Math.random() * chars.length | 0]).join``;
      let randomNumberTicket_id = Math.floor((Math.random() * 999) + 1);
      let dataTicket = {
        _id: randomStringTicket_id + randomNumberTicket_id,
        amount: '',
        bagagge: '',
        boarded: false,
        carryOn: '',
        checked: false,
        dateBought: new Date().toISOString().slice(0, 10),
        flight_id: flight,
        passenger_id: this.state.dataUser._id,
        seats: []
      }
      this.setState({
        infoBuyTicker: dataTicket,
        isOpenBuyTicker: true
      })
    }
  };

  _onClickModalAcceptBuyTicket = async () => {
    await fetch('http://localhost:3000/passenger/buyTicket/',
      {
        method: "POST",
        body: JSON.stringify(this.state.infoBuyTicker),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson._id === this.state.infoBuyTicker._id) {
          window.confirm(`Se realizo correctamente la compra.`)
        }
      })
      .catch(error => {
        console.error(error);
      });
    let sendDataTicket = {
      flightId: this.state.infoBuyTicker.flight_id
    }
    let updateFlight = await fetch('http://localhost:3000/passenger/soldTicket/',
      {
        method: "PUT",
        body: JSON.stringify(sendDataTicket),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    if (updateFlight.ok) {
      this.setState({ infoBuyTicker: [], result: [], isOpenBuyTicker: false })
    }

  }

  _onClickModalCancelBuyTicket = () => {
    this.setState({ isOpenBuyTicker: false })
  }

  _onClickSearchFlights = async () => {
    if (this.state.origin === '' || this.state.destination === '') {
      window.confirm("Debe ingresar origen y destino para la busqueda.")
    }
    else if (this.state.endDate === '' || this.state.startDate === '') {
      window.confirm("Debe ingresar un rango de fehcas.")
    }
    else {
      let data = {
        origin1: this.state.origin,
        destination1: this.state.destination,
        date1: this.state.startDate,
        date2: this.state.endDate
      }
      await fetch('http://localhost:3000/flights/',
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ result: responseJson, origin: '', destination: '', endDate: '', startDate: '', citiesDestination: [], citiesOrigin: [] })
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    const spinnerCitiesOrigin = this.state.isLoadCountriesOrigin ? (
      <Spinner animation="grow" />
    ) : null;
    const spinnerCitiesDestination = this.state.isLoadCountriesDestination ? (
      <Spinner animation="grow" />
    ) : null;
    const modalBuyTicket = this.state.isOpenBuyTicker ? (
      <Modal
        show={this.state.isOpenBuyTicker}
        onHide={this._onClickModalCancelBuyTicket}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header >
          <Modal.Title id="example-custom-modal-styling-title">
            Comprar Boleto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '2%', textAlign: 'center' }}>
            <h6>Boleto Generado:  {this.state.infoBuyTicker._id}</h6>
            <h6>Vuelo {this.state.infoBuyTicker.flight_id}</h6>
          </div>
          <Form>
            <Form.Row style={{ marginTop: '2%' }}>
              <Form.Group as={Col} controlId="ControlInputAmountTicketBuy">
                <Form.Label>Cantidad de boletos</Form.Label>
                <Form.Control type="number" placeholder="boletos" onChange={this._handleChangeAmountBuyTicket.bind(this)} />
              </Form.Group>
            </Form.Row>
            <Form.Row style={{ marginTop: '2%' }}>
              <Form.Group as={Col} controlId="ControlInputEndDateBuy">
                <Form.Label>Cantidad de Maletas</Form.Label>
                <Form.Control type="number" placeholder="maletas en bodega" onChange={this._handleChangeBagaggeBuyTicket.bind(this)} />
              </Form.Group>
            </Form.Row>
            <Form.Row style={{ marginTop: '2%' }}>
              <Form.Group as={Col} controlId="ControlInputEndDateBuy">
                <Form.Label>Cantidad de Maletas de Mano</Form.Label>
                <Form.Control type="number" placeholder="maletas de mano" onChange={this._handleChangeCarryOnBuyTicket.bind(this)} />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this._onClickModalCancelBuyTicket}> Cancelar</Button>
          <Button variant="primary" onClick={this._onClickModalAcceptBuyTicket}>Confirmar Compra</Button>
        </Modal.Footer>
      </Modal >
    ) : null;
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Comprar Boletos</h3>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSelectDestinationCountry" >
              <Form.Label>País de Origen</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCountryOrigin.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar país origen</option>
                {this.state.countries.map((item, index) => (
                  <option value={item.name} key={index} >{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectOriginCity" >
              <Form.Label>Cuidad de Origen {spinnerCitiesOrigin}</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCityOrigin.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar cuidad origen</option>
                {this.state.citiesOrigin.map((item, index) => (
                  <option value={item} key={index} >{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectDestinationCountry" >
              <Form.Label>País de Destino</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCountryDestination.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar país destino</option>
                {this.state.countries.map((item, index) => (
                  <option value={item.name} key={index} >{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="ControlSelectDestinationCity" >
              <Form.Label>Cuidad de Destino {spinnerCitiesDestination}</Form.Label>
              <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCityDestination.bind(this)}>
                <option value={'DEFAULT'} disabled hidden>Seleccionar cuidad destino</option>
                {this.state.citiesDestination.map((item, index) => (
                  <option value={item} key={index} >{item}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlInputStartDateBuy">
              <Form.Label>Desde</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeStartDate.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId="ControlInputEndDateBuy">
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
        <div style={{ marginTop: '5%' }}>
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
                <th>Comprar Boleto</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((item, index) => (
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
                  <td>
                    <IconButton aria-label="apply" style={{ color: 'green' }} onClick={this._onClickBuyTicket.bind(this, item._id)}>
                      <ConfirmationNumberIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {modalBuyTicket}
        </div>
      </Container>
    );
  }
}


export default Ticket;
