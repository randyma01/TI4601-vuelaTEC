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
    //-------------------------------------------------//
    //---------------------Reports---------------------//
    //-------------------------------------------------//

    // 1.1 -- create a new passanger -- //
    {
      method: 'POST',
      path: '/passenger/createProfile/',
      handler: async (request, reply) => {
        try {
          const newPassenger = new Passengers(request.payload);
          const result = await newPassenger.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 1.2 -- edit a passanger by id -- //
    {
      method: 'PUT',
      path: '/passenger/editProfile/{id}',
      handler: async (request, reply) => {
        try {
          const result = await Passengers.findByIdAndUpdate(
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
    // 1.3 -- find a passanger by id -- //
    {
      method: 'GET',
      path: '/passenger/myProfile/{id}',
      handler: async (request, reply) => {
        try {
          const personId = request.params.id;
          const result = await Passengers.findById(personId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 1.4 -- remove a passanger by id -- //
    {
      method: 'DELETE',
      path: '/passenger/deleteProfile/{id}',
      handler: async (request, reply) => {
        try {
          const personId = request.params.id;
          const result = await Passengers.findByIdAndDelete(personId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 2. -- buy a passanger by ticket -- //
    {
      method: 'POST',
      path: '/passenger/buyTicket/',
      handler: async (request, reply) => {
        try {
          const newTicket = new Ticket(request.payload);
          const result = await newTicket.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 3. -- make check in -- //
    {
      method: 'PUT',
      path: '/passenger/makeCheckIn/{id}',
      handler: async (request, reply) => {
        try {
          const { _id, passenger_id } = request.payload;
          const result = await Tickets.update(
            {
              _id: _id,
              passenger_id: passenger_id
            },
            {
              $set: {
                checked: true
              }
            }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.1 -- tickets of a passenger by id -- //
    {
      method: 'GET',
      path: '/passenger/myTickets/{id}',
      handler: async (request, reply) => {
        try {
          const passengerId = parseInt(request.params.id);
          const result = await Tickets.find({
            passenger_id: personId
          });
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // 4.2 -- tickets of a passenger by id -- //
    {
      method: 'GET',
      path: '/passenger/myTickets/byDates/',
      handler: async (request, reply) => {
        try {
          const { passengerId, dateBought } = request.payload;

          const result = await Tickets.find({
            passenger_id: parseInt(passengerId),
            dateBought: dateBought
          });
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
  ]);
}

export default PassengersRoutes;
