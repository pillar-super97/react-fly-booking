const express = require("express");
const Model = require("../models/flightmodel");

const RequestModel = require("../models/requesflightmodel");

const router = express.Router();

module.exports = router;

router.post("/post", async (req, res) => {
  const data = new Model({
    airline: req.body.airline,
    from: req.body.from,
    date: req.body.date,

    arrival: req.body.arrival,
    price: req.body.price,
    duration: req.body.duration,
    type: req.body.type,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.availableSeats,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post ('/getFlights', async(req, res) => {

  try{
    let response;
    const flights = await Model.find({
      to: req.body.to,
      from: req.body.from,
      date: req.body.date,
    });
    response ={
      responseData: flights,
      responseMessage: 'Flights fetched'
    }
    return res.send(response);
  }
  catch(error){
    console.log(error);
    return res.status(500).send();
  }
})

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
