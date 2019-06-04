const express = require('express');
      express_hbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      path = require('path'),
      app = express();

const home = require('./server/router/home'),
      task = require('./server/router/task'),
      user = require('./server/router/user'),
      customer = require('./server/router/customer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
app.use('/customer', customer);

app.listen(3000);