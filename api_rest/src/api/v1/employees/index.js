import Employee from '../../../models/employee';
import Passengers from '../../../models/passenger';

function EmployeesRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/employees/test',
      handler: async (request, reply) => {
        return '<h1> employees working! </h1>';
      }
    },

    // 1. verify check-in
    {
      method: 'GET',
      path: '/employee/checkin/{id}',
      handler: async (request, reply) => {
        try {
          const personId = request.params.id;
          const person = await Passengers.find();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 2. passengers info
    {
      method: 'GET',
      path: '/employee/passengersInfo/',
      handler: async (request, reply) => {
        try {
          const person = await Passengers.aggregate([
            {
              $lookup: {
                from: 'tickets',
                localField: '_id',
                foreignField: 'passenger_id',
                as: 'ticketsInfo'
              }
            }
          ]).pretty();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default EmployeesRoutes;
