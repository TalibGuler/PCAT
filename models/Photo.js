const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now, // her foto yüklendiğinde o tarihi varsayılan tarih yapmak için
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;