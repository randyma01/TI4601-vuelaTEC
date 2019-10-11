import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({});

export default mongoose.model('Employee', EmployeeSchema);
