//--- use database ---//
//use TECPlane;

//--- show database ---//
db;

//--- create collections ---//
db.createCollection('tickets');

//--- fill collection ---//
db.tickets.insert({
  _id: 'ktl123',
  amount: 1,
  seats: ['D02'],
  baggage: 1,
  carryOn: 2,
  flight_id: 'AA4573',
  passengers_id: '123454325',
  checked: false,
  used: false
});

db.tickets.insert({
  _id: 'sht123',
  amount: 5,
  seats: ['A01', 'A02', 'A03', 'B01', 'B02'],
  baggage: 5,
  carryOn: 2,
  flight_id: 'AA4573',
  passengers_id: '123454325',
  checked: false,
  used: false
});

//---//
db.tickets.insert({
  _id: 'sht123',
  amount: 3,
  seats: ['E01', 'E02', 'E03'],
  baggage: 3,
  carryOn: 3,
  flight_id: 'AA4573',
  passengers_id: '157483924',
  checked: false,
  used: false
});

db.tickets.insert({
  _id: 'ktl123',
  amount: 2,
  seats: ['G02', 'G03'],
  baggage: 2,
  carryOn: 1,
  flight_id: 'AA4573',
  passengers_id: '157483924',
  checked: false,
  used: false
});

db.tickets.insert({
  _id: 'dua432',
  amount: 1,
  seats: ['F01'],
  baggage: 2,
  carryOn: 2,
  flight_id: 'DU1289',
  passengers_id: '157483924',
  checked: false,
  used: false
});
