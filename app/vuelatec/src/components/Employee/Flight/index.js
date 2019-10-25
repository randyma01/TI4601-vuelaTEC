import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*Tabs*/
import Boarding from './Boarding';
import InfoFlights from './Info';
import CheckIn from './Check-in';


class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: ''
    }
  }

  render() {
    return (
      <Container>
        <Tabs style={{ margin: '2%' }} defaultActiveKey="boarding" id="tabs-employee">
          <Tab eventKey="boarding" title="Abordajes">
            <Boarding />
          </Tab>
          <Tab eventKey="check-in" title="Check-In">
            <CheckIn />
          </Tab>
          <Tab eventKey="flights" title="Info vuelos" >
            <InfoFlights />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


export default Flight;
