const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

// CONNECT DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // template engine olarak ejs kullanacağımızı söylüyoruz

// const myLogger = (req, res, next) => {
//   console.log('Middleware log 1');
//   next();
// };

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // urldeki datayı okumamızı sağlıyor
app.use(express.json()); // urldeki datayı jsona döndürmemizi sağlıyor
app.use(fileUpload());
app.use(methodOverride('_method'));
// app.use(myLogger);

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated'); // fotoları yakaladık
  //res.sendFile(path.resolve(__dirname, 'temp/index.html')); // dosya gönderme şekli
  res.render('index', {
    photos: photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.dir(req.params.id)
  //res.render('about')
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo: photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // console.log(req.files.image); // Gönderdiğimiz görsellerle ilgili verilere ulaşılırız

  // await Photo.create(req.body);
  // console.log(req.body); // Gönderdiğimiz string verilere ulaşırız
  // res.redirect('/'); // bitince anasayfaya gitmesini istiyoruz

  const uploadDir = 'public/uploads';

  // eğer dosya yoksa... senkron olmasında ki sebep ilk bunun yapılması lazım
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); // seçilen foto yakalandı.
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); // seçilen foto yakalandı.
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
