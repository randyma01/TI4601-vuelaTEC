import React from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from '../menu';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: false,
      lastName: '',
      usuario: '',
      password: '',
      passwordConfirm: '',
      id: '',
      number: '',
      province: '',
      type: '',
      isCreateAccount: false
    };
  }


  _createUser = async () => {
    return fetch('localhost:8080/ap')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            weatherday: responseJson
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _cancelPrssed = () => {
    // redirigir a la venta de login
    console.log('Click!');
  };

  _submitData = () => {
    //validar data
    /// si es correcta cambiar ventana ventana principal
    /// si es inorrecta mandar alerta de error
    console.log('Click!');
    this.setState({ isCreateAccount: true })
  };

  render() {
    if (this.state.isCreateAccount) {
      return (
        <Menu />
      );
    } else {
      return (
        <Container>
          <h1 align='center'>Crear Cuenta en FarmaTEC</h1>
          <Row className='justify-content-md-center'>
            <Col xs lg='2'></Col>
            <Col md='auto'>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId='formGridName'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='name' placeholder='Nombre' />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLastname'>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type='name' placeholder='Apellido' />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridId'>
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control type='string' placeholder='1124659357' />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Label>Número de Telefóno</Form.Label>
                    <Form.Control type='string' placeholder='65742964' />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridUsername'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type='string' placeholder='e.g. farmatec.19' />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridPassword'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='********' />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridPasswordConfirm'>
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='********' />
                  </Form.Group>
                </Form.Row>

                <Form.Group id='formGridCheckboxBronze' align='center'>
                  <Form.Check type='checkbox' label='Bronce' />
                </Form.Group>

                <Form.Group id='formGridCheckboxGold' align='center'>
                  <Form.Check type='checkbox' label='Oro' />
                </Form.Group>

                <Form.Group id='formGridCheckboxPlatinum' align='center'>
                  <Form.Check type='checkbox' label='Platino' />
                </Form.Group>
              </Form>
            </Col>
            <Col xs lg='2'></Col>
          </Row>

          <Row className='justify-content-md-center'>
            <div>
              <Button
                variant='primary'
                type='submit'
                size='lg'
                onClick={this._submitData}
              >
                Aceptar
            </Button>
            </div>

            <div>
              <Col md='auto'>
                <Button
                  variant='primary'
                  type='submit'
                  size='lg'
                  onClick={this._CancelPressed}
                >
                  Cancelar
              </Button>
              </Col>
            </div>
          </Row>
        </Container>
      );
    }
  }
}
export default Signup;
