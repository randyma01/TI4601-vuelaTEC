/* 1. Registrar información de pasajero (CRUD) */

/* 1.1 Crear nuevo pasajero. */

db.passengers.insert({
  _id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  birthday: '',
  country: ' ',
  addres: '',
  phone: ''
});

/* 1.2 Modificar un pasajero por id. */

// filtro: por id de pasajero
db.passengers.update(
  {
    _id: ''
  },
  {
    $set: {
      password: '',
      country: ' ',
      address: '',
      phone: ''
    }
  }
);

/* 1.3 Obtener info de un pasajero por id. */

// filtro: por id de pasajero
db.passengers.find({
  _id: ''
});

/* 1.4 Eliminar un pasajero por id. */

// filtro: por id de pasajero
db.estudiantes.remove({
  _id: ''
});

/* 2. Compra de boletos */

// filtro: por id de pasajero y id vuelo
db.tickets.insert({
  _id: '',
  amount: '',
  seats: [],
  baggage: '',
  carryOn: '',
  flight_id: '',
  passenger_id: '',
  checked: '',
  boarded: ''
});

db.flights.update(
  {
    _id: ''
  },
  {
    $inc: {
      ticketsSold: 1
    }
  }
);
/* 3. Check-in. */

// filtro: por id de pasajero
db.tickets
  .update(
    {
      _id: 'ktl123',
      passenger_id: 123454325
    },
    {
      $set: {
        checked: true
      }
    }
  )
  .pretty();

/* 4. Ejecutar los siguientes reportes:
  Vuelos asociados al pasajero: se muestra un listado con la información
  de los vuelos para los que un pasajero ha adquirido boletos. Se puede 
  filtrar por rango de fechas, por estado del vuelo. Para cada vuelo se 
  debe mostrar el detalle correspondiente. */

/* 4.1 Todos los ticketes de un pasajero en general. */

// filtro: por id de pasajero
db.tickets.find({
  passenger_id: 123454325
});

/* 4.2 Todos los ticketes de un pasajero por fechas. */
db.tickets.find({
  passenger_id: 123454325,
  dateBought: '2019-12-05'
});

/* 4.3 Todos los ticketes de un pasajero por estado de vuelo. */

//-------------------------------------------------//
/* EXTRAS */
//-------------------------------------------------//

/* 1. Ingreso de un Pasajero */

// filtro: por username de pasajero
db.passengers.find(
  {
    username: 'giorod'
  },
  {
    role: 1,
    password: 1
  }
);

/* 2. Info de los Vuelos */

// filtro: por origen, destino y fechas de un vuelo
db.flights.find({
  origin: 'London',
  destination: 'Frankfurt',
  takeOff: {
    $gte: '2019-1-1',
    $lt: '2019-5-10'
  }
});
