const utils = require('../utils/dbUtils');

const userModel = utils.initSchema({
    email: String,
    password: String,
    name: String,
    role: String,
    tel: String,
    dpt: String,
}, 'user');

const customerModel = utils.initSchema({
    uid: String,
    name: String,
    customerType: String,
    industryType: String,
    area: String,
    validDate: String,
    basicInfo: String
}, 'customer');

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

const models = {
    userModel,
    customerModel,
    projectModel
};

module.exports = models;