const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils'),
      models = require('./models'),
      customerModel = models.customerModel;


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/customer/customer.html'));
});

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

router.post('/add', (req, res) => {
    const body = req.body;
    utils.add(customerModel, body, {
        name: body.name
    }).then(data => {
        res.send({
            code: 0,
            data: data,
            msg: ''
        });
    }).catch(err => {
        res.send({
            code: -1,
            data: '',
            msg: err
        });
    });
});

router.delete('/delete', (req, res) => {
    const _id = req.body._id;
    utils.delete(customerModel, _id).then(data => {
        res.send({
            code: 0,
            data: data,
            msg: ''
        });
    }).catch(err => {
        res.send({
            code: -1,
            data: '',
            msg: err
        });
    })
});

module.exports = router;