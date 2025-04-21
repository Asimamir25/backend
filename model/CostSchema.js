const { Schema, model } = require("mongoose");

const CostSchema = new Schema({
  customerId: {
    type: String,
  },
  resource: {
    type: String,
  },
  service: {
    type: String,
  },
  region: {
    type: String,
  },
  cost: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

const RecSchema = new Schema({
  customerId: {
    type: String,
    unique: true,
  },
  resource: {
    type: String,
    unique: true,
  },
  recommendation_type: {
    type: String,
    unique: true,
  },
  details: {
    type: String,
    unique: true,
  },
  estimated_savings: {
    type: Number,
    unique: true,
  },
});

const Cost = model("Cost", CostSchema);
const Recommendation = model("Recommendation", RecSchema);

module.exports = { Cost, Recommendation };
