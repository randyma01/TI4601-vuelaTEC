import Airlines from '../../../models/airlines';
import Flights from '../../../models/flights';
import Tickets from '../../../models/tickets';

function AdministratorRoute(server) {
  server.route([
    {
      method: 'GET',
      path: '/admin/test',
      handler: async (request, reply) => {
        return '<h1> admin working! </h1>';
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
          const passengerId = parseInt(request.params.id);
          const ticketsByPassenger = await Tickets.aggregate([
            {
              $match: {
                passenger_id: passengerId
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
      path: '/admin/mostVisitedDestinations/',
      handler: async (request, reply) => {
        try {
          const mostVisited = await Tickets.aggregate([
            {
              $group: {
                _id: null,
                maxQuantity: { $max: '$ticketsSold' }
              }
            }
          ]);
          return reply.response(mostVisited);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.1 -- total amount of ticket per passengers general
    {
      method: 'GET',
      path: '/admin/ticketsPassengers/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.id);
          const amountTicketsPassengers = await Tickets.aggregate([
            {
              $match: {
                passenger_id: passengerId
              }
            },
            {
              $group: {
                _id: '$passengerId',
                totalTickets: {
                  $sum: '$amount'
                }
              }
            }
          ]);
          return reply.response(amountTicketsPassengers);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.2 -- total amount of ticket per passengers by dates
    {
      method: 'GET',
      path: '/admin/ticketsPassengerDates/{date}',
      handler: async (request, reply) => {
        try {
          const date = request.params.date;
          const amountTicketsPassengers = await Tickets.aggregate([
            {
              $match: {
                dateBought: date
              }
            },
            {
              $group: {
                _id: '$passengerId',
                totalTickets: {
                  $sum: '$amount'
                }
              }
            }
          ]);
          return date;
          return reply.response(amountTicketsPassengers);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.3 -- total amount of ticket per passengers by state
    {
      method: 'GET',
      path: '/admin/ticketsPassengerState/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.state);
          const amountTicketsPassengers = await Tickets.aggregate([
            {
              $match: {
                passenger_id: passengerId,
                used: false
              }
            },
            {
              $group: {
                _id: null,
                totalTickets: {
                  $sum: '$amount'
                }
              }
            }
          ]);
          return reply.response(amountTicketsPassengers);
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
          const topThreePassengers = await Tickets.aggregate([
            {
              $group: {
                _id: '$passenger_id',
                maxQuantity: { $max: '$amount' }
              }
            },
            {
              $limit: 3
            }
          ]);

          return reply.response(topThreePassengers);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default AdministratorRoute;
