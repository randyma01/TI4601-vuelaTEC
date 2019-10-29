import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//componnets
import HomeComponent from './home';
import Login from './session/login';
//administrator access
import AirlineComponent from '../components/Administrator/Airline';
import AirportComponent from '../components/Administrator/Airport';
import EmployeeComponent from '../components/Administrator/Employee';
import FlightComponent from '../components/Administrator/Flight';
import ReportComponent from '../components/Administrator/Report';
//operatos||technician access
import FlightComponentEmployee from '../components/Employee/Flight';
import ReportComponentEmployee from '../components/Employee/Report';
//passenger access
import AccountComponentPassenger from '../components/Passenger/Account';
import FlightComponentPassenger from '../components/Passenger/Flight';
import ReportComponentPassenger from '../components/Passenger/Report';
import TicketComponentPassenger from '../components/Passenger/Ticket';


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: props.dataUser
    };
  } 

  _optionUser = () => {
    if (this.state.dataUser.role === 'administrator') {
      return (
        <Nav className="mr-auto">
          <Nav.Link as="span">{<Link to="/airports" style={{ color: '#FFF' }}>Aeropuertos</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/airlines" style={{ color: '#FFF' }}>Aerolineas</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/flights" style={{ color: '#FFF' }}>Vuelos</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/employees" style={{ color: '#FFF' }}>Empleados</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/reports" style={{ color: '#FFF' }}>Reportes</Link>}</Nav.Link>
        </Nav>
      )
    }
    else if (this.state.dataUser.role === 'operator' || this.state.dataUser.role === 'technician') {
      return (
        <Nav className="mr-auto">
          <Nav.Link as="span">{<Link to="/employee/flights" style={{ color: '#FFF' }}>Vuelos</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/employee/reports" style={{ color: '#FFF' }}>Reportes</Link>}</Nav.Link>
        </Nav >
      )
    }
    //passenger
    else {
      return (
        <Nav className="mr-auto">
          <Nav.Link as="span">{<Link to="/passenger/tickets" style={{ color: '#FFF' }}>Comprar Boletos</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/passenger/flights" style={{ color: '#FFF' }}>Check-in</Link>}</Nav.Link>
          <Nav.Link as="span">{<Link to="/passenger/reports" style={{ color: '#FFF' }}>Mis Vuelos</Link>}</Nav.Link>

        </Nav >
      )
    }
  }

  render() {
    const optionAccount = Object.keys(this.state.dataUser).indexOf('role') === -1 ? (
      <Nav.Link as="span">{<Link to="/passenger/account" style={{ color: 'rgba(255, 255, 255, .5)' }}>Mi Cuenta</Link>}</Nav.Link>
    ) : null;
    return (
      <Container style={{ marginTop: '2%' }}>
        <Router>
          <header>
            <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#286178' }}>
              <Navbar.Brand>{<Link to="/" style={{ color: '#FFF' }}>VuelaTEC</Link>}</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {this._optionUser()}
                <Nav>
                  {optionAccount}
                  <Nav.Link href="http://localhost:8080">Cerrar Sesión</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <main>
            <Switch>
              <Route path='/' exact component={HomeComponent} />
              <Route path='/airports' exact component={() => <AirportComponent />} />
              <Route path='/airlines' exact component={() => <AirlineComponent />} />
              <Route path='/employees' exact component={() => <EmployeeComponent />} />
              <Route path='/flights' exact component={() => <FlightComponent />} />
              <Route path='/reports' exact component={() => <ReportComponent />} />
              <Route path='/employee/flights' exact component={() => <FlightComponentEmployee />} />
              <Route path='/employee/reports' exact component={() => <ReportComponentEmployee />} />
              <Route path='/passenger/tickets' exact component={() => <TicketComponentPassenger dataUser={this.state.dataUser} />} />
              <Route path='/passenger/reports' exact component={() => <ReportComponentPassenger dataUser={this.state.dataUser} />} />
              <Route path='/passenger/flights' exact component={() => <FlightComponentPassenger dataUser={this.state.dataUser} />} />
              <Route path='/passenger/account' exact component={() => <AccountComponentPassenger dataUser={this.state.dataUser} />} />
              <Route path='/login' exact component={() => <Login />} />
            </Switch>
          </main>
        </Router>
      </Container>
    );
  }
}

export default Menu;
