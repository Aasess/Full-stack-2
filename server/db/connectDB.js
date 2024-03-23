import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri =
    'mongodb+srv://cluster0.qsurdrp.mongodb.net/?retryWrites=true&w=majority'
  const options = {
    //option to maintain stable connection
    useNewUrlParser: true,
    useUnifiedTopology: true,

    //authentication
    user: 'ashishneupane1997',
    pass: '12345',
    dbName: 'employeeDB',
  }
  try {
    await mongoose.connect(uri, options)
    console.log('Connection Successfull')
  } catch (error) {
    return console.log(error)
  }
}
