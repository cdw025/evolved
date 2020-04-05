var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Barge = require('../db/barge');
const Boat = require('../db/boat');
const Job = require('../db/job');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('user_id');
  res.redirect('/login');
});

router.get('/barges', authMiddleware.ensureLoggedIn, function(req, res) {
  Barge.getBarges().then(barges => {
    barges = JSON.parse(JSON.stringify(barges));
    res.render('barges', { title: 'Express', barges: barges });
  });
});

router.get('/boats', authMiddleware.ensureLoggedIn, function(req, res) {
  Boat.getBoats().then(boats => {
    boats = JSON.parse(JSON.stringify(boats));
    res.render('boats', { title: 'Express', boats: boats });
  });
});

router.get('/dashboard', authMiddleware.ensureLoggedIn, function(req, res) {
  Job.getJobs().then(jobs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    res.render('dashboard', { title: 'Express', jobs: jobs });
  });
});


module.exports = router;
