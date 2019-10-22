//--- use database ---//
//use TECPlane;

//--- show database ---//
db;

//--- create collection ---//
db.createCollection('employees');

//--- fill collection ---//
db.employees.insert({
  _id: 657483056,
  firstName: 'Camila',
  lastName: 'Murrillo',
  username: 'cammu',
  password: 'oRf5',
  role: 'administrator',
  initalDate: '2010-04-03'
});

db.employees.insert({
  _id: 2483429504,
  firstName: 'Andrea',
  lastName: 'Retana',
  username: 'andret',
  password: 'aNY6',
  role: 'operator',
  area: 'counter',
  initalDate: '2011-14-07'
});

db.employees.insert({
  _id: 1163428574,
  firstName: 'Ilana',
  lastName: 'Chavarria',
  username: 'ilchav',
  password: 'lYC7',
  role: 'operator',
  area: 'boarding',
  initalDate: '2015-23-05'
});

db.employees.insert({
  _id: 3547318409,
  firstName: 'Jorge',
  lastName: 'Lizano',
  username: 'jgliz',
  password: 'jlis',
  role: 'technician',
  area: 'load',
  initalDate: '2008-03-12'
});

db.employees.insert({
  _id: 45647329,
  firstName: 'Paul',
  lastName: 'Greenwood',
  username: 'plfw',
  password: 'GfP9',
  role: 'technician',
  area: 'maintenance',
  initalDate: '2013-07-02'
});
