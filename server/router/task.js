const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    // 第一个参数表示模板的文件，默认从views文件夹里面去找
    res.render('task/task', {
        layout: null,
        name: 'li xiao'
    });
});

module.exports = router;