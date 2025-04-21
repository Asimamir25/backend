const express = require("express");
const { getCost, getRecommendations } = require("../controller/costController");
const router = express.Router();
router.get("/cost", getCost);
router.get("/recomend", getRecommendations);

module.exports = router;
