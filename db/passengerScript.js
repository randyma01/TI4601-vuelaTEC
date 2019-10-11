//--- use database ---//

//use vueltaTEC;

//--- show database ---//

db;

//--- create collections ---//

db.createCollection('passangers');

//--- fill collection ---//
db.passangers.insert({
  firstName: 'Raquel',
  lastName: 'Villalobos',
  birthday: '4-12-1996',
  country: 'Costa Rica',
  phones: [5748395, 2348504],
  email: 'raqvilar@gmail.com'
});
