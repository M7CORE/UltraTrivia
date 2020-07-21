const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const nodemailer = require("nodemailer");
//const math = require("mathjs");

/////////////////////////////////////////
// Added for Heroku deployment.
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

/////////////////////////////////////////
// Added for Heroku deployment.
app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;

// Changed for Heroku deployment.
//const url = process.env.MONGODB_URI;
const url = 'mongodb+srv://cardsuser:cop4331@cluster0.0mbkf.mongodb.net/COP4331?retryWrites=true&w=majority';

console.log( "url:" + url );

const client = new MongoClient(url);

console.log( "client:" + client );

client.connect();

console.log("After connect");

///////////////////////////////////////////////////
// For Heroku deployment
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

console.log("After app.use()");

///////////////////////////////////////////////////
// For Heroku deployment
app.get('*', (req, res) => 
{
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
});

app.post('/api/signup', async (req, res, next) =>
{
  // incoming: login, email, password
  // outgoing: error

  var error = '';

  //const {login, email, password} = req.body;
  const {email} = req.body;

  //const newUser = {Login:login,Email:email,Password:password, Flag:false, Points:0, Token:null};
  const newUser = {Email:email, Points:0};

  const datab = client.db();
  const check = await datab.collection('users').find({Email:email}).toArray();

  if (check.length > 0){
    return res.status(400).json({error: "user with this email already exists."});
  }

  try
  {
    const db = client.db();
    const result = await db.collection('users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = {error:error};
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, error

  var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var loginName = '';

  //ADD TO VERIFY THE FLAG ONCE EMAIL VERIFICATION IS WORKING

  if( results.length > 0 )
  {
    id = results[0]._id;
    loginName = results[0].Login;
  }
  else
  {
    error = 'Invalid user name/password';
  }

  var ret = {login:loginName, id: id, error:error};
  res.status(200).json(ret);
});

app.post('/api/getPoints', async (req, res, next) => 
{
  // incoming: email
  // outgoing: points, error

 var error = '';

  const { email } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({Email:email}).toArray();

  var points = -1;

  if( results.length > 0 )
  {
    points = results[0].Points;
  }

  var ret = { Points:points, error:error};
  res.status(200).json(ret);
});

app.post('/api/getQuestions', async (req, res, next) => 
{
  // incoming: category
  // outgoing: question, answer1 answer2, answer3, answer4

  var error = '';

  const { category} = req.body;

  const db = client.db();
  const results = await db.collection('questions').find({Category:category}).toArray();

  var ret = { QuestionArray : results, error:''};
  res.status(200).json(ret);
});

app.post('/api/incrementPoints', async (req, res, next) => 
{
  // incoming: userId,
  // outgoing: error

  const {email, addVal} = req.body;
  var error = '';

  try
  {
    const db = client.db();
    const result = db.collection('users').update({Email: email}, {$inc: {Points: addVal}});
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/setPoints', async (req, res, next) => 
{
  // incoming: email, points
  // outgoing: error

  const { email, setVal } = req.body;
  var error = '';

  try
  {
    const db = client.db();
    const result = db.collection('users').update({Email:email}, {$set: {Points:setVal}});
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = {error: error };
  res.status(200).json(ret);
});

app.post('/api/leaderboard', async (req, res, next) => 
{
  // incoming: 
  // outgoing: results, error

  var error = '';

  const { numPlayers } = req.body;

  const db = client.db();
  const results = await db.collection('users').find().sort({"Points": -1}).toArray();
//  const results = await db.collection('users').find( { $query: {}, $orderby: { Points : -1 }, $slice: 2 } );

  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Email + ": " + results[i].Points );
  }

  var ret = { Results: _ret, error: error};
  res.status(200).json(ret);
});

app.post('/api/leaderboard1', async (req, res, next) => 
{
  // incoming: 
  // outgoing: results, error

  var error = '';

  const { numPlayer } = req.body;

  const db = client.db();
  const results = await db.collection('users').find().sort({"Points": -1}).toArray();
//  const results = await db.collection('users').find( { $query: {}, $orderby: { Points : -1 }, $slice: 2 } );

//  var _ret = [];
//  _ret.push( results[numPlayer].Email + ": " + results[i].Points );

  var ret = { email1: results[0].Email, points1: results[0].Points, email2: results[1].Email, points2: results[1].Points,
    email3: results[2].Email, points3: results[2].Points,email4: results[3].Email, points4: results[3].Points,
    email5: results[4].Email, points5: results[4].Points,email6: results[5].Email, points6: results[5].Points,
    email7: results[6].Email, points7: results[6].Points,email8: results[7].Email, points8: results[7].Points,
    email9: results[8].Email, points9: results[8].Points,email10: results[9].Email, points10: results[9].Points,error: error};
  res.status(200).json(ret);
});

//}

// change dfor Heroku deployment
//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () => 
{
  console.log('Server listening on port ${PORT}.');
});