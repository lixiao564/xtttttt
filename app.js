const express = require('express');
const express_hbs = require('express-handlebars');
const path = require('path');
const app = express();

const home = require('./server/router/home');
const task = require('./server/router/task');
const user = require('./server/router/user');

// 设置静态文件目录
app.use('/views', express.static(path.join(__dirname, '/views')));
app.use('/utils', express.static(path.join(__dirname, '/utils')));

// 设置模板引擎类型
app.engine('hbs', express_hbs());

// 使用的模板引擎扩展名（省略时）
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

app.use('/', home);
app.use('/task', task);
app.use('/user', user);

app.listen(3000);