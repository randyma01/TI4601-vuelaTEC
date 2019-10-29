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
  seats: [],
  bagagge: 1,
  carryOn: 2,
  flight_id: 'AA4573',
  passenger_id: 123454325,
  checked: false,
  boarded: false,
  dateBought: '2019-12-03'
});

db.tickets.insert({
  _id: 'sht123',
  amount: 5,
  seats: [],
  bagagge: 5,
  carryOn: 2,
  flight_id: 'AA4573',
  passenger_id: 123454325,
  checked: false,
  boarded: false,
  dateBought: '2019-12-05'
});

//---//
db.tickets.insert({
  _id: 'sht125',
  amount: 3,
  seats: ['E01', 'E02', 'E03'],
  bagagge: 3,
  carryOn: 3,
  flight_id: 'AA4573',
  passenger_id: 157483924,
  checked: true,
  boarded: false,
  dateBought: '2019-15-03'
});

db.tickets.insert({
  _id: 'hgn135',
  amount: 2,
  seats: ['G02', 'G03'],
  bagagge: 2,
  carryOn: 1,
  flight_id: 'AA4573',
  passenger_id: 157483924,
  checked: true,
  boarded: true,
  dateBought: '2019-18-06'
});

db.tickets.insert({
  _id: 'dua432',
  amount: 1,
  seats: ['F01'],
  bagagge: 2,
  carryOn: 2,
  flight_id: 'DU1289',
  passenger_id: 157483924,
  checked: true,
  boarded: false,
  dateBought: '2019-12-12'
});
