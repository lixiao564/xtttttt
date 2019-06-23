const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils'),
      models = require('./models'),
      userModel = models.userModel;

utils.find(userModel, {
    tel: 'admin'
}).then(data => {
    if (data.length == 0) {
        utils.add(userModel, {
            tel: 'admin',
            password: 'admin'
        })
    }
})

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
    body.password = '123456';
    utils.add(userModel, body, {
        tel: body.tel
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

router.post('/check', (req, res) => {
    const body = req.body;
    utils.find(userModel, body).then(data => {
        if (data.length == 1) {
            res.cookie('userId', data[0]._id);
        }
        res.send({
            code: 0,
            data: data[0]._id,
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
    utils.delete(userModel, _id).then(data => {
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