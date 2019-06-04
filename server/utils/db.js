const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('连接成功！');
});

module.exports = mongoose;