import React from 'react';
import Rol1 from './rol1';
import Rol2 from './rol2';
import Rol3 from './rol3';


class Screen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 1,
      //userType: props.userType,
      userId: props.userId
    };

  }

  render() {
    if (this.state.userType === 0) {
      return (
        <div> <h6>Vista rol 2</h6> </div>

      );
    }
    else if (this.state.userType === 1) {
      return (
        <div>
          <h6>Vista rol 2</h6>
          <Rol2 />
        </div>
      );
    }
    else if (this.state.userType === 2) {
      return (
        <div> <h6>Vista rol 3</h6> </div>
      );
    }
  }
}


export default Screen3;
