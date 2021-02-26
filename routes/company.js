const express = require('express');
const router = express.Router();
var authMiddleware = require('../auth/middleware');
const User = require('../db/user');
const Sticker = require('../db/sticker');
const Company = require('../db/company');
const Job = require('../db/job');
const Asset = require('../db/asset');
const AssetLog = require('../db/assetlog');
const Location = require('../db/location');
const Delay = require('../db/delay');
var _ = require('lodash');
const { json } = require('body-parser');


router.get('/:company', authMiddleware.ensureLoggedIn, authMiddleware.ensureCorrectCompany, (req, res) => {
    if (req.params.company !== 'canalbarge' && req.params.company !== null) {
    Job.getJobs().then(jobs => {
            Asset.getAssetsByVendor(req.params.company).then(assets => {
                AssetLog.getFirstLog().then(logs => {
                Location.getLocations().then(locations => {
                Delay.getDelays().then(delays => {
                delays = JSON.parse(JSON.stringify(delays));
                locations = JSON.parse(JSON.stringify(locations));
                jobs = JSON.parse(JSON.stringify(jobs));
                assets = JSON.parse(JSON.stringify(assets));
                logs = JSON.parse(JSON.stringify(logs));
                assets = assets.sort((a, b) => parseFloat(a.tow_group) - parseFloat(b.tow_group));
                jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
                logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));

                // javascript function to find max log_id value for each asset_name 
                // in order to only print one result per asset name
                const arrayFiltered = [];
                logs.forEach(obj => {
                    const item = arrayFiltered.find(thisItem => thisItem.asset_id === obj.asset_id);
                    if (item) {
                        if (item.log_id < obj.log_id) {
                            item.log_id = obj.log_id;
                        }
                        return;
                    }
                    arrayFiltered.push(obj);
                });
                res.render('companynotcanal', { title : 'Express', 'jobs' : jobs, 'assets' : assets, logs : arrayFiltered, locations : locations, delays : delays });
            });    
            });
            });
            });
        }
        );
} else {
    if (req.params.company == 'canalbarge') {
        Job.getJobs().then(jobs => {
            Asset.getAssets().then(assets => {
                AssetLog.getFirstLog().then(logs => {
                Location.getLocations().then(locations => {
                Delay.getDelays().then(delays => {
                delays = JSON.parse(JSON.stringify(delays));
                locations = JSON.parse(JSON.stringify(locations));
                jobs = JSON.parse(JSON.stringify(jobs));
                assets = JSON.parse(JSON.stringify(assets));
                logs = JSON.parse(JSON.stringify(logs));
                assets = assets.sort((a, b) => parseFloat(a.tow_group) - parseFloat(b.tow_group));
                jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
                logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                // trying to group delays by date
                // let finalObj = {}
                // delays.forEach((games) => {
                //     const date = games.delay_stop.split('T')[0]
                //     if (finalObj[date]) {
                //         finalObj[date].push(games);
                //     } else {
                //         finalObj[date] = [games];
                //     }
                // });
                // finalObj = JSON.parse(JSON.stringify(finalObj));
                // console.log(finalObj);

                // javascript function to find max log_id value for each asset_name 
                // in order to only print one result per asset name
                const arrayFiltered = [];
                logs.forEach(obj => {
                    const item = arrayFiltered.find(thisItem => thisItem.asset_id === obj.asset_id);
                    if (item) {
                        if (item.log_id < obj.log_id) {
                            item.log_id = obj.log_id;
                        }
                        return;
                    }
                    arrayFiltered.push(obj);
                });
                res.render('company', { title : 'Express', 'jobs' : jobs, 'assets' : assets, logs : arrayFiltered, locations : locations, delays: delays });
            });    
            });
            });
            });
        }
        );
    }}});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;


