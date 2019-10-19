import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PassengerSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  birthday: String,
  country: String,
  address: String,
  phone: Number
});

export default mongoose.model('Passenger', PassengerSchema);
