const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CONNECT DB
// mongoose.connect('mongodb://localhost/pcat-test-db');

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CREATE A SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// CREATE A PHOTO
Photo.create({
  title: 'Photo title 2',
  description: 'Photo description 2',
});

// READ A PHOTO
Photo.find({}, (error, data) => {
  console.log(data);
});

// UPDATE A PHOTO
const id = "61ff9acc12c2d670553045ce"

Photo.findByIdAndUpdate(
    id,{
        title: "Photo title 1 updated",
        description: "Photo description 1 updated"
    },
    {
        new: true
    },
    (error,data) => {
        console.log(data)
    }
)

// DELETE A PHOTO
const id = "61ff9c479afd71e652bf3110"
Photo.findByIdAndDelete(id, (error,data)=>{
    console.log("Photo is removed...")
})