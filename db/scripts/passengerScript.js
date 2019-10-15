//--- use database ---//
//use TECPlane;

//--- show database ---//
db;

//--- create collections ---//
db.createCollection('passengers');

//--- fill collection ---//
db.passengers.insert({
  _id: '123454325',
  firstName: 'Daniela',
  lastName: 'Solis',
  username: 'danisols',
  email: 'danisols@email.com',
  password: 'QeKl503',
  birthday: ISODate('1995-01-03'),
  country: 'Costa Rica',
  addres: 'Cartago, Cartago, Costa Rica',
  phone: 29898909,
  tickets: [
    {
      _id: 'ktl123',
      amount: 1,
      seats: ['D02'],
      baggage: 1,
      carryOn: 2,
      flight_id: 'AA4573',
      checked: false,
      used: false
    },
    {
      _id: 'sht123',
      amount: 5,
      seats: ['A01', 'A02', 'A03', 'B01', 'B02'],
      baggage: 5,
      carryOn: 2,
      flight_id: 'AA4573',
      checked: false,
      used: false
    }
  ]
});

db.passengers.insert({
  _id: '157483924',
  firstName: 'Laurel',
  lastName: 'Smith',
  username: 'yanny',
  email: 'laurelsmith@email.com',
  password: 'QeKl503',
  birthday: ISODate('1997-03-08'),
  country: 'England',
  addres: 'Small Heath, Birmingham, England',
  phone: 89957392,
  tickets: [
    {
      _id: 'sht123',
      amount: 3,
      seats: ['E01', 'E02', 'E03'],
      baggage: 3,
      carryOn: 3,
      flight_id: 'AA4573',
      checked: false,
      used: false
    },
    {
      _id: 'ktl123',
      amount: 2,
      seats: ['G02', 'G03'],
      baggage: 2,
      carryOn: 1,
      flight_id: 'AA4573',
      checked: false,
      used: false
    },
    {
      _id: 'dua432',
      amount: 1,
      seats: ['F01'],
      baggage: 2,
      carryOn: 2,
      flight_id: 'DU1289',
      checked: false,
      used: false
    }
  ]
});
