//--- use database ---//
//use TECPlane;

//--- show database ---//
db;

//--- create collection ---//

db.createCollection('flights');

//--- fill collection ---//
db.flights.insert({
  _id: 'AA4573',
  name: 'AtlTok',
  departure: '19:00',
  arrives: '09:00',
  takeOff: '2019-12-02',
  landing: '2019-12-03',
  origin: 'Atlanta',
  destination: 'Tokyo',
  price: 100,
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['dinner', 'breakfast', 'snacks', 'drinks', 'movies'],
  state: 'A tiempo',
  capacityPlane: 250,
  ticketsSold: 4,
  airline_id: 'AAL'
});

db.flights.insert({
  _id: 'LLU8965',
  name: 'SmFr',
  departure: '18:00',
  arrives: '21:00',
  takeOff: '2019-03-02',
  landing: '2019-03-02',
  origin: 'London',
  destination: 'Frankfurt (Order)',
  price: 35,
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['snacks', 'drinks', 'movies'],
  state: 'Retrasado',
  capacityPlane: 150,
  ticketsSold: 6,
  airline_id: 'SHT'
}); 

db.flights.insert({
  _id: 'DU1289',
  name: 'DuUs',
  departure: '10:00',
  arrives: '09:00',
  takeOff: '2019-06-06',
  landing: '2019-06-07',
  origin: 'Dubai',
  destination: 'Atlanta',
  price: 140,
  restrictions: ['weapons', 'foods', 'animals', 'plants'],
  services: ['lunch', 'snacks', 'drinks', 'movies'],
  state: 'Cancelado',
  capacityPlane: 450,
  ticketsSold: 120,
  airline_id: 'UAE'
});
