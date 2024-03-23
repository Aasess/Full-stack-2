import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql/schema.js'
import { connectDB } from './db/connectDB.js'

//EXPRESS APPLICATION
const app = new express()

//connect to MongoDB
connectDB()

const server = new ApolloServer({ typeDefs, resolvers })

server.start().then(function () {
  server.applyMiddleware({ app, path: '/graphql', cors: true })
})

const port = 3002
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
