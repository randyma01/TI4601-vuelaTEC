import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  componentDidUpdate = async () => {
    await fetch('http://localhost:3000/admin/mostVisitedDestinations/',
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            result: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <div style={{ margin: '2%' }}>
          <h6 align='center'>Reportes Admin - ¿Cuáles son las destinos más visitados? Se debe mostrar el nombre
de cada destino y la cantidad de pasajero que han comprado vuelos
para ese destino. </h6>
        </div>
        <div style={{ margin: '5%' }}>
          <Table responsive>
            <thead>
              <tr>
                <th>Destino</th>
                <th>Cantidad vuelos comprados</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.maxQuantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}


export default Report;
