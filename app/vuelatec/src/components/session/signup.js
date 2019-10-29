import React from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SimpleCrypto from 'simple-crypto-js';

import Menu from '../menu';

class Signup extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      birthDay: '',
      country: '',
      email: '',
      firstName: '',
      id: '',
      isCreateAccount: false,
      lastName: '',
      listCities: [],
      listCountries: [],
      password: '',
      passwordConfirm: '',
      phone: '',
      phones: [],
      user: [],
      userName: ''
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
            listCountries: tempCountries
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

  _handleChangeBirthDay(event) {
    this.setState({ birthDay: event.target.value })
  }

  _handleChangeEmail(event) {
    this.setState({ email: event.target.value })
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
      codeCountry: item["code"],
      isLoadCities: true
    })
    fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            listCities: responseJson[this.state.country].sort(),
            isLoadCities: false
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

  _submitData = async () => {
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
    else if (this.state.email === '') {
      window.confirm("Debe ingresar un correo valido.")
    }
    else if (this.state.phones.length === 0) {
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
      let data = {
        _id: this.state.id,
        address: this.state.address,
        birthday: this.state.birthDay,
        country: this.state.country,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: passwordEncrypt,
        phone: this.state.phones,
        username: this.state.userName
      }
      let result = await fetch('http://localhost:3000/passenger/createProfile/',
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      if (result.ok) {
        window.confirm("¡Bienvenido al sistema VuelaTEC!");
        this.setState({
          isCreateAccount: true,
          user: [{ '_id': this.state.id }]
        })
      }
    }
  };

  render() {
    const spinnerCities = this.state.isLoadCities ?
      (
        <Spinner animation="grow" />
      ) : null;
    if (this.state.isCreateAccount) {
      return (
        <Menu dataUser={this.state.user[0]} />
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
                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type='email' placeholder='Correo electrónico' value={this.state.email} onChange={this._handleChangeEmail.bind(this)} />
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
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" placeholder="dd/mm/yyyy" value={this.state.birthDay} onChange={this._handleChangeBirthDay.bind(this)} />
                  </Form.Group>
                </Form.Row>


                <Form.Row>
                  <Form.Group as={Col} controlId="ControlSelectCountry">
                    <Form.Label>País</Form.Label>
                    <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCountry.bind(this)}>
                      <option value={'DEFAULT'} disabled hidden>Seleccionar un país</option>
                      {this.state.listCountries.map((item, index) => (
                        <option value={'{"country":"' + item.name + '", "code":"' + item.phone_code + '"}'} key={index} >{item.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="ControlSelectCity">
                    <Form.Label>Ciudad {spinnerCities}</Form.Label>
                    <Form.Control as="select" defaultValue={'DEFAULT'} onChange={this._handleChangeSelectCity.bind(this)}>
                      <option value={'DEFAULT'} disabled hidden>Seleccionar una cuidad</option>
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

                  <Form.Group controlId='formGridAddPhone'>
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
