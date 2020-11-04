const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/user');
const Barge = require('../db/barge');
const Job = require('../db/job');
const Asset = require('../db/asset');
const AssetLog = require('../db/assetlog');

// Route paths are prepended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'locked'
    });
});

function validUser(user) {
    const validEmail = typeof user.email == 'string' &&
                        user.email.trim() !='';

    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() !='' &&
                        user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            console.log('user', user);
            //If user not found
            if(!user) {
                //this is a unique email
                // hash password
                bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    const user = {
                        email: req.body.email,
                        password: hash,
                        created_at: new Date()
                    };

                    User
                    .create(user)
                    .then(id => {
                // redirect
                res.json({
                    id,
                    message: 'all good'
                });
                    });
                // insert user into db

                });
            } else {
                //email in use
                next(new Error('email in use'));
            }
        });
    } else {
        next(new Error('Invalid user'));
    }
});

function validJob(job) {
    const validJobNumber = typeof job.ordnbr == 'string' &&
                        job.ordnbr.trim() !='';

    return validJobNumber;
}

router.post('/login', (req, res, next) => {
    if(validUser(req.body)) {
        //check to see if in DB
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            console.log('user', user);
            if(user) {
                //compare password with hashed password
                bcrypt.compare(req.body.password, user.password)
                .then((result) => {
                    // if the passwords matched
                    if(result) {
                        // setting the 'set-cookie' header
                        const isSecure = req.app.get('env') === 'development';
                        res.cookie('user_id', user.id, {
                            httpOnly: true,
                            signed: true,
                            sameSite: 'strict'
                        });
                        res.json({
                            id: user.id,
                            message: 'Logged In!'
                        });
                    } else {
                        next(new Error('Invalid password'))
                    }

                });

            } else {
                next(new Error('Invalid login'));
            }
        });
    } else {
        next(new Error('Invalid Login'));
    }
});

router.get('/dashboard/:order_id', (req, res) => {
    if (!isNaN(req.params.order_id)) {
        Job.getOneByJobId(req.params.order_id).then(job => {
        if (job) {
            res.json(job);
        } else {
            res.status(404);
            res.send('job not found');
        }
        });
    } else {
        res.status(500);
        res.send('invalid ID');
    }
    });


router.post('/newjob', (req, res, next) => {
    if(validJob(req.body)) {
        Job
        .getOneByJobNumber(req.body.ordnbr)
        .then(job => {
            console.log('job', job);
            //If trip not found
            if(!job) {
                //this is a unique trip
                    const job = {
                        ordnbr : req.body.ordnbr,
                        status : req.body.status,
                        pm_assigned : req.body.pm_assigned,
                        origin : req.body.origin,
                        origin_desc : req.body.origin_desc,
                        destination : req.body.destination,
                        destination_desc : req.body.destination_desc,
                        contract_signed : req.body.contract_signed,
                        kickoff_meeting : req.body.kickoff_meeting,
                        lump_sum_amount : req.body.lump_sum_amount,
                        lump_sum_paid : req.body.lump_sum_paid,
                        proforma_amount : '0',
                        proforma_paid : 'unsent',
                        barge_name : req.body.barge_name,
                        tug_name : req.body.tug_name,
                        est_start_date : req.body.est_start_date,
                        ord_notes : req.body.ord_notes,
                        customer : req.body.customer,
                        customer_nm : req.body.customer_nm,
                        customer_phone : req.body.customer_phone,
                        customer_email : req.body.customer_email,
                        customer_notes : req.body.customer_notes,
                        vendor : req.body.vendor,
                        vendor_nm : req.body.vendor_nm,
                        vendor_phone : req.body.vendor_phone,
                        vendor_email : req.body.vendor_email,
                        vendor_notes : req.body.vendor_notes,
                        created_by: 'Neal White',
                        last_modified_by: 'Neal White',
                        created_dttm: new Date(),
                        modified_dttm: new Date(),
                    };

                    Job
                    .create(job)
                    .then(id => {
                // redirect
                res.json({
                    id,
                    message: 'trip created'
                });
                    });
                } else {
                    // existing trip
                    console.log('trip already exists');
                }
            });
        }
    });

