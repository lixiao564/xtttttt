const express = require('express'),
      path = require('path'),
      router = express.Router(),
      utils = require('../utils/dbUtils');

const projectModel = utils.initSchema({
    projectName: String,
    type: String,
    level: String,
    expectDate: String,
    describe: String,
    files: String,
    dptManagerName: String,
    dptManagerTel: String,
    dptHeadName: String,
    dptHeadTel: String,
    restStep: String
}, 'project');

router.get('/', (req, res) => {
    // 第一个参数表示模板的文件，默认从views文件夹里面去找
    res.render('project/add', {
        layout: null,
        userName: 'li xiao'
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
        console.log(err);
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