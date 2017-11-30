const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Profile = require('./Model/Profile')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (res,req,next) {
  next();
});

// get
router.route('/profile').get(function (req, res) {
  Profile.find(function (err, profiles) {
    if (err)  {
      res.send(err);
    }
    res.json(profiles);

  });
});

app.use('/api', router);

mongoose.connect('mongodb://localhost/ProfileDb', {
  useMongoClient: true
}, function (err, db) {
  if (!err) {
    console.log("We're connected to Mongo");
  }
});



app.listen(port);
console.log('Listening on ' + port);
