var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Barge = require('../db/barge');
const Boat = require('../db/boat');
const Job = require('../db/job');
const Tow = require('../db/tow');

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

// router.get('/dashboard', authMiddleware.ensureLoggedIn, function(req, res) {
//   Job.getJobs().then(jobs => {
//     jobs = JSON.parse(JSON.stringify(jobs));
//     res.render('dashboard', { title: 'Express', jobs: jobs });
//     });
// });

router.get('/dashboard', authMiddleware.ensureLoggedIn, function(req, res) {
  Tow.getTows().then(tows => {
    Job.getJobs().then(jobs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    tows = JSON.parse(JSON.stringify(tows));
    jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
    res.render('dashboard', { title: 'Express', jobs: jobs, tows: tows });
  });
    });
});

router.get('/tows', authMiddleware.ensureLoggedIn, function(req, res) {
  Tow.getTows().then(tows => {
    Job.getJobs().then(jobs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    tows = JSON.parse(JSON.stringify(tows));
    jobs.sort((a, b) => parseFloat(b.order_id) - parseFloat(a.order_id));
    res.send(jobs);
  });
    });
});


module.exports = router;
