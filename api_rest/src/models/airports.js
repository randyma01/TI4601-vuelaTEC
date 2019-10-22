import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AirportSchema = new Schema({
  _id: String,
  name: String,
  city: String,
  country: String,
  number: String,
  webPage: String,
  airport_id: String
});

export default mongoose.model('Airport', AirportSchema);
