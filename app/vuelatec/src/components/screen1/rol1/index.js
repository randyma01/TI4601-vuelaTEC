import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';


class Rol1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      officeData: [],
      adminId: props.userId
    };
  }

  componentDidMount() {
    //get data
    /*return fetch(`URL_API${'PARAMETER_NAME'}`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          console.log(responseJson);
          this.setState({
            officeData: responseJson
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
      <div style={{ marginTop: '3%' }}>
        <Tabs defaultActiveKey="tab1" id="tab-options-management">
          <Tab eventKey="tab1" title="Titulo Tab 1">
            <div style={{ marginTop: '3%' }}>
              <h5>Contenido tab 1</h5>
            </div>
          </Tab>
          <Tab eventKey="tab2" title="Titulo Tab 2">
            <div style={{ marginTop: '3%' }}>
              <h5>Contenido tab 2</h5>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}


export default Rol1;
