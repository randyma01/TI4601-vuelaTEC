import React from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SimpleCrypto from 'simple-crypto-js';
import Login from '../../session/login';
import { Redirect } from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: props.dataUser,
      isDeleteAccount: false,
      address: '',
      birthDay: '',
      country: '',
      email: '',
      firstName: '',
      id: '',
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
    await fetch(`http://localhost:3000/passenger/myProfile/${this.state.dataUser._id}`,
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            dataUser: responseJson,
            phones: responseJson.phone
          });
        }
      })
      .catch(error => {
        console.error(error);
      });

    const countries = await fetch('https://raw.githubusercontent.com/shivammathur/countrycity/master/data/geo.json',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
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
        if (responseJson !== '') {
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


  _handleChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  _handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value })
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


  _onClckAddPhone = () => {
    if (this.state.phone !== '') {
      this.setState({
        phones: [...this.state.phones, this.state.phone],
        phone: ''
      })
    }
  }

  _onClickDeleteAccount = () => {
    let verify = window.confirm('Por favor confirme si desea borrar la cuenta');
    console.log(verify);
    ///passenger/deleteProfile/{id}
    if (verify) {
      window.location = '/';
      this.setState({
        isDeleteAccount: true
      })
    }
    else {
      this.setState({
        isDeleteAccount: false
      })
    }
  }
  _onClickDeletePhone(phone) {
    this.setState(state => {
      const tempPhones = state.phones.filter(item => item !== phone);
      state.phones = tempPhones;
      return {
        tempPhones
      };
    });
  }

  _submitData = async () => {
    if (this.state.country === '' || this.state.address === '') {
      window.confirm("Debe seleccionar un pais y una ciudad.")
    }
    else if (this.state.firstName === '' || this.state.lastName === '') {
      window.confirm("Debe ingresar nombre completo.")
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
        address: this.state.address,
        country: this.state.country,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: passwordEncrypt,
        phone: this.state.phones,
      }
      let result = await fetch(`http://localhost:3000/passenger/editProfile/${this.state.dataUser._id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      if (result.ok) {
        window.confirm("Su informacion a sido actualizada correctamente");
      }
    }
  };

  render() {
    if (this.state.isDeleteAccount) {
      return (
        <Redirect to="/login" />
      );
    } else {
      return (
        <Container>
          <div style={{ margin: '2%' }}>
            <h4 align='center'>Perfil - Ver y Editar</h4>
          </div>
          <Row className='justify-content-md-center'>
            <Col xs lg='2'></Col>
            <Col md='auto'>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId='formGridName'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='name' placeholder={this.state.dataUser.firstName} value={this.state.firstName} onChange={this._handleChangeFirstName.bind(this)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLastname'>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type='name' placeholder={this.state.dataUser.lastName} value={this.state.lastName} onChange={this._handleChangeLastName.bind(this)} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridId'>
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control type='number' placeholder={this.state.dataUser._id} disabled />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridUsername'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type='string' placeholder={this.state.dataUser.username} disabled />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type='email' placeholder={this.state.dataUser.email} value={this.state.email} onChange={this._handleChangeEmail.bind(this)} />
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
                    <Form.Control type='string' placeholder={this.state.dataUser.birthday} disabled />
                  </Form.Group>
                </Form.Row>


                <Form.Row>
                  <Form.Group as={Col} controlId="ControlSelectCountry">
                    <Form.Label>País ({this.state.dataUser.country})</Form.Label>
                    <Form.Control as="select" onChange={this._handleChangeSelectCountry.bind(this)}>
                      {this.state.listCountries.map((item, index) => (
                        <option value={'{"country":"' + item.name + '", "code":"' + item.phone_code + '"}'} key={index} >{item.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="ControlSelectCity">
                    <Form.Label>Ciudad ({this.state.dataUser.address})</Form.Label>
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

                  <Form.Group controlId='formGridAddPhone'>
                    <Fab variant="extended" aria-label="add" onClick={this._onClckAddPhone}>
                      <AddIcon />
                      Agregar Numero
                  </Fab>
                    <div style={{ overflow: 'auto', height: '200px' }}>
                      <Table striped bordered hover responsive >
                        <thead>
                          <tr>
                            <th>Telefono</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.phones.map((item, index) => (
                            <tr key={index}>
                              <td>{item}</td>
                              <td>
                                <IconButton aria-label="delete" style={{ color: 'red' }} onClick={this._onClickDeletePhone.bind(this, item)}>
                                  <DeleteIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
            <Col xs lg='2'></Col>
          </Row>

          <Row className='justify-content-md-center' style={{ margin: '3%' }}>
            <div>
              <Button
                variant='success'
                type='submit'
                size='lg'
                onClick={this._submitData}>
                Aplicar Cambios
            </Button>
            </div>

            <div>
              <Col md='auto'>
                <Button
                  variant='danger'
                  size='lg'
                  onClick={this._onClickDeleteAccount}>
                  Borrar Cuenta
                </Button>
              </Col>
            </div>
          </Row>
        </Container>
      );
    }
  }
}

export default Account;
