import React from 'react';
import ReactDOM from 'react-dom';
import LogInComponent from './components/session/login';


class App extends React.Component {
  render() {
    return (
      <div>
        <LogInComponent />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
 