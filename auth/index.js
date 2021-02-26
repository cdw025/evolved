const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/user');
const Barge = require('../db/barge');
const Job = require('../db/job');
const Asset = require('../db/asset');
const AssetLog = require('../db/assetlog')
const Delay = require('../db/delay');

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
    const validJobNumber = typeof job.ordnbr == 'string';

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
                        res.cookie('company', user.company, {
                            httpOnly: true,
                            signed: true,
                            sameSite: 'strict'
                        });
                        res.json({
                            id: user.id,
                            company : user.company,
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


router.post('/newjob', (req, res, next) => {
    // if(validJob(req.body)) {
    //     Job
    //     .getOneByJobNumber(req.body.ordnbr)
    //     .then(job => {
    //         console.log('job', job);
    //         //If trip not found
    //         if(!job) {
    //             //this is a unique trip
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
        //         } else {
        //             // existing trip
        //             console.log('trip already exists');
        //         }
        //     });
        // }
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
                        order_id : req.body.order_id,
                        asset_status : req.body.asset_status,
                        tow_group : req.body.tow_group,
                        asset_name : req.body.asset_name,
                        vendor_name : req.body.vendor_name,
                        asset_type : req.body.asset_type,
                        asset_start: req.body.asset_start,
                        asset_stop : req.body.asset_stop,
                        start_fuel : req.body.start_fuel,
                        stop_fuel : req.body.stop_fuel,
                        start_lube : req.body.start_lube,
                        stop_lube : req.body.stop_lube,
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

    router.put('/editasset/:asset_id', (req, res, next) => {
        if(validAsset(req.body)) {
            Asset
            .update(req.params.asset_id, req.body).then(asset => {
                res.json(asset);
            });
            } else {
                next(new Error('invalid asset neal'));
            }
    });

//     router.delete('/dashboard/asset/:asset_id', (req, res, next) => {
//         Asset
//         .delete(req.params.asset_id).then(() => {
//             res.send('deleted');
//         });
// });


router.post('/newlog', (req, res, next) => {
    const log = {
        order_id : req.body.order_id,
        asset_id : req.body.asset_id,
        asset_name : req.body.asset_name,
        tow_group : req.body.tow_group,
        location_type : req.body.location_type,
        asset_location : req.body.asset_location,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        fuel_burn : req.body.fuel_burn,
        lube_burn : req.body.lube_burn,
        speed : req.body.speed,
        status : req.body.status,
        direction : req.body.direction,
        eta : req.body.eta,
        miles_made : req.body.miles_made,
        miles_to_go : req.body. miles_to_go,
        notes : req.body.notes,
        log_dttm : new Date(),
        created_by: 'Neal White',
        last_modified_by: 'Neal White',
        created_dttm: new Date(),
        modified_dttm: new Date()
    };

    AssetLog
    .create(log)
    .then(log => {
// redirect
res.json({
    log,
    message: 'log created'
});

    });
});    

router.put('/editlog/:log_id', (req, res) => {
    AssetLog
        .update(req.params.log_id, req.body).then(log => {
            // redirect
            res.json(log);
        });
});

router.delete('/deletelog/:log_id', (req, res) => {
    AssetLog.delete(req.params.log_id).then(
        res.json("log deleted."));
});

router.put('/editdelay/:delay_id', (req, res, next) => {
    const delay = {
        asset_id : req.body.asset_id,
        asset_name : req.body.asset_name,
        order_id : req.body.order_id,
        tow_group : req.body.tow_group,
        delay_type : req.body.delay_type,
        delay_start : req.body.delay_start,
        delay_stop : req.body.delay_stop,
        description : req.body.description
    };        
    
    
            var delay_start_date = new Date(delay.delay_start);
            var delay_stop_date = new Date(delay.delay_stop);
            if(delay_start_date.setHours(0,0,0,0) == delay_stop_date.setHours(0,0,0,0)) {

                Delay.update(req.params.delay_id, delay).then(delay => {
                    // redirect
                    res.json(delay);
                });
            } else {
                next(new Error('ERROR: Start and Stop dates must be on the same day.'));
            }
});

router.delete('/deletedelay/:delay_id', (req, res) => {
    Delay.delete(req.params.delay_id).then(
        res.json("delay deleted."));
});



router.post('/newdelay', (req, res, next) => {
    const delay = {
        asset_id : req.body.asset_id,
        asset_name : req.body.asset_name,
        order_id : req.body.order_id,
        tow_group : req.body.tow_group,
        delay_type : req.body.delay_type,
        delay_start : req.body.delay_start,
        delay_stop : req.body.delay_stop,
        description : req.body.description,
        log_dttm : new Date()
    };
            var delay_start_date = new Date(delay.delay_start);
            var delay_stop_date = new Date(delay.delay_stop);
            if(delay_start_date.setHours(0,0,0,0) == delay_stop_date.setHours(0,0,0,0)) {
                
    Asset
    .getMatchingAssets(delay)
    .then(assets => {
        assets = JSON.parse(JSON.stringify(assets));
        console.log(assets);
        
        var modules = [];
        
        assets.forEach(function(assets) {
            var diffDelay = {
                asset_id : assets.asset_id,
                asset_name: assets.asset_name,
                order_id : req.body.order_id,
                tow_group : req.body.tow_group,
                delay_type : req.body.delay_type,
                delay_start : req.body.delay_start,
                delay_stop : req.body.delay_stop,
                description : req.body.description,
                log_dttm : new Date()
            };
            // console.log(diffLog);
            Delay
            .create(diffDelay)
            .then(diffDelay => {
                modules.push(diffDelay);
                if(modules.length === assets.length) {
                    return modules;
                }
            });
        });
        res.json({
            modules,
            message: 'logs created for tow_group in job'
        });
    });

} else {
    next(new Error('ERROR: Start and Stop dates must be on the same day.'));
}
});        

module.exports = router;