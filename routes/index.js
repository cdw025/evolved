var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Barge = require('../db/barge');
const Boat = require('../db/boat');
const Job = require('../db/job');
const Asset = require('../db/asset');
const AssetLog = require('../db/assetlog');
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
  Asset.getAssets().then(assets => {
    Job.getJobs().then(jobs => {
      AssetLog.getLogs().then(logs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    assets = JSON.parse(JSON.stringify(assets));
    logs = JSON.parse(JSON.stringify(logs));
    jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
    logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
            // javascript function to find max log_id value for each asset_name 
            // in order to only print one result per asset name
            const arrayFiltered = [];
            logs.forEach(obj => {
                const item = arrayFiltered.find(thisItem => thisItem.asset_name === obj.asset_name);
                if (item) {
                    if (item.log_id < obj.log_id) {
                        item.log_id = obj.log_id;
                    }
                    return;
                }
                arrayFiltered.push(obj);
            });



    console.log(arrayFiltered);
    res.render('dashboard', { title: 'Express', jobs: jobs, assets: assets, logs: arrayFiltered });
  });
  });
    });
});


router.get('/assets', authMiddleware.ensureLoggedIn, function(req, res) {
  Asset.getAssets().then(assets => {
    Job.getJobs().then(jobs => {
      AssetLog.getLogs().then(logs => {
    jobs = JSON.parse(JSON.stringify(jobs));
    assets = JSON.parse(JSON.stringify(assets));
    logs = JSON.parse(JSON.stringify(logs));
    jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
    logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
            // javascript function to find max log_id value for each asset_name 
            // in order to only print one result per asset name
            const arrayFiltered = [];
            logs.forEach(obj => {
                const item = arrayFiltered.find(thisItem => thisItem.asset_name === obj.asset_name);
                if (item) {
                    if (item.log_id < obj.log_id) {
                        item.log_id = obj.log_id;
                    }
                    return;
                }
                arrayFiltered.push(obj);
            });



    console.log(arrayFiltered);
    res.render('assets', { title: 'Express', jobs: jobs, assets: assets, logs: arrayFiltered });
  });
  });
    });
});


module.exports = router;
