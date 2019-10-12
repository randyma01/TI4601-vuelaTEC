import Flights from '../../../models/flights';
import Joi from 'joi';

function FlightsRoutes(server) {
  server.route([
    // -- test api -- //
    {
      method: 'GET',
      path: '/api/v1/test',
      handler: async (request, reply) => {
        return '<h1>test</1>';
      }
    }
  ]);
}

export default FlightsRoutes;
