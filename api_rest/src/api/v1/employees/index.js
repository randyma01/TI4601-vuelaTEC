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
          const person = await Employee.find();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }

    /* 

   1. Verificar información de check-in.

   2. Consultar información de pasajeros.

   3. Ejecutar función de abordaje.

   4. Ejecutar los siguientes reportes:
    4.1 Consultar información de un pasajero.

    4.1 Vuelos registrados en el sistema: se muestra un listado con la 
    información de los vuelos registrados. Se puede filtrar por rango de fechas, 
    por estado, por nombre de pasajero. Para cada vuelo se debe mostrar el detalle.

    */
  ]);
}

export default EmployeesRoutes;
