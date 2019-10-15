import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import HomeComponent from './home';
import Screen1Component from './screen1/screen1';
import Screen2Component from './screen2/screen2';
import Screen3Component from './screen3/screen3';
import { Container, Row, Col, Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: props.dataUser
    };
  }

  render() {
    return (
      <div style={{ marginTop: '2%' }}>
        <Container>
          <Row >
            <Col md="auto">
              <Router>
                <header>
                  <div className="row">
                    <div className="col-lg-auto">
                      <Navbar bg="light" variant="light">
                        <Navbar.Brand>{<Link to="/">Nombre Sitio Web</Link>}</Navbar.Brand>
                        <Nav className="mr-auto">
                          <Nav.Link >{<Link to="/screen1">Screen1</Link>}</Nav.Link>
                          <Nav.Link > {<Link to="/screen2">Screen2</Link>}</Nav.Link>
                          <Nav.Link >{<Link to="/screen3">Screen3</Link>}</Nav.Link>
                        </Nav>
                      </Navbar>
                    </div>
                    <div className="col-md-auto">
                      <a href="http://localhost:8080">Cerrar Sesion</a>
                    </div>
                  </div>
                </header>
                <main>
                  <Switch>
                    <Route path='/' exact component={HomeComponent} />
                    <Route path='/screen2' exact component={() => <Screen2Component  /*userType={this.state.dataUser.type} userId={this.state.dataUser.id} */ />} />
                    <Route path='/screen1' exact component={() => <Screen1Component /*userType={this.state.dataUser.type} userId={this.state.dataUser.id} */ />} />
                    <Route path='/screen3' exact component={() => <Screen3Component /*userType={this.state.dataUser.type} userId={this.state.dataUser.id} */ />} />
                    <Redirect to='/' />
                    Main Content Here!
                </Switch>
                </main>
              </Router>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Menu;
