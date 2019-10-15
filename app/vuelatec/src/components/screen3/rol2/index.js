import React from 'react';
import { Button, Card, Col, Container, Form, FormControl, Modal, Row, Tab, Tabs, Table, Badge } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class Rol2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state1: '',
      state2: ''
    };
  }

  _handleChangeSelect = (event) => {
    this.setState({ state1: event.target.value })
  }

  _onInputValue1 = (event) => {
    this.setState({ state2: event.target.value })
  }

  _onClickValue = () => {
    console.log(this.state.state2);
  }

  render() {
    return (
      <div style={{ marginTop: '3%' }}>
        <Tabs defaultActiveKey="tab1" id="tab-options-employee">
          <Tab eventKey="tab1" title="Titulo Tab1">
            <Container>
              <Row style={{ marginTop: '15%' }}>
                <Col></Col>
                <Col xs={11}>
                  <div style={{ marginBottom: '5%', fontSize: 20 }}>Registrar Pedido</div>
                  <Form>
                    <Form.Group controlId="ControlInputClient">
                      <Form.Label>Input Text:</Form.Label>
                      <Form.Control type="text" placeholder="texto" onChange={this._onInputValue1.bind(this)} value={this.state.state2} />
                    </Form.Group>
                    <Form.Group controlId="ControlSelectState">
                      <Form.Label>Input Select:</Form.Label>
                      <Form.Control as="select" onChange={this._handleChangeSelect.bind(this)} value={this.state.state1}>
                        <option value={'Listo'}>Listo para entregar</option>
                        <option value={'EnProceso'}>En proceso</option>
                        <option value={'Entregado'}>Entregado</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
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
                          <td>
                            <IconButton aria-label="delete" style={{ color: 'red' }}>
                              <DeleteIcon />
                            </IconButton>
                          </td>
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
                </Col>
                <Col></Col>
                <div>
                  <Button
                    variant='primary'
                    size='lg'
                    onClick={this._onClickValue}
                  >Probar Input</Button>
                </div>
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="tabX" title="Titulo Tab X">
            <div style={{ marginTop: '3%' }}>
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
          </Tab>
        </Tabs>
      </div >
    );
  }
}


export default Rol2;
