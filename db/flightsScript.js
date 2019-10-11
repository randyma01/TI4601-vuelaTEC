//--- use database ---//

//use vueltaTEC;

//--- show database ---//

db;

//--- create collection ---//

db.createCollection('flights');

//--- fill collection ---//
db.flights.insert({
  flight: 'AU4573',
  name: 'SydTok',
  departure: '19:00',
  arrives: '23:00',
  origin: 'Sydney',
  destination: 'Tokio',
  price: '$100',
  restrictions: ['weapons', 'foods', 'animals'],
  services: ['snacks, movies'],
  state: 'in time',
  capacityPlane: '250'
});
