const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils'),
      models = require('./models'),
      customerModel = models.customerModel;


router.get('/list', (req, res) => {
    const uid = req.cookies.userId;
    utils.find(customerModel, {uid: uid}).then(data => {
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
    const uid = req.cookies.userId;
    const body = req.body;
    body.uid = uid;
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