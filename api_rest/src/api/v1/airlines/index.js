import Airlines from '../../../models/airlines';
import Joi from 'joi';

function AirlinesRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/api/v1/test',
      handler: async (request, reply) => {
        return '<h1>test</1>';
      }
    }
  ]);
}

export default AirlinesRoutes;
