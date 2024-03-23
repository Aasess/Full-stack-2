// graphql/schema.js
import { GraphQLScalarType, Kind } from 'graphql'
import { Employee } from '../models/employee.js'

const GQLDate = new GraphQLScalarType({
  // GQLDate scalar type definition here
  name: 'GQLDate',
  description: 'Date type',
  serialize(value) {
    return new Date(value).toLocaleDateString()
  },

  //When using variables (params)
  parseValue(value) {
    return new Date(value)
  },
  //When using literal (params)
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : undefined
  },
})

const typeDefs = `
  enum Title {
    Employee 
    Manager 
    Director
    VP
  }

  enum Department {
    IT 
    Marketing 
    HR
    Engineering
  }

  enum EmployeeType {
    FullTime 
    PartTime 
    Contract
    Seasonal
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: GQLDate
    title: Title
    department: Department
    employeeType: EmployeeType
    currentStatus: Int
  }

  input InputEmployee {
    firstName: String
    lastName: String
    age: Int
    dateOfJoining: GQLDate
    title: Title
    department: Department
    employeeType: EmployeeType
    currentStatus: Int
  }

  type Query {
      getEmployees: [Employee!]!
      getEmployee(id: ID!): Employee!
  }
  type Mutation {
      addEmployee(employee : InputEmployee!): Employee!
      editEmployee(id: ID!, employee: InputEmployee!): Employee!
      deleteEmployee(id: ID!): Employee!
  }

  scalar GQLDate

`

const resolvers = {
  GQLDate,
  Query: {
    // Query resolvers here
    getEmployees: async () => {
      const employees = await Employee.find({})
      return employees
    },
    getEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id)
      if (!employee) {
        throw new Error('Employee not found')
      }
      return {
        ...employee._doc,
        id: employee._id,
      }
    },
  },
  Mutation: {
    // Mutation resolvers here
    addEmployee: async (_, { employee }) => {
      const newEmployee = await Employee.create({
        ...employee,
      })
      return newEmployee
    },
    editEmployee: async (_, { id, employee }) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
        new: true,
      })
      if (!updatedEmployee) {
        throw new Error('Employee not found')
      }
      return {
        ...updatedEmployee._doc,
        id: updatedEmployee._id,
      }
    },
    deleteEmployee: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id)
      if (deletedEmployee) {
        return deletedEmployee
      } else {
        throw new Error('Employee not found')
      }
    },
  },
}

export { typeDefs, resolvers }
