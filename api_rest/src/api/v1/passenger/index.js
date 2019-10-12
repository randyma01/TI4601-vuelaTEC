import Passengers from '../../../models/passenger';

function PassengersRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/passengers/test',
      handler: async (request, reply) => {
        return '<h1> passengers waiting </h1>';
      }
    },
    {
      method: 'GET',
      path: '/passengers/findAll',
      handler: async (request, reply) => {
        try {
          const person = await Passengers.find();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default PassengersRoutes;
