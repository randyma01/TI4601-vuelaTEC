import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AirlineSchema = new Schema({
  _id: String,
  name: String,
  countries: Array,
  airport_Id: String
});

export default mongoose.model('Airline', AirlineSchema);
