var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Barge = require('../db/barge');
const Boat = require('../db/boat');
const Job = require('../db/job');
const Asset = require('../db/asset');
const Location = require('../db/location');
const AssetLog = require('../db/assetlog');
const Delay = require('../db/delay');
var _ = require('lodash');

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
  res.clearCookie('company');
  res.redirect('/login');
});

// router.get('/barges', authMiddleware.ensureLoggedIn, function(req, res) {
//   Barge.getBarges().then(barges => {
//     barges = JSON.parse(JSON.stringify(barges));
//     res.render('barges', { title: 'Express', barges: barges });
//   });
// });

// router.get('/boats', authMiddleware.ensureLoggedIn, function(req, res) {
//   Boat.getBoats().then(boats => {
//     boats = JSON.parse(JSON.stringify(boats));
//     res.render('boats', { title: 'Express', boats: boats });
//   });
// });

router.get('/dashboard', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, function(req, res) {
    Job.getJobs().then(jobs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    // sort trip numbers largest to smallest accounting for leading D in ordnbr
    function sortByDigits(array) {
      var re = /\D/g;
      
      array.sort(function(a, b) {
          return(parseInt(b.ordnbr.replace(re, ""), 10) - parseInt(a.ordnbr.replace(re, ""), 10));
      });
      return(array);
  }
    jobs = sortByDigits(jobs);
    res.render('dashboard', { title: 'Express', jobs: jobs
  });
    });
});

router.get('/oncall', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, function(req, res) {
  res.render('oncall', { title : 'Express'});
});

router.get('/test', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, function(req, res) {
  Delay.getDelays().then(delays => {
    delays = JSON.parse(JSON.stringify(delays));
    res.render('test', { title : 'Express', delays : delays });
    console.log(delays);
  });
});

router.get('/locations', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, function(req, res) {
  Location.getLocations().then(locations => {
    locations = JSON.parse(JSON.stringify(locations));
    res.render('locations', { title: 'Express', locations : locations });
  });
});

module.exports = router;
