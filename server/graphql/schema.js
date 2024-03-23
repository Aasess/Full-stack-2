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
  }
  type Mutation {
      addEmployee(employee : InputEmployee!): Employee!
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
  },
  Mutation: {
    // Mutation resolvers here
    addEmployee: async (_, { employee }) => {
      const newEmployee = await Employee.create({
        ...employee,
      })
      return newEmployee
    },
  },
}

export { typeDefs, resolvers }
