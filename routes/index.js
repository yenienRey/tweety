const tweetBank = require('../tweetBank');
const express = require('express');

const router = express.Router();

// Se puede usar solo una linea: const router = require('express').Router();

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( { name: name } );
    res.render( 'index', { tweets: list, showForm: true, tweetero: name} );
});

router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    var list = tweetBank.find( { id: id } );
    res.render( 'index', { tweets: list } );
});

router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
});

module.exports = function (io) {
    // ...
    
    // definiciones de rutas, etc.
    // ...
    return router;
  };