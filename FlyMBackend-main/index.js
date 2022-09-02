
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));
  
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

require('dotenv').config();

const mongoString = 'mongodb+srv://officialbidisha1:Schatterjee5511$$SS@clusterflym.gamwr.mongodb.net/test'
mongoose.connect(mongoString);
const database = mongoose.connection

const routes = require('./routes/routes');
const flightroutes = require('./routes/flights');

app.use('/api', routes);
app.use('/flights', flightroutes);
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