router.put('/dashboard/:order_id', (req, res, next) => {
    if(validJob(req.body)) {
        Job
        .update(req.params.order_id, req.body).then(job => {
            res.json(job);
        });
        } else {
            next(new Error('invalid job neal'));
        }
});


router.post('/duplicatejob', (req, res, next) => {
    if(validJob(req.body)) {
        Job
        .getOneByJobNumber(req.body.ordnbr)
        .then(job => {
            console.log('job', job);
            //If trip not found
            if(!job) {
                //this is a unique trip
                    const job = {
                        ordnbr : req.body.ordnbr,
                        status : req.body.status,
                        pm_assigned : req.body.pm_assigned,
                        origin : req.body.origin,
                        origin_desc : req.body.origin_desc,
                        destination : req.body.destination,
                        destination_desc : req.body.destination_desc,
                        contract_signed : req.body.contract_signed,
                        kickoff_meeting : req.body.kickoff_meeting,
                        lump_sum_amount : req.body.lump_sum_amount,
                        lump_sum_paid : req.body.lump_sum_paid,
                        proforma_amount : req.body.proforma_amount,
                        proforma_paid : req.body.proforma_paid,
                        barge_name : req.body.barge_name,
                        tug_name : req.body.tug_name,
                        est_start_date : req.body.est_start_date,
                        ord_notes : req.body.ord_notes,
                        customer : req.body.customer,
                        customer_nm : req.body.customer_nm,
                        customer_phone : req.body.customer_phone,
                        customer_email : req.body.customer_email,
                        customer_notes : req.body.customer_notes,
                        vendor : req.body.vendor,
                        vendor_nm : req.body.vendor_nm,
                        vendor_phone : req.body.vendor_phone,
                        vendor_email : req.body.vendor_email,
                        vendor_notes : req.body.vendor_notes,
                        created_by: 'Neal White',
                        last_modified_by: 'Neal White',
                        created_dttm: new Date(),
                        modified_dttm: new Date(),
                    };

                    Job
                    .create(job)
                    .then(id => {
                // redirect
                res.json({
                    id,
                    message: 'trip duplicated'
                });
                    });
                } else {
                    // existing trip
                    console.log('trip ID already exists');
                }
            });
        }
    });


router.delete('/dashboard/:order_id', (req, res, next) => {
        Job
        .delete(req.params.order_id).then(() => {
            res.send('deleted');
        });
});


router.post('/newasset', (req, res, next) => {
                    const asset = {
                        ordnbr : req.body.ordnbr,
                        asset_type : req.body.asset_type,
                        asset_name: req.body.asset_name,
                        vendor_name : req.body.vendor_name,
                        tow_group : req.body.tow_group,
                        asset_start : req.body.asset_start,
                        asset_stop : req.body.asset_stop,
                        asset_status: req.body.asset_status,
                        created_by: 'Neal White',
                        last_modified_by: 'Neal White',
                        created_dttm: new Date(),
                        modified_dttm: new Date(),
                    };

                    Asset
                    .create(asset)
                    .then(asset => {
                // redirect
                res.json({
                    asset,
                    message: 'asset created'
                });

                    });
                });        




    function validAsset(asset) {
    const validAssetNumber = asset.asset_id.trim() !='';

    return validAssetNumber;
}

    router.put('/dashboard/asset/:asset_id', (req, res, next) => {
        if(validAsset(req.body)) {
            Asset
            .update(req.params.asset_id, req.body).then(asset => {
                res.json(asset);
            });
            } else {
                next(new Error('invalid asset neal'));
            }
    });

    router.delete('/dashboard/asset/:asset_id', (req, res, next) => {
        Asset
        .delete(req.params.asset_id).then(() => {
            res.send('deleted');
        });
});


module.exports = router;