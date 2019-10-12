import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AirlineSchema = new Schema({
  _id: String,
  name: String,
  countries: Array
});

export default mongoose.model('Airline', AirlineSchema);
