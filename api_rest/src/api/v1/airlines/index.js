import Airlines from '../../../models/airlines';

function airlinesRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/airlines/test',
      handler: async (request, reply) => {
        return '<h1> airlines flying high! </h1>';
      }
    },
    {
      method: 'GET',
      path: '/airlines/findAll',
      handler: async (request, reply) => {
        try {
          const person = await Airlines.find();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/airlines/findById/{id}',
      handler: async (request, reply) => {
        try {
          const airlineId = request.params.id;
          const airlines = await Airlines.findById(airlineId);
          return reply.response(airlines);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default airlinesRoutes;
