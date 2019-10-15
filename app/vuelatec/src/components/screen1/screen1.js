import React from 'react';
import { Card } from 'react-bootstrap';
import Rol2 from './rol2';
import Rol1 from './rol1';

class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //userType: props.userType,
      userType: 1,
      userId: props.userId,
    };

  }

  componentDidMount() {
    return fetch('URL_API',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson !== '') {
          this.setState({
            array: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _viewScreen1 = () => {
    return (
      <div className="row">
        {this.state.array.map((office) => (
          <Card key={office.id} style={{ width: '18rem', margin: '2%' }}>
            <Card.Img variant="top" src={office.photo} />
            <Card.Body>
              <Card.Title>{office.name}</Card.Title>
              <Card.Text>
                <p style={{ marginLeft: '1%', marginRight: '1%' }}>Cuidad: {office.city}</p>
                <p style={{ marginLeft: '1%', marginRight: '1%' }}>Tel: {office.phone}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">Desde: {office.open_hour} hasta: {office.close_hour}</Card.Footer>
          </Card>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.userType === '0') {
      return (
        <div style={{ marginTop: '5%' }}> {this._viewScreen1()}
        </div>
      );
    }
    else if (this.state.userType === 2) {
      return (
        <div> <Rol1 userId={this.state.userId} /> </div>
      );
    }
    else if (this.state.userType === 1) {
      return (
        <div> <Rol2 /> </div>
      );
    }
    else {
      return (
        <div style={{ marginTop: '5%' }}> {this._viewScreen1()} </div>
      );
    }
  }
}

export default Screen1;
