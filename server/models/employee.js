import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    enum: ['Employee', 'Manager', 'Director', 'VP'],
  },
  department: {
    type: String,
    enum: ['IT', 'Marketing', 'HR', 'Engineering'],
  },
  employeeType: {
    type: String,
    enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'],
  },
  currentStatus: {
    type: Number,
    default: 1, //1 means working, 0 means retired
  },
})

// define the Employee Model
export const Employee = mongoose.model('Employee', EmployeeSchema)
