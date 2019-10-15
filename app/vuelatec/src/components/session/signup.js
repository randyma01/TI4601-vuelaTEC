import React from 'react';
import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SimpleCrypto from 'simple-crypto-js';

import Menu from '../menu';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      passwordConfirm: '',
      birthDay: '',
      phone: '',
      phones: [],
      country: '',
      address: '',
      isCreateAccount: false,
      listCountries: [],
      listCities: []
    };
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            listCountries: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });

  }

  _createUser = async (password) => {
    return fetch(`URL_API?param=${this.state.id}&param=${this.state.userName}&param=${password}&param=${this.state.lastName}
    &param=${this.state.birthDay}&param=${this.state.country}&param=${this.state.address}&param=${this.state.phones}&param=${this.state.firstName}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            isCreateAccount: true
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleChangeBirthDay(event) {
    this.setState({ birthDay: event.target.value })
  }

  _handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value })
  }

  _handleChangeId(event) {
    this.setState({ id: event.target.value })
  }

  _handleChangeLastName(event) {
    this.setState({ lastName: event.target.value })
  }

  _handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  _handleChangePasswordConfirm(event) {
    this.setState({ passwordConfirm: event.target.value })
  }

  _handleChangePhone(event) {
    this.setState({ phone: event.target.value })
  }

  _handleChangeSelectCity(event) {
    this.setState({ address: event.target.value })
  }

  _handleChangeSelectCountry = async (event) => {
    const item = await JSON.parse(event.target.value.toString())
    this.setState({
      country: item["country"],
      codeCountry: item["code"]
    })
    fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            listCities: responseJson[this.state.country]
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _handleChangeUserName(event) {
    this.setState({ userName: event.target.value })
  }

  _onClckAddPhone = () => {
    if (this.state.phone !== '') {
      this.setState({
        phones: [...this.state.phones, this.state.phone],
        phone: ''
      })
    }
  }

  _submitData = () => {
    if (this.state.country === '' || this.state.address === '') {
      window.confirm("Debe seleccionar un pais y una ciudad.")
    }
    else if (this.state.firstName === '' || this.state.lastName === '') {
      window.confirm("Debe ingresar nombre completo.")
    }
    else if (this.state.id === '' || this.state.userName === '') {
      window.confirm("Debe ingresar numero de identificacion y usuario.")
    }
    else if (this.state.birthDay === '') {
      window.confirm("Debe ingresar una fecha de nacimiento valida.")
    }
    else if (this.state.phones == '') {
      window.confirm("Debe ingresar al menos un numero telefonico.")
    }
    else if (this.state.password === '' || this.state.passwordConfirm === '') {
      window.confirm("Debe ingresar una contraseña para crear la cuenta.")
    }
    else if (this.state.password !== this.state.passwordConfirm) {
      window.confirm("La contraseña de confirmacion es incorrecta, valide.")
    }
    else {
      const simpleCrypto = new SimpleCrypto('vtecAPP');
      const passwordEncrypt = simpleCrypto.encrypt(this.state.password);
      /* const simpleCrypto = new SimpleCrypto('vtecAPP');
      const passwordDecrypt = simpleCrypto.decrypt(this.state.userPassword); */
      window.confirm(this.state.firstName + " " + this.state.lastName + " " +
        this.state.id + " " + this.state.userName + " " + passwordEncrypt + " " + this.state.birthDay + " " + this.state.country + " " +
        this.state.address + " " + this.state.phones);
      //this._createUser(passwordEncrypt);
    }
  };

  render() {
    if (this.state.isCreateAccount) {
      return (
        <Menu />
      );
    } else {
      return (
        <Container>
          <div style={{ margin: '2%' }}>
            <h1 align='center'>Crear Cuenta de Pasajero en VuelaTEC</h1>
          </div>
          <Row className='justify-content-md-center'>
            <Col xs lg='2'></Col>
            <Col md='auto'>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId='formGridName'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='name' placeholder='Nombre' value={this.state.firstName} onChange={this._handleChangeFirstName.bind(this)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLastname'>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type='name' placeholder='Apellido' value={this.state.lastName} onChange={this._handleChangeLastName.bind(this)} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridId'>
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control type='number' placeholder='Numero de identificacion o pasaporte' value={this.state.id} onChange={this._handleChangeId.bind(this)} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridUsername'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type='string' placeholder='Usuario' value={this.state.userName} onChange={this._handleChangeUserName.bind(this)} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridPassword'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='Contraseña' value={this.state.password} onChange={this._handleChangePassword.bind(this)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridPasswordConfirm'>
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='Contraseña' value={this.state.passwordConfirm} onChange={this._handleChangePasswordConfirm.bind(this)} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridBirthDay'>
                    <Form.Label>Fecha de Naciemiento</Form.Label>
                    <Form.Control type="date" placeholder="dd/mm/yyyy" value={this.state.birthDay} onChange={this._handleChangeBirthDay.bind(this)} />
                  </Form.Group>
                </Form.Row>


                <Form.Row>
                  <Form.Group as={Col} controlId="ControlSelectCountry">
                    <Form.Label>País</Form.Label>
                    <Form.Control as="select" onChange={this._handleChangeSelectCountry.bind(this)}>
                      {this.state.listCountries.map((item) => (
                        <option value={'{"country":"' + item.name + '", "code":"' + item.callingCodes + '"}'} >{item.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="ControlSelectCity">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control as="select" value={this.state.address} onChange={this._handleChangeSelectCity.bind(this)}>
                      {this.state.listCities.map((item, key) => (
                        <option key={key}>{item}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Label>Número de Telefóno</Form.Label>
                    <Form.Control type='number' placeholder='Numero telefonico' value={this.state.phone} onChange={this._handleChangePhone.bind(this)} />
                  </Form.Group>

                  <Form.Group controlID='formGridAddPhone'>
                    <Fab variant="extended" aria-label="add" onClick={this._onClckAddPhone}>
                      <AddIcon />
                      Agregar Numero
                  </Fab>
                    {this.state.phones.map((item, key) => (
                      <p style={{ margin: '2%' }} key={key}> (+{this.state.codeCountry})  {item}</p>
                    ))}
                  </Form.Group>

                </Form.Row>

              </Form>
            </Col>
            <Col xs lg='2'></Col>
          </Row>

          <Row className='justify-content-md-center' style={{ margin: '3%' }}>
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
                >
                  <a href="http://localhost:8080" style={{ color: 'white', textDecoration: 'none' }}>Cancelar</a>
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
