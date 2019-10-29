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
    if (this.state.password === '' || this.state.userName === '') {
      this.setState({
        messageError: 'Debe ingresar nombre de usuario y contraseña.'
      })
    }
    else if (await this._verifyData() === 0) {
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
    const simpleCrypto = new SimpleCrypto('vtecAPP');
    let data = {
      username: this.state.userName
    }
    return await fetch('http://localhost:3000/login/',
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
          let passwordDecrypt = simpleCrypto.decrypt(responseJson[0].password);
          this.setState({
            dataUser: responseJson[0]
          })
          return this.state.password.localeCompare(passwordDecrypt);
        }
      })
      .catch(error => {
        console.error(error);
      });
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
                size='lg'
                type='submit'
                onClick={this._submitData}
              >
                Ingresar
            </Button>
            </div>

            <div>
              <Col md='auto'>
                <Button
                  variant='primary'
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
