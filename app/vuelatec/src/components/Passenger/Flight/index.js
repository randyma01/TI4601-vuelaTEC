import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*Tabs*/
import InfoFlights from './Info';
import CheckIn from './Check-in';


class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      dataUser: props.dataUser
    }
  }

  render() {
    return (
      <Container>
        <Tabs style={{ margin: '2%' }} defaultActiveKey="check-in" id="tabs-employee">
          <Tab eventKey="check-in" title="Check-In">
            <CheckIn dataUser={this.state.dataUser} />
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
