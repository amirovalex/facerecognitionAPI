const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'sasha',
    password : '',
    database : 'smart-brain'
  }
});

const salt = bcrypt.genSaltSync(10);
const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {res.send(database.users)})
app.post('/signin', signin.handleSignIn(db,bcrypt))
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})
// bcrypt.hash(password, salt, function(err, hash) {
//     console.log(hash)
// });
// 	bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
app.get('/profile/:id' , (req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,db)})
app.listen(3000, ()=> {console.log('app is running on port 3000')})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
/*

/ --> res = this is working
/signin --> POST = success / fail;
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/