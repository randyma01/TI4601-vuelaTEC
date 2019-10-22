import Airlines from '../../../models/airlines';
import Employee from '../../../models/employee';
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

    //-------------------------------------------------//
    //---------------------Reports---------------------//
    //-------------------------------------------------//

    // 1. -- total profit of flights -- //
    {
      method: 'GET',
      path: '/admin/totalProfitFlights',
      handler: async (request, reply) => {
        try {
          const result = await Flights.aggregate([
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
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 2. -- range of tickets bought by passenger -- //
    {
      method: 'GET',
      path: '/admin/rangeTicketsPassengers/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.id);
          const result = await Tickets.aggregate([
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
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 3. -- most visited destinations -- //
    {
      method: 'GET',
      path: '/admin/mostVisitedDestinations/',
      handler: async (request, reply) => {
        try {
          const result = await Tickets.aggregate([
            {
              $group: {
                _id: null,
                maxQuantity: { $max: '$ticketsSold' }
              }
            }
          ]);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.1 -- total amount of ticket per passengers general -- //
    {
      method: 'GET',
      path: '/admin/ticketsPassengers/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.id);
          const result = await Tickets.aggregate([
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
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.2 -- total amount of ticket per passengers by dates -- //
    {
      method: 'GET',
      path: '/admin/ticketsPassengerDates/{date}',
      handler: async (request, reply) => {
        try {
          const date = request.params.date;
          const result = await Tickets.aggregate([
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
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.3 -- total amount of ticket per passengers by state -- //
    {
      method: 'GET',
      path: '/admin/ticketsPassengerState/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.state);
          const result = await Tickets.aggregate([
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
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.4 -- top three passangers with most flights -- //
    {
      method: 'GET',
      path: '/admin/topThreePassengers/',
      handler: async (request, reply) => {
        try {
          const result = await Tickets.aggregate([
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

          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    //-------------------------------------------------//
    //------------------CRUD Airports------------------//
    //-------------------------------------------------//

    // -- new airport --//
    {
      method: 'POST',
      path: '/admin/newAirport/',
      handler: async (request, reply) => {
        try {
          const newAirports = new Airlines(request.payload);
          const result = await newAirports.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- edit airport by id --//
    {
      method: 'PUT',
      path: '/admin/updateAirport/{id}',
      handler: async (request, reply) => {
        try {
          const result = await Airports.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find airport all and by id --//
    {
      method: 'GET',
      path: '/admin/findAllAirports/',
      handler: async (request, reply) => {
        try {
          const result = await Airports.find();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/findAirportsId/{id}',
      handler: async (request, reply) => {
        try {
          const airlineId = request.params.id;
          const result = await Airlines.findById(airlineId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- remove airport by id --//
    {
      method: 'DELETE',
      path: '/admin/deleteAirports/{id}',
      handler: async (request, reply) => {
        try {
          const airportsId = request.params.id;
          const result = await Airports.findByIdAndDelete(airportsId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    //-------------------------------------------------//
    //------------------CRUD Airlines------------------//
    //-------------------------------------------------//

    // -- new airline --//
    {
      method: 'POST',
      path: '/admin/newAirline/',
      handler: async (request, reply) => {
        try {
          const newAirlines = new Airlines(request.payload);
          const result = await newAirlines.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- edit airlines by id --//
    {
      method: 'PUT',
      path: '/admin/updateAirlines/{id}',
      handler: async (request, reply) => {
        try {
          const result = await Airlines.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find airline all and by id --//
    {
      method: 'GET',
      path: '/admin/findAllAirlines/',
      handler: async (request, reply) => {
        try {
          const result = await Airlines.find();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/findAirlinesId/{id}',
      handler: async (request, reply) => {
        try {
          const airlineId = request.params.id;
          const result = await Airlines.findById(airlineId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- remove airline by id --//
    {
      method: 'DELETE',
      path: '/admin/deleteAirline/{id}',
      handler: async (request, reply) => {
        try {
          const airlineId = request.params.id;
          const result = await Airlines.findByIdAndDelete(airlineId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    //-------------------------------------------------//
    //-------------------CRUD Flights------------------//
    //-------------------------------------------------//

    // -- new flights --//
    {
      method: 'POST',
      path: '/admin/newFlight/',
      handler: async (request, reply) => {
        try {
          const newFlight = new Flights(request.payload);
          const result = await newFlight.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- edit flights by id --//
    {
      method: 'PUT',
      path: '/admin/updateFlight/{id}',
      handler: async (request, reply) => {
        try {
          const result = await Flights.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find flights all and by id --//
    {
      method: 'GET',
      path: '/admin/findAllFlights/',
      handler: async (request, reply) => {
        try {
          const result = await Flights.find();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/findFlightsId/{id}',
      handler: async (request, reply) => {
        try {
          const flightsId = request.params.id;
          const result = await Flights.findById(flightsId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- remove flights by id --//
    {
      method: 'DELETE',
      path: '/admin/deleteFlight/{id}',
      handler: async (request, reply) => {
        try {
          const flightId = request.params.id;
          const result = await Flights.findByIdAndDelete(flightId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    //-------------------------------------------------//
    //------------------CRUD Employees-----------------//
    //-------------------------------------------------//

    // -- new employee --//
    {
      method: 'POST',
      path: '/admin/newEmployee/',
      handler: async (request, reply) => {
        try {
          const newEmployee = new Employee(request.payload);
          const result = await newEmployee.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- edit employee by id --//
    {
      method: 'PUT',
      path: '/admin/updateEmployee/{id}',
      handler: async (request, reply) => {
        try {
          const result = await Employee.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find employees all and by id --//
    {
      method: 'GET',
      path: '/admin/findAllEmployees/',
      handler: async (request, reply) => {
        try {
          const result = await Employee.find();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    {
      method: 'GET',
      path: '/admin/findEmployeesId/{id}',
      handler: async (request, reply) => {
        try {
          const personId = request.params.id;
          const result = await Employee.findById(personId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- remove employee by id --//
    {
      method: 'DELETE',
      path: '/admin/deleteEmployee/{id}',
      handler: async (request, reply) => {
        try {
          const personId = request.params.id;
          const result = await Employee.findByIdAndDelete(personId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default AdministratorRoute;
