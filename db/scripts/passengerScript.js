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
  password:
    'a34df8c494b455b246403534cf4dd2d35bd22113bc4204ed919aaabd32d3992aGcQ7GiYQvkWvGCRPluSnBw=="',
  birthday: '1995-01-03',
  country: 'Costa Rica',
  address: 'Cartago',
  phone: 29898909
});

db.passengers.insert({
  _id: 157483924,
  firstName: 'Laurel',
  lastName: 'Smith',
  username: 'yanny',
  email: 'laurelsmith@email.com',
  password:
    '50f86debb0083a0fa26efaee4e1992f0a946632aa443659a4ae50a44935acf32A+LAkBHrk9CZzAnfhwyIfw==',
  birthday: '1997-03-08',
  country: 'United Kingdom',
  address: 'Birmingham',
  phone: 89957392
});
