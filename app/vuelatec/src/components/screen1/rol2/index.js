import React from 'react';
import { Button, Form, Tab, Tabs, Table } from 'react-bootstrap';
import Search from '@material-ui/icons/SearchOutlined';


class Rol2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountByBranchOffice: [],
      amountByType: [],
      startDate: '',
      endDate: ''
    };
  }



  _selectDate = (buttonAction) => {
    return (
      <div>
        <h6 style={{ marginTop: '5%' }}>Seleccionar fechas</h6>
        <div className="row">
          <div className="col-md-auto">
            <Form.Group controlId="ControlInputStartDate">
              <Form.Label>Desde:</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeStartDate.bind(this)} />
            </Form.Group>
          </div>
          <div className="col-md-auto">
            <Form.Group controlId="ControlInputEndDate">
              <Form.Label>Hasta:</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" onChange={this._handleChangeEndDate.bind(this)} />
            </Form.Group>
          </div>
          <div className="col-md-auto">
            <Button variant="outline-primary" onClick={buttonAction}> Buscar <Search /> </Button>
          </div>
        </div>
      </div>
    );
  }

  _handleChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  _handleChangeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  _onSearchType = async () => {
    return fetch(`URL_API`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          console.log(responseJson);
          this.setState({
            amountByType: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSearchAmount = async () => {
    return fetch(`URL_API`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson !== '') {
          this.setState({
            amountByBranchOffice: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });

  }


  render() {
    return (
      <div style={{ marginTop: '3%' }}>
        <Tabs defaultActiveKey="tab1" id="tab-options-management">
          <Tab eventKey="tab1" title="Titulo Tab">
            <div style={{ marginTop: '3%' }}>
              {this._selectDate(this._onSearchAmount)}
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
          </Tab>
          <Tab eventKey="tab2" title="Titulo Tab 2">
            <div style={{ marginTop: '3%' }}>
              {this._selectDate(this._onSearchType)}
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
          </Tab>
        </Tabs>
      </div>
    );
  }
}


export default Rol2;
