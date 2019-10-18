//--- use database ---//
//use TECPlane;

//--- show database ---//
db;

//--- create collections ---//
db.createCollection('passengers');

//--- fill collection ---//
db.passengers.insert({
  _id: 123454325,
  firstName: 'Giovanni',
  lastName: 'Rodriguez',
  username: 'giorod',
  email: 'giorods@email.com',
  password: 'QeKl503',
  birthday: ISODate('1995-01-03'),
  country: 'Costa Rica',
  address: 'Cartago, Cartago, Costa Rica',
  phone: 29898909
});

db.passengers.insert({
  _id: 157483924,
  firstName: 'Laurel',
  lastName: 'Smith',
  username: 'yanny',
  email: 'laurelsmith@email.com',
  password: 'QeKl503',
  birthday: ISODate('1997-03-08'),
  country: 'England',
  address: 'Small Heath, Birmingham, England',
  phone: 89957392
});
