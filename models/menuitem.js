const mongoose=require('mongoose');
const menuitemschema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    test:{
        type: String,
        enum:['spicy', 'sweet', 'sour'],
        require: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingradients:{
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        default:0
    }
})
const menuitem=mongoose.model('menuitem', menuitemschema);
module.exports=menuitem;