const Image = require("../models/imgModel")
const multer  = require('multer')
const path = require('path')
const fs = require("fs");

const getAllImages = async (req, res) => {
    const images = await Image.find().lean()
    //if no images
    if (!images.length) {
        return res.status(400).json({message: "No images found"})
    }
    res.json(images)
}

const uploadImage = async (req, res) => {
    const { imageName, origName, fileFormat } = req.data
    // const imgName = 'upload_7e466ab227741c9a7f5b6b1122fc318f'
    const filePath = path.join(__dirname,'../',`/uploads/${imgName}`)
    let chunks = []
    let fileBuffer
    const stream = fs.createReadStream(filePath)
    console.log("here")

    stream.once('error', (err) => {
        console.error(err)
        return res.status(500).json({message: err})
    })

    stream.once('end', () => {
        console.log("here")
        fileBuffer = Buffer.concat(chunks)
        const imageObject = { 
            img: {
                data: fileBuffer, contentType: "image/jpeg"
            },
            name: "imgName"
        }

        const uploadedImage = Image.create(imageObject)

        if (uploadedImage) {
            return res.status(200).json({message: "Image created"})
        } else {
            return res.status(400).json({message: "Invalid image data"})
        }
    })

    stream.on('data', (chunk) => {
        chunks.push(chunk)
    })

}

module.exports = {
    getAllImages,
    uploadImage
}