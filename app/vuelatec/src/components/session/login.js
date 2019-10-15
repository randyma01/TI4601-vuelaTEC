import React from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import Menu from '../menu';
import SignUp from './signup';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isCreateAccount: false,
      name: '',
      password: '',
      dataUser: []
    };

  }

  _onSearchUser = event => {
    this.setState({
      name: event.target.value
    });
  };

  _onSearchPasswordUser = event => {
    this.setState({
      password: event.target.value
    });
  };


  _onSignUpPressed = () => {
    this.setState({ isCreateAccount: true })
  };

  _submitData = async () => {
    this.setState({ 
      isLoading: true
    });
  };



  render() {
    if (this.state.isLoading) {
      return (
        <Menu dataUser={this.state.dataUser} />
      );
    }
    else if (this.state.isCreateAccount) {
      return (
        <SignUp />
      )
    }
    else {
      return (
        <Container>
          <h1 align='center' style={{ marginTop: '4%' }}>VuelaTEC</h1>
          <Row className='justify-content-md-center' style={{ marginTop: '3%' }}>
            <Col md='auto'>
              <Form>
                <Form.Group controlId='formBasicUser' style={{ marginTop: '3%' }}>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type='string'
                    placeholder='e.g. farmatec.19'
                    onChange={this._onSearchUser}
                    value={this.state.name}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' style={{ marginTop: '3%' }}>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Contraseña'
                    onChange={this._onSearchPasswordUser}
                    value={this.state.password}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className='justify-content-md-center' style={{ marginTop: '3%' }}>
            <div >
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
                  onClick={this._onSignUpPressed}
                >
                  Crear Cuenta
              </Button>
              </Col>
            </div>
          </Row>
        </Container>
      );
    }
  }
}
export default LogIn;
