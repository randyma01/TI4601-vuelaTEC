import hapi from '@hapi/hapi';
import mongoose from 'mongoose';

import administratorRoutes from '../src/api/v1/administrator/index';
//import airlinesRoutes from '../src/api/v1/airlines/index';
import airportRoutes from '../src/api/v1/airports/index';
import employeesRoutes from '../src/api/v1/employees/index';
//import flightsRoutes from '../src/api/v1/flights/index';
import passengerRoutes from '../src/api/v1/passenger/index';
import testRoutes from '../src/api/v1/test';

const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  try {
    mongoose.connect('mongodb://localhost/TECPlane');
    mongoose.connection.once('open', () => {
      console.log('Connection to database: Successful!');
    });

    /* mongoose.connect('mongodb://localhost/testing');
    mongoose.connection.once('open', () => {
      console.log('Connection to database: Successful!');
    }); */

    administratorRoutes(server);
    //airlinesRoutes(server);
    airportRoutes(server);
    employeesRoutes(server);
    //flightsRoutes(server);
    passengerRoutes(server);
    testRoutes(server);

    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
