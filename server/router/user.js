const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils');

const userModel = utils.initSchema({
    num: String,
    email: String,
    password: String,
    name: String,
    role: String,
    age: Number,
    cid: String,
    date: String,
    area: String,
    tel: String,
    dpt: String,
    notes: String,
}, 'user');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/user/user.html'));
});

router.get('/list', (req, res) => {
    utils.find(userModel, {}).then(data => {
        res.send({
            code: 0,
            data: {
                rows: data,
                total: data.length
            },
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

router.post('/add', (req, res) => {
    const body = req.body;
    utils.add(userModel, body, {
        num: body.num
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

module.exports = router;