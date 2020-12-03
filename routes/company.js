const express = require('express');
const router = express.Router();
var authMiddleware = require('../auth/middleware');
const User = require('../db/user');
const Sticker = require('../db/sticker');
const Company = require('../db/company');
const Job = require('../db/job');
const Asset = require('../db/asset');
const AssetLog = require('../db/assetlog');

router.get('/:company', authMiddleware.ensureLoggedIn, (req, res) => {
  if (req.params.company !== 'canalbarge' && req.params.company !== null) {
    Company.getCompanyUsers(req.params.company).then(user => {
      if (user) {
        delete user.password;
        Job.getJobs().then(jobs => {
            // AssetLog.getLogs().then(logs => {
          jobs = JSON.parse(JSON.stringify(jobs));
          // assets = JSON.parse(JSON.stringify(assets));
          // logs = JSON.parse(JSON.stringify(logs));
          jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
          // logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                  // javascript function to find max log_id value for each asset_name 
                  // in order to only print one result per asset name
                  // const arrayFiltered = [];
                  // logs.forEach(obj => {
                  //     const item = arrayFiltered.find(thisItem => thisItem.asset_name === obj.asset_name);
                  //     if (item) {
                  //         if (item.log_id < obj.log_id) {
                  //             item.log_id = obj.log_id;
                  //         }
                  //         return;
                  //     }
                  //     arrayFiltered.push(obj);
                  // });
      
      
      
          // console.log(arrayFiltered);
          res.render('company', { title: 'Express', 'jobs': jobs, 'user' : user
          // , logs: arrayFiltered });
        // });
        });
          });
      } else {
        resError(res, 404, "No Users");
      }
    });
  } else {
    if (req.params.company == 'canalbarge') {
      Company.getAllUsers().then(user => {
        if (user) {
          delete user.password;
          Job.getJobs().then(jobs => {
            // AssetLog.getLogs().then(logs => {
          jobs = JSON.parse(JSON.stringify(jobs));
          // assets = JSON.parse(JSON.stringify(assets));
          // logs = JSON.parse(JSON.stringify(logs));
          jobs = jobs.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
          // logs = logs.sort((a, b) => parseFloat(b.log_id) - parseFloat(a.log_id));
                  // javascript function to find max log_id value for each asset_name 
                  // in order to only print one result per asset name
                  // const arrayFiltered = [];
                  // logs.forEach(obj => {
                  //     const item = arrayFiltered.find(thisItem => thisItem.asset_name === obj.asset_name);
                  //     if (item) {
                  //         if (item.log_id < obj.log_id) {
                  //             item.log_id = obj.log_id;
                  //         }
                  //         return;
                  //     }
                  //     arrayFiltered.push(obj);
                  // });
      
      
      
          // console.log(arrayFiltered);
          res.render('company', { title: 'Express', 'jobs': jobs, 'user' : user
          // , logs: arrayFiltered });
        // });
        });
          });
        } 
      });
    }
  }});

// router.get('/:id/sticker', (req,res)=>{
//   if (!isNaN(req.params.id)) {
//     Sticker.getByUser(req.params.id).then(stickers => {
//       res.json(stickers);
//     });
//   } else {
//     resError(res, 500, "Invalid ID");
//   }
// })

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
