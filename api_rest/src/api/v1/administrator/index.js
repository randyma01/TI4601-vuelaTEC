import Employee from '../../../models/employee';
import Airlines from '../../../models/airlines';
import Flights from '../../../models/flights';

function AdministratorRoute(server) {
  server.route([
    {
      method: 'GET',
      path: '/admin/test',
      handler: async (request, reply) => {
        return '<h1> employees working! </h1>';
      }
    },
    {
      method: 'GET',
      path: '/admin/airlines/findAll',
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
      path: '/admin/airlines/findById/{id}',
      handler: async (request, reply) => {
        try {
          const airlineId = request.params.id;
          const airlines = await Airlines.findById(airlineId);
          return reply.response(airlines);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/flights/findAll',
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
      path: '/admin/flights/findById/{id}',
      handler: async (request, reply) => {
        try {
          const flightsId = request.params.id;
          const flights = await Flights.findById(flightsId);
          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/flights/info',
      handler: async (request, reply) => {
        try {
          const airlines = await Flights.aggregate([
            {
              $group: {
                _id: {
                  airline: '$airline_id',
                  ticketsSold: '$ticketsSold',
                  capacityPlane: '$capacityPlane',
                  profit: {
                    $sum: {
                      $multiply: ['$price', '$ticketsSold']
                    }
                  }
                }
              }
            }
          ]);
          return reply.response(airlines);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default AdministratorRoute;
