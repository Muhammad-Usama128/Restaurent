const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://Usama:usama123@restaurent.d5u0foe.mongodb.net/Restaurent?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

connect.then(()=>{
    console.log('Connected to users successful')
}).catch((error)=>{
    console.log('Connection error users')
})

const signupschema = new mongoose.Schema({
    name : String,
    address : String,
    email : String,
    password : String
})

const connection = new mongoose.model('users', signupschema)
module.exports = connection;