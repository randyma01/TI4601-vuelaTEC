import hapi from '@hapi/hapi';
import mongoose from 'mongoose';

import administratorRoutes from '../src/api/v1/administrator/index';
import employeesRoutes from '../src/api/v1/employees/index';
import passengerRoutes from '../src/api/v1/passenger/index';

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

    administratorRoutes(server);
    employeesRoutes(server);
    passengerRoutes(server);

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
