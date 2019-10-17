import React from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import Menu from '../menu';
import SignUp from './signup';
import Logo from '../../images/iconVuelaTEC.jpg';
import SimpleCrypto from 'simple-crypto-js';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isCreateAccount: false,
      userName: '',
      password: '',
      dataUser: [],
      messageError: ''
    };

  }

  _onSearchUser = event => {
    this.setState({
      userName: event.target.value
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
    if (await this._verifyData() == 0) {
      this.setState({
        isLoading: true,
        messageError: ''
      });
    }
    else {
      this.setState({
        messageError: 'El nombre de usuario o contraseña son invalidos, por favor verifique.'
      })
    }
  };

  _verifyData = async () => {
    const passwordDB = '12345' //TODO GET Password from databse where userName==this.state.userName
    const simpleCrypto = new SimpleCrypto('vtecAPP');
    const passwordEncrypt = simpleCrypto.encrypt(passwordDB); //DELETE
    const passwordDecrypt = simpleCrypto.decrypt(passwordEncrypt);
    return this.state.password.localeCompare(passwordDecrypt)
  }

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
          <div style={{ margin: '4%' }}>
            <img style={{ marginLeft: '20%' }} src={Logo} alt="logo.png"></img>
          </div>
          <Row className='justify-content-md-center' style={{ marginTop: '3%' }}>
            <Col md='auto'>
              <Form>
                <Form.Group controlId='formBasicUser' style={{ marginTop: '3%' }}>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type='string'
                    placeholder='Nombre de usuario'
                    onChange={this._onSearchUser}
                    value={this.state.userName}
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
          <Row className='justify-content-md-center' style={{ margin: '2%' }}>
            <div>
              <p style={{ color: 'red' }}>{this.state.messageError}</p>
            </div>
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
