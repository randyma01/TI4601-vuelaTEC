//--- use database ---//
//use vueltaTEC;

//--- show database ---//
db;

//--- create collection ---//
db.createCollection('employees');

//--- fill collection ---//

db.employees.insert({
  firstName: 'Camila',
  lastName: 'Murrillo',
  username: 'cammu',
  password: 'oRf5',
  role: 'administrator',
  initalDate: ISODate('2010-03-05')
});

db.employees.insert({
  firstName: 'Andrea',
  lastName: 'Retana',
  username: 'andret',
  password: 'aNY6',
  role: 'operator',
  area: 'counter',
  initalDate: ISODate('2010-03-05')
});

db.employees.insert({
  firstName: 'Ilana',
  lastName: 'Chavarria',
  username: 'ilchav',
  password: 'lYC7',
  role: 'operator',
  area: 'boarding',
  initalDate: ISODate('2016-04-02')
});

db.employees.insert({
  firstName: 'Jorge',
  lastName: 'Lizano',
  username: 'jgliz',
  password: 'jlis',
  role: 'technician',
  area: 'load',
  initalDate: ISODate('2012-07-10')
});

db.employees.insert({
  firstName: 'Paul',
  lastName: 'Greenwood',
  username: 'plfw',
  password: 'GfP9',
  role: 'technician',
  area: 'maintenance',
  initalDate: ISODate('2012-07-10')
});
