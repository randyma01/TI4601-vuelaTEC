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
    {
      method: 'GET',
      path: '/employees/findAll',
      handler: async (request, reply) => {
        try {
          const person = await Employee.find({ firstName: 'Camila' });
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default EmployeesRoutes;
