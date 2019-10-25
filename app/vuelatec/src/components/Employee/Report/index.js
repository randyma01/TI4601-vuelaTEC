import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Report1 from './Passenger-Info';
import Report2 from './Registered-Flights';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
    };
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Reportes para Funcionarios</h3>
        </div>
        <Tabs defaultActiveKey="report1" id="tab-controll-report-employee">
          <Tab eventKey="report1" title="Información de pasajero">
            <Report1 />
          </Tab>
          <Tab eventKey="report2" title="Vuelos Registrados en el Sistema" >
            <Report2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


export default Report;
