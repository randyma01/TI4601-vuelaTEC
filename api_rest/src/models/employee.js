import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  role: String,
  initalDate: String
});

export default mongoose.model('Employee', EmployeeSchema);
