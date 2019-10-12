//--- use database ---//
//use vueltaTEC;

//--- show database ---//
db;

//--- create collection ---//
db.createCollection('airports');

//--- fill collection ---//
db.airports.insert({
  _id: 'SJO',
  name: 'Juan Santamaria',
  city: 'San Jose',
  country: 'Costa Rica',
  number: '(+506) 2437 2400',
  webPage: 'https://sjoairport.com/.cr'
});

db.airports.insert({
  _id: 'LHR',
  name: 'Heathrow',
  city: 'Greater London',
  country: 'United Kingdom',
  number: '(+44) 844 335 1801',
  webPage: 'https://www.heathrow.com/'
});

db.airports.insert({
  _id: 'FRA',
  name: 'Frankfurt',
  city: 'Frankfurt',
  country: 'Germany',
  number: '(+49) 180 6372 4636',
  webPage: 'https://www.frankfurt-airport.com/'
});

db.airports.insert({
  _id: 'CAI',
  name: 'El Cairo',
  city: 'Cairo',
  country: 'Egipt',
  number: '(+20) 2265 5000',
  webPage: 'https://www.cairo-airport.com/'
});

db.airports.insert({
  _id: 'HND',
  name: 'Haneda',
  city: 'Tokio',
  country: 'Japan',
  number: '(+81) (03) 6428 0888',
  webPage: 'http://www.tokyo-airport-bldg.co.jp'
});

db.airports.insert({
  _id: 'GIG',
  name: 'Galeão',
  city: 'Rio de Janeiro',
  country: 'Brasil',
  number: '(+55) 21 3398 4526',
  webPage: ''
});

db.airports.insert({
  _id: 'DXB',
  name: 'Dubai',
  city: 'Dubai',
  country: 'United Arab Emirates',
  number: '(+971) (04) 216 2525',
  webPage: 'https://www.dubaiairports.ae/'
});

db.airports.insert({
  _id: 'SYD',
  name: 'Kingsford Smith',
  city: 'Sydney',
  country: 'Australia',
  number: '(+61) 2 62747291',
  webPage: 'https://www.sydneyairport.com.au/'
});

db.airports.insert({
  _id: 'ATL',
  name: ' Hartsfield-Jackson',
  city: 'Atlanta',
  country: 'United States',
  number: '(+1) 800-897-1910',
  webPage: 'http://www.atl.com/'
});

db.airports.insert({
  _id: 'AUA',
  name: ' Reina Beatriz ',
  city: 'Oranjestad',
  country: 'Aruba',
  number: '(+297) 5242424',
  webPage: 'https://www.airportaruba.com/'
});
