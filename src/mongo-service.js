'use strict';

const db = require('monk')(process.env.MONGO_URL);
const challenges = db.get('challenges');
const games = db.get('games');
const ratings = db.get('ratings');

module.exports  = {
  challenges: challenges,
  games: games,
  ratings: ratings
};
