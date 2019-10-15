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

    /* 
    
    1. Para todas las aerolíneas debe mostrar todos los vuelos 
    junto con la cantidad de boletos vendidos en cada uno 
    y el monto total correspondiente a los boletos vendidos.
    

    db.flights.aggregate(
      [
        {
          $group: 
          {
            _id: { airline: "$airline_id", ticketsSold: "$ticketsSold", capacityPlane: "$capacityPlane" },
          profit: { $sum: {$multiply: ["$price", "$ticketsSold"]}}
          }
        }
      ]
    )


    2. Rango de boletos comprados por cada pasajero.
    El rango va del menor al mayor número de boletos adquiridos por un pasajero.
    Por ejemplo, si Ana ha comprado boletos para 5 vuelos, y se identifica que en 
    el vuelo que menos boletos compró, adquirió uno y en el que más boletos compró, 
    adquirió tres, entonces su rango será [1,3]

    db.passengers.find(
      {
      "_id":"157483924"
      },
      {
        "tickets.amount":1, "tickets._id":1, "tickets.flight_id":1
      }
      ).pretty()




    3. ¿Cuáles son las destinos más visitados? Se debe mostrar el nombre de
    cada destino y la cantidad de pasajero que han comprado vuelos
    para ese destino.

    4. Cantidad de operaciones de compra de boletos registradas en el sistema, 
    esta información se puede filtrar por pasajero, por rango de fechas, 
    por estado de vuelo. También mostrar los tres pasajeros
    con más vuelos adquiridos. 
    
    */
  ]);
}

export default AdministratorRoute;
