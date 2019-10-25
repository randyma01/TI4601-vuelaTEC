import React from 'react';
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passengerId: '',
      result: []
    };
  }

  _handleChangePassenger(event) {
    this.setState({ passengerId: event.target.value });
  }

  _onClickSearhPassenger = async () => {
    if (this.state.passengerId !== '') {
      await fetch(`http://localhost:3000/employee/passengerInfo/${this.state.passengerId}`,
        {
          method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson !== '') {
            this.setState({
              result: responseJson,
              passengerId: ''
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      window.confirm("Debe ingresar indentifiación del pasajero.")
    }
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '5%' }}>
          <h5 align='center'>Consultar información de un pasajero</h5>
        </div>
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSearchPassenger" >
              <Form.Label>Numero de cedula</Form.Label>
              <Form.Control type='number' placeholder='Cedula de pasajero' value={this.state.passengerId} onChange={this._handleChangePassenger.bind(this)} />
            </Form.Group>
            <Form.Group as={Col} controlId='formIdPassenger'>
              <Button
                variant='primary'
                size='lg'
                onClick={this._onClickSearhPassenger}>
                Buscar
                </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <div style={{ margin: '5%' }}>
          <Table responsive>
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Correo electrónico</th>
                <th>País</th>
                <th>Dirección</th>
                <th>Telefonos</th>
                <th>Fecha Nacimiento</th>
                <th>Tickets-Info</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.country}</td>
                  <td>{item.address}</td>
                  <td>{JSON.stringify(item.phone)}</td>
                  <td>{item.birthday}</td>
                  <td>{item.ticketsInfo.map((ticket, index) => (<div key={index}>Código: {ticket._id}</div>))}</td>
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
