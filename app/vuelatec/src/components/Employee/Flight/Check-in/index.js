import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTickets: []
    };
  }

  componentDidMount = async () => {
    //TODO
  }

  _onClickRefreshFlights = async () => {
    //TODO
    /*await fetch('http://localhost:3000/admin/findAllFlights/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            listTickets: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
      */
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h3 align='center'>Verificar información de check-in</h3>
        </div>
        <div style={{ margin: '5%' }}>
          <IconButton aria-label="refresh" onClick={this._onClickRefreshFlights}>
            <Refresh />
          </IconButton>
          <Table responsive>
            <thead>
              <tr>
                <th>Tickets</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listTickets.map((item, index) => (
                <tr key={index}>
                  <td>{item.a}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}


export default Flight;
