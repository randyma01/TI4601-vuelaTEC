import Airports from '../../../models/airports';

function AirportsRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/airports/test',
      handler: async (request, reply) => {
        return '<h1> airports ready! </h1>';
      }
    },
    {
      method: 'GET',
      path: '/airports/findAll',
      handler: async (request, reply) => {
        try {
          const airport = await Airports.find();
          return reply.response(airport);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/airports/findById/{id}',
      handler: async (request, reply) => {
        try {
          const airportsId = request.params.id;
          const airports = await Airports.findById(airportsId);
          return reply.response(airports);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default AirportsRoutes;
