import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Report1 from './Passenger-flights';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      dataUser: props.dataUser
    };
  }

  render() {
    return (
      <Container>
        <Tabs defaultActiveKey="report1" id="tab-controll-report-employee">
          <Tab eventKey="report1" title="Vuelos">
            <Report1 dataUser={this.state.dataUser} />
          </Tab>
          <Tab eventKey="report2" title="-" >
            <h5>Reporte...</h5>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


export default Report;
