const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils'),
      models = require('./models'),
      userModel = models.userModel,
      customerModel = models.customerModel,
      projectModel = models.projectModel;


router.get('/', (req, res) => {
    const query = req.query;
    // 第一个参数表示模板的文件，默认从views文件夹里面去找
    res.render('project/add', {
        layout: null,
        query: query
    });
});

router.get('/list', (req, res) => {
    utils.find(projectModel, {}).then(data => {
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

router.get('/getMsg', (req, res) => {
    const _id = req.query._id;
    const result = {};
    utils.findById(customerModel, _id).then(data => {
        result.customerName = data.name;
        result.customerType = data.customerType;
        return data.uid;
    }).then(uid => {
        utils.findById(userModel, uid).then(data => {
            result.userName = data.name;
            result.userTel = data.tel;
            res.send({
                code: 0,
                data: result,
                msg: ''
            });
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
    body.restStep = '2';
    utils.add(projectModel, body, {
        projectName: body.projectName
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