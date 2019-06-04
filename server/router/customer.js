const express = require('express'),
      router = express.Router(),
      utils = require('../utils/dbUtils');

const customerModel = utils.initSchema({
    name: String,
    type: String,
}, 'customer');

router.get('/list', (req, res) => {
    utils.find(customerModel, {}).then(data => {
        res.send({
            code: 0,
            data: {
                rows: data,
                total: data.length
            },
            msg: ''
        });
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;