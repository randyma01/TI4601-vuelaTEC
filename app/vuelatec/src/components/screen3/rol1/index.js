import React from 'react';
import { Button, Form, Tab, Tabs, Table } from 'react-bootstrap';
import Search from '@material-ui/icons/SearchOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

class Rol1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  _onSearchConsult1 = async () => {
    //TOdO
  }

  _onSearchConsult2 = async () => {
    //TODO
  }

  _onSearchConsult3 = async() => {
    //TODO
  }


  _handleChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  _handleChangeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  render() {
    return (
      <div style={{ marginTop: '3%' }}>
        <Tabs defaultActiveKey="numb1" id="tab-options-admin">
          <Tab eventKey="numb1" title="Titulo Tab 1">
            {this._selectDate(this._onSearchConsult1)}
            <h6 style={{ marginTop: '5%' }}>Resultados</h6>
            <div className="row">
              <div className="col-md-auto">
                <div style={{ marginTop: '3%' }}>
                  <Table responsive striped bordered hover>
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
              <div className="col-3"></div>
            </div>
          </Tab>
          <Tab eventKey="num2" title="Titulo Tab 2">
            {this._selectDate(this._onSearchConsult2)}
            <div style={{ marginTop: '3%' }}>
              <Table responsive >
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
          </Tab>
          <Tab eventKey="num3" title="Titulo Tab 3">
            <h6 style={{ marginTop: '5%' }}>Seleccionar parametros</h6>
            <div className="row">
              <div className="col-md-auto">
                <Form.Group controlId="ControlInputEndDate">
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Control as="select" placeholder="tipo">
                    <option>Value1</option>
                    <option>Value2</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-auto">
                <Button variant="outline-primary" onClick={this._onSearchConsult3}> Buscar <Search /> </Button>
              </div>
            </div>
            <div className="row" style={{ margin: '4%' }}>
             <h3>Resultado de busqueda</h3>
            </div>
          </Tab>
        </Tabs>
      </div >
    );
  }
}


export default Rol1;
