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
  password:
    'cf35726da54137b15301b89b6cd836739fef4125c7efaf3cbcf93384477d7701kszGlK8wwKC7Xl/R38PMOA==',
  role: 'administrator',
  initalDate: '2010-04-03'
});

db.employees.insert({
  _id: 2483429504,
  firstName: 'Andrea',
  lastName: 'Retana',
  username: 'andret',
  password:
    '5a764bb4a767d8e03a45a9b6ac3b5f103d05900ec001f89b9e174b7038ff7b93ZrqDBEutTMSUq3si8jhSSw==',
  role: 'operator',
  area: 'counter',
  initalDate: '2011-14-07'
});

db.employees.insert({
  _id: 1163428574,
  firstName: 'Ilana',
  lastName: 'Chavarria',
  username: 'ilchav',
  password:
    '55e895bda36615629ee52243966a77dd67eb1ff2a8482ece94298eee9646e10a4GDWe+4hjZ4kHGVbP3z+Tg==',
  role: 'operator',
  area: 'boarding',
  initalDate: '2015-23-05'
});

db.employees.insert({
  _id: 3547318409,
  firstName: 'Jorge',
  lastName: 'Lizano',
  username: 'jgliz',
  password:
    '6102fcaa9c6af94b51c7d0d692673ca531a8993daa6204233ad8d1254b63819a1piSGFfMuLRufwRFrKUMDg==',
  role: 'technician',
  area: 'load',
  initalDate: '2008-03-12'
});

db.employees.insert({
  _id: 45647329,
  firstName: 'Paul',
  lastName: 'Greenwood',
  username: 'plfw',
  password:
    'cf80bf23ceca9b94ae14b857baac6fe2a652adcf6c47274a6dd45ab337849549q4jaxkgHPCGTRkn1keAMhw==',
  role: 'technician',
  area: 'maintenance',
  initalDate: '2013-07-02'
});
