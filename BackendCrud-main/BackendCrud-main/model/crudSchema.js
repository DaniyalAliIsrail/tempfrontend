const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl:{
    type:String,
    required:true
  },
},
{ timestamps: true },
);

const CrudModel = mongoose.model("crud", schema);

module.exports = CrudModel;
