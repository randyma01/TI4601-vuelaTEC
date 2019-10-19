import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  _id: String,
  amount: Number,
  seats: [String],
  bagagge: Number,
  carryOn: Number,
  flight_id: String,
  passenger_id: Number,
  checked: Boolean,
  boarded: Boolean
});

export default mongoose.model('Ticket', TicketSchema);
