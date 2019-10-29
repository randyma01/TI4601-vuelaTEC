import React from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPassenger: '',
      idTicket: '',
      isNotFound: false,
      result: []
    };
  }

  _handleChangePassenger(event) {
    this.setState({ idPassenger: event.target.value })
  }

  _handleChangeTicket(event) {
    this.setState({ idTicket: event.target.value })
  }

  _onClickVerifyCheckIn = async () => {
    if (this.state.idTicket === '' || this.state.idPassenger === '') {
      window.confirm("Debe ingresar parametros de busqueda.")
    } else {
      let data = {
        passengerId: this.state.idPassenger,
        ticketId: this.state.idTicket
      }
      await fetch('http://localhost:3000/employee/checkIn/',
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson !== '') {
            this.setState({
              result: responseJson,
              idTicket: '',
              idPassenger: '',
              isNotFound: true
            });
          }
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
          <h6 align='center'>Verificar información de check-in</h6>
        </div>
        <div style={{ margin: '5%' }}>
          <Form>
            <Form.Row style={{ marginTop: '2%' }}>
              <Form.Group as={Col} controlId='formGridPassenher'>
                <Form.Control type='string' placeholder='Identificador de pasajero' value={this.state.idPassenger} onChange={this._handleChangePassenger.bind(this)} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridTicket'>
                <Form.Control type='string' placeholder='Código de boleto' value={this.state.idTicket} onChange={this._handleChangeTicket.bind(this)} />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridButtonVerify'>
                <Button onClick={this._onClickVerifyCheckIn}>Verificar</Button>
              </Form.Group>
            </Form.Row>
          </Form>
          {this.state.result.length === 0 ? (
            <div style={{ margin: '5%' }}>
              <Alert key={0} variant="danger" show={this.state.isNotFound}>
                <Alert.Heading>Datos No Coinciden</Alert.Heading>
                <hr />
                <p>No se ha encontrado el boleto para el pasajero indicado.</p>
                <hr />
              </Alert>
            </div>
          ) : (
              <div style={{ margin: '5%' }}>
                <Alert key={1} variant="info" show={this.state.result[0].checked}>
                  <Alert.Heading>Check-in Realizado</Alert.Heading>
                  <hr />
                  <p>El pasajero a realizado correctamente check-in con el boleto {this.state.result[0]._id}. </p>
                  <hr />
                </Alert>
                <Alert key={2} variant="warning" show={!this.state.result[0].checked}>
                  <Alert.Heading>Check-in No Realizado</Alert.Heading>
                  <hr />
                  <p>El pasajero no ha realizado el correspondiente check-in al boleto {this.state.result[0]._id}. </p>
                  <hr />
                </Alert>
              </div>
            )}
        </div>
      </Container >
    );
  }
}


export default Flight;
