import Employee from '../../../models/employee';
import Airlines from '../../../models/airlines';
import Flights from '../../../models/flights';
import Tickets from '../../../models/tickets';

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

    // 1. -- total profit of flights
    {
      method: 'GET',
      path: '/admin/totalProfitFlights',
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
    },

    // 2. -- range of tickets bought by passenger
    {
      method: 'GET',
      path: '/admin/rangeTicketsPassengers/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = request.params;
          const ticketsByPassenger = await Tickets.aggregate([
            {
              $match: {
                passenger_id: { passengerId }
              }
            },
            {
              $group: {
                _id: '$passenger_id',
                minQuantity: { $min: '$amount' },
                maxQuantity: { $max: '$amount' }
              }
            }
          ]);
          return reply.response(ticketsByPassenger);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 3. -- most visited destinations
    {
      method: 'GET',
      path: '/admin/mostVisitDestinations/',
      handler: async (request, reply) => {
        try {
          const passengerId = request.params.id;

          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.1 -- total amount of ticket per passengers general
    {
      method: 'GET',
      path: '/admin/ticketsPassenger/',
      handler: async (request, reply) => {
        try {
          const passengerId = request.params.id;

          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.2 -- total amount of ticket per passengers by dates
    {
      method: 'GET',
      path: '/admin/ticketsPassengerDates/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = request.params.id;

          return reply.response(flights);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.3 -- total amount of ticket per passengers by state
    {
      method: 'GET',
      path: '/admin/ticketsPassengerState/{state}',
      handler: async (request, reply) => {
        try {
          const state = request.params.state;
          if (state === 'OnTime') {
            //return '<h1> On Time <h1>';
          } else if (stare === 'Delayed') {
            //return '<h1> Delayed <h1>';
          } else {
            //return '<h1> Cancel <h1>';
          }
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.4 -- top three passangers with most flights

    {
      method: 'GET',
      path: '/admin/topThreePassengers/',
      handler: async (request, reply) => {
        try {
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default AdministratorRoute;
