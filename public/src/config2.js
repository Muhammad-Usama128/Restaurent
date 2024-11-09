const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://Usama:usama123@restaurent.d5u0foe.mongodb.net/Restaurent?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

connect.then(()=>{
    console.log('Connected to dishes successful')
}).catch((error)=>{
    console.log('Connection error dishes')
})

const foodschema = new mongoose.Schema({
    name : String,
    catagore : String,
    img : String,
    desc : String,
    price : Number,
    popular : Boolean
})

const dishes = new mongoose.model('dishes', foodschema)
module.exports = dishes;