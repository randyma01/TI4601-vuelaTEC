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
  origin: 'Atlanta',
  destination: 'Tokio',
  price: 100,
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['dinner', 'breakfast', 'snacks', 'drinks', 'movies'],
  state: 'On Time',
  capacityPlane: 250,
  ticketsSold: 4,
  airline_id: 'AAL'
});

db.flights.insert({
  _id: 'LLU8965',
  name: 'SmFr',
  departure: '18:00',
  arrives: '21:00',
  origin: 'London',
  destination: 'Frankfurt',
  price: 35,
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['snacks', 'drinks', 'movies'],
  state: 'On Time',
  capacityPlane: 150,
  ticketsSold: 6,
  airline_id: 'SHT'
});
