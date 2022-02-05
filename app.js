const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// TEMPLATE ENGINE
app.set("view engine","ejs") // template engine olarak ejs kullanacağımızı söylüyoruz

// const myLogger = (req, res, next) => {
//   console.log('Middleware log 1');
//   next();
// };

//MIDDLEWARES
app.use(express.static('public'));
// app.use(myLogger);

//ROUTES
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html')); // dosya gönderme şekli
  res.render('index')
});

app.get('/about', (req,res)=> {
  res.render('about')
})

app.get('/add', (req,res)=> {
  res.render('add')
})

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
