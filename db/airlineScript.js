//--- use database ---//

//use vueltaTEC;

//--- show database ---//

db;

//--- create collection ---//

db.createCollection('airlines');

//--- fill collection ---//
db.airlines.insert({
  codeOACI: 'AAL',
  name: 'American Airlines',
  countries: [
    'Australia',
    'Aruba',
    'Brasil',
    'United Arab Emirates',
    'Costa Rica',
    'Egypt',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});

db.airlines.insert({
  codeOACI: 'CLH',
  name: 'Lufthansa',
  countries: [
    'Australia',
    'Brasil',
    'United Arab Emirates',
    'Costa Rica',
    'Egypt',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});

db.airlines.insert({
  codeOACI: 'SHT',
  name: 'British Airways',
  countries: [
    'Australia',
    'Aruba',
    'Brasil',
    'United Arab Emirates',
    'Costa Rica',
    'Egypt',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});

db.airlines.insert({
  codeOACI: 'UAE',
  name: 'Emirates',
  countries: [
    'Australia',
    'Brasil',
    'United Arab Emirates',
    'Egypt',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});

db.airlines.insert({
  codeOACI: 'JBU',
  name: 'JetBlue',
  countries: [
    'Brasil',
    'Costa Rica',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});

db.airlines.insert({
  codeOACI: 'QTR',
  name: 'Qatar Airways',
  countries: [
    'Australia',
    'United Arab Emirates',
    'Egypt',
    'United Kingdom',
    'United States',
    'Germany',
    'Japan'
  ]
});
