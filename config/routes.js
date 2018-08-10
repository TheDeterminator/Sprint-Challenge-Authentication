const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  if (user.username && user.password) {
    db.insert(user).into('users').then(response => {
      db('users').where('id', response[0]).first().then(result => {
        res.status(201).json(result)
      }).catch(err => {
        console.log('inner error', err);
      });
    }).catch(err => {
      console.log('outer error', err);
      res.status(500).json({message:`${err}`});
    })
  }
}

let token = jwt.sign({
  something:"who cares"
}, 'Why can’t banks keep secrets? There are too many tellers!');

async function login(req, res) {
  // implement user login
  try {
    const credentials = req.body;
    const foundUser = await db('users').where('username', credentials.username).first();
    const userHash = foundUser.password;
    let isValid = bcrypt.compareSync(credentials.password, userHash);
    if (isValid) {
      res.status(200).json({message:"Logged In", user:credentials.username, token:token});
    }
  } catch (err) {
    res.status(401).json({message:`${err}`});
  }

}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
