import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  _id: String,
  name: String,
  departure: String,
  arrives: String,
  takeOff: String,
  landing: String,
  origin: String,
  destination: String,
  price: Number,
  restrictions: [String],
  services: [String],
  state: String,
  capacityPlane: Number,
  ticketsSold: Number,
  airline_id: String
});

export default mongoose.model('Flights', FlightSchema);
