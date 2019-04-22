const {Schema,model} = require('mongoose');
const userSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        requireed:true
    },
    password:{
        type: String,
        requireed:true
    }
})
module.exports=new model('user',userSchema);