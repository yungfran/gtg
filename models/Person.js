mongoose = require("mongoose");
const Schema = mongoose.Schema;

PersonSchema = new Schema({
  sub: {
    type: Number
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  newUser: {
    type: Boolean
  },
  strength: {
    type: Object
  },
  startOfNextWeek:{
    type: Date
  },
  repGoals: {
    type: Object
  },
  repsCompleted: {
    type: Object
  },
  exerciseOrder: {
    type: Array
  },
  repsPerSet: {
    type: Object
  }
})



module.exports = Person = mongoose.model("Person", PersonSchema);
