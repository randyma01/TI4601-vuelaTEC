//--- use database ---//

//use vueltaTEC;

//--- show database ---//

db;

//--- create collections ---//

db.createCollection('passengers');

//--- fill collection ---//
db.passengers.insert({
  firstName: 'Daniela',
  lastName: 'Solis',
  username: 'danisols',
  password: 'QeKl503',
  birthday: ISODate('1995-01-03'),
  country: 'Costa Rica',
  addres: 'Cartago, Cartago, Costa Rica',
  phone: 29898909,
  tickets: [
    {
      amount: 1,
      seats: ['D02'],
      baggage: 1,
      carryOn: 2,
      flight_id: 'AA4573',
      checked: false,
      used: false
    }
  ]
});
