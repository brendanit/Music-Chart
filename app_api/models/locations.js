const mongoose = require('mongoose');



const reviewSchema = new mongoose.Schema({
author: { 
type: String, 
required: true 
}, 
rating: { 
type: Number, 
required: true, 
min: 0, 
max: 5 
}, 
reviewText: { 
type: String, 
required: true 
}, 
createdOn: { 
type: Date, 
'default': Date.now 
} 
});


const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  album: String,
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  
});

mongoose.model('Location', locationSchema);