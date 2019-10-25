import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PassengerSchema = new Schema({
  _id: Number,
  address: String,
  birthday: String,
  country: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: [Number],
  username: String
});

export default mongoose.model('Passenger', PassengerSchema);
