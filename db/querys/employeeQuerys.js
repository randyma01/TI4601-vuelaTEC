//-------------------------------------------------//
/* Reportes Solicitados */
//-------------------------------------------------//

/* 1. Verificar información de check-in. */
db.tickets.find({
  checked: {
    $exists: true
  }
});

/* 2. Consultar información de pasajeros por id y en general. */

// sin filtro: todos los pasajeros
db.passengers.aggregate([
  {
    $lookup: {
      from: 'tickets',
      localField: '_id',
      foreignField: 'passenger_id',
      as: 'ticketsInfo'
    }
  }
]);

// filtro: por id de pasajero
db.passengers.aggregate([
  {
    $match: {
      _id: 123454325
    }
  },
  {
    $lookup: {
      from: 'tickets',
      localField: '_id',
      foreignField: 'passenger_id',
      as: 'ticketsInfo'
    }
  }
]);

/*  3. Ejecutar función de abordaje. */

// filtro: por id de pasajero y id del tiquete
db.tickets.update(
  {
    _id: 'ktl123',
    passenger_id: 123454325
  },
  {
    $set: {
      boarded: true
    }
  }
);

/* 4. Ejecutar los siguientes reportes: 
Vuelos registrados en el sistema: se muestra un listado con la 
información de los vuelos registrados. Se puede filtrar por rango de fechas, 
por estado, por nombre de pasajero. Para cada vuelo se debe mostrar el detalle. */

/* 4.1 Listado de todos los vuelos en el sistema de manera general*/

db.flights.find();

/* 4.2 Listado de todos los vuelos en el sistema por fechas, estado y nombre pasajero */

/* 4.3 Listado de todos los vuelos en el sistema por nombre de pasajero */

db.passengers.aggregate([
  {
    $match: {
      _id: 123454325,
      firstName: 'Andres'
    }
  },
  {
    $lookup: {
      from: 'tickets',
      localField: '_id',
      foreignField: 'passenger_id',
      as: 'ticketsInfo'
    }
  }
]);

//-------------------------------------------------//
/* EXTRAS */
//-------------------------------------------------//

/* 1. Ingreso de un Empleado */

db.employees.find(
  {
    username: 'cammu'
  },
  {
    role: 1,
    password: 1
  }
);
