const express = require('express');
      express_hbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      app = express();

const home = require('./server/router/home'),
      project = require('./server/router/project'),
      user = require('./server/router/user'),
      customer = require('./server/router/customer');

app.use(bodyParser.json());
app.use(cookieParser());
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
app.use('/project', project);
app.use('/user', user);
app.use('/customer', customer);

app.listen(3000);

// 注释
// DFDFSDFSF
// xxxxx
// 注释2
