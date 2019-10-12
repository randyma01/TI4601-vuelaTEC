import Flights from '../../../models/flights';

function FlightsRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/flights/test',
      handler: async (request, reply) => {
        return '<h1> flights standing by! </h1>';
      }
    },
    {
      method: 'GET',
      path: '/flights/findAll',
      handler: async (request, reply) => {
        try {
          const flights = await Flights.find();
          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/flights/findById/{id}',
      handler: async (request, reply) => {
        try {
          const flightsId = request.params.id;
          const flights = await Flights.findById(flightsId);
          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
    // create a new flight
    // update an existing flight
  ]);
}

export default FlightsRoutes;
