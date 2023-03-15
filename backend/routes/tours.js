const express = require('express')
const router = express.Router()
const toursController = require("../controllers/toursController")

router.get("/", toursController.getAllTours)
        .get("/bystate", toursController.getToursByState)
        .get("/bycountry", toursController.getToursByCountry)
        .post("/", toursController.createNewTour)
        .patch("/", toursController.updateTour)
        .delete("/", toursController.deleteTour)

module.exports = router

