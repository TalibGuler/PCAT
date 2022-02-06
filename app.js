const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo')

const app = express();

// CONNECT DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set("view engine","ejs") // template engine olarak ejs kullanacağımızı söylüyoruz

// const myLogger = (req, res, next) => {
//   console.log('Middleware log 1');
//   next();
// };

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // urldeki datayı okumamızı sağlıyor
app.use(express.json()); // urldeki datayı jsona döndürmemizi sağlıyor
// app.use(myLogger);

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}); // fotoları yakaladık
  //res.sendFile(path.resolve(__dirname, 'temp/index.html')); // dosya gönderme şekli
  res.render('index',{
    photos: photos
  })
});

app.get('/about', (req,res)=> {
  res.render('about')
})

app.get('/add', (req,res)=> {
  res.render('add')
})

app.post('/photos', async (req,res)=> {
  await Photo.create(req.body);
  //console.log(req.body);
  res.redirect('/') // bitince anasayfaya gitmesini istiyoruz
})

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});