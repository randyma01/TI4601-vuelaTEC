//--- use database ---//

//use vueltaTEC;

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
  price: '$100',
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['dinner', 'breakfast', 'snacks', 'drinks', 'movies'],
  state: 'On Time',
  capacityPlane: '250',
  airline_id: 'AAL'
});
