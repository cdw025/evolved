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
const { getLocations } = require('../db/location');



// router for main job page (details of job)
router.get('/:order_id', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, (req, res) => {
        if (!isNaN(req.params.order_id)) {
            Job.getOneByJobId(req.params.order_id).then(job => {
                if(job) {
                    Asset.getAssetsbyJobNumber(req.params.order_id).then(assets => {
                        Delay.getDelaysByJobNumber(req.params.order_id).then(delays => {
                            AssetLog.getLogsByJobNumber(req.params.order_id).then(logs => {
                                Location.getLocations().then(locations => {
                                    delays = JSON.parse(JSON.stringify(delays));
                                    locations = JSON.parse(JSON.stringify(locations));
                                    assets = JSON.parse(JSON.stringify(assets));
                                    logs = JSON.parse(JSON.stringify(logs));
                                    assets = assets.sort((a, b) => parseFloat(a.tow_group) - parseFloat(b.tow_group));
                                    logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                                    
                                    res.render('jobview', { title : 'Express', 'job' : job, 'assets' : assets, logs : logs, locations : locations, delays : delays });


                                });
                            });
                        });
                    });
                } else {
                    resError(res, 404, "Job not Found")
                }
            });


        } else {
            res.status(500);
            res.send('invalid ID');
        }
        });


// router for one pager (job page)
router.get('/:order_id/logs', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, (req, res) => {
    if (!isNaN(req.params.order_id)) {
        Job.getOneByJobId(req.params.order_id).then(job => {
            if(job) {
                Asset.getAssetsbyJobNumber(req.params.order_id).then(assets => {
                    Delay.getDelaysByJobNumber(req.params.order_id).then(delays => {
                        AssetLog.getLogsByJobNumber(req.params.order_id).then(logs => {
                            Location.getLocations().then(locations => {
                                delays = JSON.parse(JSON.stringify(delays));
                                locations = JSON.parse(JSON.stringify(locations));
                                assets = JSON.parse(JSON.stringify(assets));
                                logs = JSON.parse(JSON.stringify(logs));
                                assets = assets.sort((a, b) => parseFloat(a.tow_group) - parseFloat(b.tow_group));
                                logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                                
                                res.render('jobview_logs', { title : 'Express', 'job' : job, 'assets' : assets, logs : logs, locations : locations, delays : delays });


                            });
                        });
                    });
                });
            } else {
                resError(res, 404, "Job not Found")
            }
        });


    } else {
        res.status(500);
        res.send('invalid ID');
    }
    });

    // router for one pager (job page)
router.get('/:order_id/delays', authMiddleware.ensureLoggedIn, authMiddleware.EnsureCanalForAccess, (req, res) => {
    if (!isNaN(req.params.order_id)) {
        Job.getOneByJobId(req.params.order_id).then(job => {
            if(job) {
                Asset.getAssetsbyJobNumber(req.params.order_id).then(assets => {
                    Delay.getDelaysByJobNumber(req.params.order_id).then(delays => {
                        AssetLog.getLogsByJobNumber(req.params.order_id).then(logs => {
                            Location.getLocations().then(locations => {
                                delays = JSON.parse(JSON.stringify(delays));
                                locations = JSON.parse(JSON.stringify(locations));
                                assets = JSON.parse(JSON.stringify(assets));
                                logs = JSON.parse(JSON.stringify(logs));
                                assets = assets.sort((a, b) => parseFloat(a.tow_group) - parseFloat(b.tow_group));
                                logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                                delays = delays.sort((a, b) => parseFloat(b.delay_id) - parseFloat(a.delay_id));
                                res.render('jobview_delays', { title : 'Express', 'job' : job, 'assets' : assets, logs : logs, locations : locations, delays : delays });


                            });
                        });
                    });
                });
            } else {
                resError(res, 404, "Job not Found")
            }
        });


    } else {
        res.status(500);
        res.send('invalid ID');
    }
    });


module.exports = router;