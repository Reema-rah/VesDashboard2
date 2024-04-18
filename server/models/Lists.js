const { Schema, model } = require("mongoose");

const ListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
})


const ListModel = model("lists", ListSchema)
module.exports = ListModel