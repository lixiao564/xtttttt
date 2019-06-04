const mongoose = require('./db'),
      Schema = mongoose.Schema;

const dbUtil = function() {};

// 初始化集合模型
dbUtil.prototype.initSchema = function (dataItem, name) {
    return mongoose.model(name, new Schema(dataItem, { collection: name }));
}

// 增加
dbUtil.prototype.add = function (model, item, condition) {
    if (arguments.length == 2) {
        // 直接增加
        return new Promise((resolve, reject) => {
            model.create(item, (err, res) => {
                if (err) {
                    reject('add err');
                } else {
                    resolve(res);
                }
            });
        });
    } else if (arguments.length == 3) {
        // 先判断这个唯一标识是否存在
        return new Promise((resolve, reject) => {
            model.find(condition, (err, res) => {
                if (res.length == 0) {
                    model.create(item, (err2, res2) => {
                        if (err) {
                            reject('add unique err');
                        } else {
                            resolve(res2);
                        }
                    });
                } else {
                    reject('the unique data has existed');
                }
            })
        });
    }
}

// 通过 _id 查唯一的数据
dbUtil.prototype.findById = function (model, _id) {
    return new Promise((resolve, reject) => {
        model.findById(_id, (err, res) => {
            if (err) {
                reject('findById err');
            } else {
                resolve(res);
            }
        });
    });
}

// 通过条件查询，返回数组
dbUtil.prototype.find = function (model, condition) {
    return new Promise((resolve, reject) => {
        model.find(condition, (err, res) => {
            if (err) {
                reject('find err');
            } else {
                resolve(res);
            }
        });
    });
}

// 删除，默认删除所有匹配的
dbUtil.prototype.delete = function (model, condition) {
    return new Promise((resolve, reject) => {
        model.deleteMany(condition, (err, res) => {
            if (err) {
                reject('remove err');
            } else {
                resolve(res);
            }
        });
    });
}

// 通过 _id 更新一条记录，将 new 属性设置为 true，返回更新后的数据
dbUtil.prototype.updateById = function (model, _id, updataData) {
    return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(_id, updataData, { new: true }, (err, res) => {
            if (err) {
                reject('updateById err');
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = new dbUtil();