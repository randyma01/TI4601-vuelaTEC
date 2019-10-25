import React from 'react';
import { Button, Container, Col, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Report1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: '',
      passengerName: '',
      result: [],
      state: '',
      startDate: ''
    };
  }

  _handleChangeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  _handleChangePassenger(event) {
    this.setState({ passengerName: event.target.value });
  }

  _handleChangeSelectState(event) {
    this.setState({ state: event.target.value })
  }

  _handleChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  _submitData = async () => {
    if (this.state.passengerId !== '') {
      await fetch(`http://localhost:3000/admin/rangeTicketsPassengers/${this.state.passengerId}`,
        {
          method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson !== '') {
            this.setState({
              result: responseJson
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
        <Form>
          <Form.Row style={{ marginTop: '4%' }}>
            <Form.Group as={Col} controlId="ControlSelectOrigin" >
              <Form.Label>Nombre</Form.Label>
              <Form.Control type='number' placeholder='Nombre de pasajero' value={this.state.passengerId} onChange={this._handleChangePassenger.bind(this)} />
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
            <Form.Group as={Col} controlId='formGridName'>
              <Button
                variant='primary'
                size='lg'
                onClick={this._submitData}>
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


export default Report1;
