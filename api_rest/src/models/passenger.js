import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  amount: Number,
  seats: [String],
  bagagge: Number,
  carryOn: Number,
  flight_id: String,
  checked: Boolean,
  used: Boolean
});

const PassengerSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  birthday: String,
  country: String,
  address: String,
  phone: Number,
  tickets: [TicketSchema]
});

//export default moongoose.model('Ticket', TicketSchema);
export default mongoose.model('Passenger', PassengerSchema);
