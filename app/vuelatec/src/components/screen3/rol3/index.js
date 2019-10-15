import React from 'react';
import { Table } from 'react-bootstrap';


class Rol3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state1: ''
    };

  }




  render() {
    return (
      <div style={{ marginTop: '3%' }}>
        <div style={{ margin: '5%' }}>
          <Table responsive>
          <thead>
                  <tr>
                    <th>Columna1</th>
                    <th>Columna2</th>
                    <th>Columna3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fila1</td>
                    <td>Fila2</td>
                    <td>Fila3</td>
                  </tr>
                  {/*this.state.array.map((item) => (
                      <tr key={item.key}>
                        <td>{item.column1}</td>
                        <td> $ {item.column2}</td>
                        <td>{item.column3}</td>
                      </tr>
                    ))*/}
                </tbody>
          </Table>
        </div>
      </div>
    );
  }
}


export default Rol3;
