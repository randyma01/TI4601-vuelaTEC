//-------------------------------------------------//
/* Reportes Solicitados */
//-------------------------------------------------//

/* 1. Para todas las aerolíneas debe mostrar todos los vuelos 
    junto con la cantidad de boletos vendidos en cada uno 
    y el monto total correspondiente a los boletos vendidos. */

// sin filtro: todas las aerolíneas
db.flights.aggregate([
  {
    $group: {
      _id: {
        airline: '$airline_id',
        ticketsSold: '$ticketsSold',
        capacityPlane: '$capacityPlane'
      },
      profit: {
        $sum: {
          $multiply: ['$price', '$ticketsSold']
        }
      }
    }
  }
]);

/* 2. Rango de boletos comprados por cada pasajero.
    El rango va del menor al mayor número de boletos adquiridos por un pasajero.
    Por ejemplo, si Ana ha comprado boletos para 5 vuelos, y se identifica que en 
    el vuelo que menos boletos compró, adquirió uno y en el que más boletos compró, 
    adquirió tres, entonces su rango será [1,3] */

// filtro: por id de pasajero
db.tickets.aggregate([
  {
    $match: {
      passenger_id: '157483924'
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

// sin filtro: todos los pasajeros
db.tickets.aggregate([
  {
    $group: {
      _id: '$passenger_id',
      minQuantity: { $min: '$amount' },
      maxQuantity: { $max: '$amount' }
    }
  }
]);

/* 3. ¿Cuáles son las destinos más visitados? Se debe mostrar el nombre de
    cada destino y la cantidad de pasajero que han comprado vuelos
    para ese destino. */

// sin filtro: todos los vuelos
db.flights.aggregate([
  {
    $group: {
      _id: '$destination',
      maxQuantity: { $max: '$ticketsSold' }
    }
  },
  {
    $limit: 3
  },
  {
    $sort: { maxQuantity: -1 }
  }
]);

/* 4. Cantidad de operaciones de compra de boletos registradas en el sistema, 
    esta información se puede filtrar por pasajero, por rango de fechas, por 
    estado de vuelo. También mostrar los tres pasajeros con más vuelos 
    adquiridos.  */

/* 4.1 Cantidad de boletos por pasajero total */

// filtro: por id de pasajero
db.tickets.aggregate([
  {
    $match: {
      passenger_id: 157483924
    }
  },
  {
    $group: {
      _id: '$passenger_id',
      totalTickets: {
        $sum: '$amount'
      }
    }
  }
]);

/* 4.2 Cantidad de boletos por pasajero por fecha */
// filtro: por id de pasajero
db.tickets.aggregate([
  {
    $match: {
      dateBought: '12-03-2019'
    }
  },
  {
    $group: {
      _id: '$passenger_id',
      totalTickets: {
        $sum: '$amount'
      }
    }
  }
]);

/* 4.3 Cantidad de boletos por pasajero por estado de vuelo */

// filtro: por id de pasajero y estado del boleto
db.tickets.aggregate([
  {
    $match: {
      passenger_id: 157483924,
      used: false
    }
  },
  {
    $group: {
      _id: '$passenger_id',
      totalTickets: {
        $sum: '$amount'
      }
    }
  }
]);

/* Cantidad de boletos de un pasajero por: id, rango de fechas y estado */
db.tickets.aggregate([
  {
    $match: {
      passenger_id: 157483924,
      boarded: false,
      dateBought: {
        $gte: '2019-1-1',
        $lt: '2019-12-12'
      }
    }
  },
  {
    $group: {
      _id: '$passenger_id',
      totalTickets: {
        $sum: '$amount'
      }
    }
  }
]);

/* 4.4 Los tres pasajeros con más vuelos */
db.tickets.aggregate([
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

//-------------------------------------------------//
/* CRUD de un AEROPUERTO */
//-------------------------------------------------//

/* 1.1 Crear nuevo aeropuerto. */
db.airports.insert({
  _id: '',
  name: '',
  city: '',
  country: '',
  number: '',
  webPage: ''
});

/* 1.2 Modificar un aeropuertos por id. */

// filtro: por id de aeropuertos
db.airports.update(
  {
    _id: ''
  },
  {
    $set: {
      role: '',
      area: ''
    }
  }
);

/* 1.3 Obtener info de un aeropuerto por id. */

// filtro: por id de aeropuerto
db.airports.find({
  _id: ''
});

/* 1.4 Eliminar un aeropuerto por id. */

// filtro: por id de aeropuerto
db.airports.remove({
  _id: ''
});

//-------------------------------------------------//
/* CRUD de un AEROLINEAS */
//-------------------------------------------------//

/* 1.1 Crear nuevo aerolíneas. */
db.airlines.insert({
  _id: '',
  name: '',
  countries: [],
  airport_id: ''
});

/* 1.2 Modificar un aerolíneass por id. */

// filtro: por id de aerolíneass
db.airlines.update(
  {
    _id: ''
  },
  {
    $set: {
      airport_id: ''
    }
  }
);

/* 1.3 Obtener info de un aerolíneas por id. */

// filtro: por id de aerolíneas
db.airlines.find({
  _id: ''
});

/* 1.4 Eliminar un aerolíneas por id. */

// filtro: por id de aerolíneas
db.airlines.remove({
  _id: ''
});

//-------------------------------------------------//
/* CRUD de un EMPLEADO */
//-------------------------------------------------//

/* 1.1 Crear nuevo funcionario. */
db.employees.insert({
  _id: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  role: '',
  area: '',
  initalDate: ''
});

/* 1.2 Modificar un funcionario por id. */

// filtro: por id de pasajero
db.employees.update(
  {
    _id: ''
  },
  {
    $set: {
      role: '',
      area: ''
    }
  }
);

/* 1.3 Obtener info de un funcionario por id. */

// filtro: por id de funcionario
db.employees.find({
  _id: ''
});

/* 1.4 Eliminar un funcionario por id. */

// filtro: por id de funcionario
db.employess.remove({
  _id: ''
});

//-------------------------------------------------//
/* CRUD de un VUELOS */
//-------------------------------------------------//

/* 1.1 Crear nuevo vuelos. */
db.flights.insert({
  _id: '',
  name: '',
  departure: '',
  arrives: '',
  origin: '',
  destination: '',
  price: '',
  restrictions: [weapons, foods, animals],
  services: [dinner, breakfast, snacks, drinks, movies],
  state: '',
  capacityPlane: '',
  ticketsSold: '',
  airline_id: ''
});

/* 1.2 Modificar un vuelos por id. */

// filtro: por id de vuelos
db.flights.update(
  {
    _id: ''
  },
  {
    $set: {
      departure: '',
      arrives: '',
      origin: '',
      destination: '',
      state: '',
      ticketsSold: ''
    }
  }
);

/* 1.3 Obtener info de un vuelos por id. */

// filtro: por id de vuelos
db.flights.find({
  _id: ''
});

/* 1.4 Eliminar un vuelos por id. */

// filtro: por id de vuelos
db.flights.remove({
  _id: ''
});

db.tickets.aggregate([
  {
    $match: {
      $or: [
        {
          passenger_id: '',
          dateBought: {
            $gte: '2019-1-1',
            $lt: '2019-12-12'
          }
        }
      ]
    }
  },
  {
    $group: {
      _id: '$passenger_id',
      totalTickets: {
        $sum: '$amount'
      }
    }
  }
]);
