const Tour = require('../models/Tour')

// @desc Get all tours
// @route GET /tours
// @access Private
const getAllTours = async (req, res) => {
    // Get all tours from MongoDB
    const tours = await Tour.find().lean()

    // If no tours 
    if (!tours?.length) {
        return res.status(400).json({ message: 'No tours found' })
    }

    res.json(tours)
}

// @desc Create new tour
// @route POST /tours
// @access Private
const createNewTour = async (req, res) => {
    const { tourname, country, countryState, startdate, enddate, hotspots, active } = req.body
    console.log({country})

    // Confirm data
    if (!tourname) {
        return res.status(400).json({ message: 'Tour name is required' })
    }

    // Check for duplicate tourname
    // const duplicate = await Tour.findOne({ tourname }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate tourname' })
    // }

    const tourObject = {tourname, country, countryState, startdate, enddate, hotspots, active}

    // Create and store new tour 
    const tour = await Tour.create(tourObject)

    if (tour) { //created 
        res.status(201).json({ message: `New tour ${tourname} created` })
    } else {
        res.status(400).json({ message: 'Invalid tour data received' })
    }
}

// @desc Update a tour
// @route PATCH /tours
// @access Private
const updateTour = async (req, res) => {
    const {tourname, country, countryState, startdate, enddate, hotspots, active} = req.body

    // Confirm data 
    if (!id || !tourname || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the tour exist to update?
    const tour = await Tour.findById(id).exec()

    if (!tour) {
        return res.status(400).json({ message: 'Tour not found' })
    }

    // Check for duplicate 
    const duplicate = await Tour.findOne({ tourname }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original tour 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate tourname' })
    }

    tour.tourname = tourname
    tour.country = country
    tour.countryState = countryState
    tour.statedate = startdate
    tour.enddate = enddate
    tour.hotspots = hotspots
    tour.active = active

    const updatedTour = await tour.save()

    res.json({ message: `${updatedTour.tourname} updated` })
}

// @desc Delete a tour
// @route DELETE /tours
// @access Private
const deleteTour = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Tour ID Required' })
    }

    // Does the tour still have assigned notes?
    const note = await Note.findOne({ tour: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Tour has assigned notes' })
    }

    // Does the tour exist to delete?
    const tour = await Tour.findById(id).exec()

    if (!tour) {
        return res.status(400).json({ message: 'Tour not found' })
    }

    const result = await tour.deleteOne()

    const reply = `Tourname ${result.tourname} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllTours,
    createNewTour,
    updateTour,
    deleteTour
}