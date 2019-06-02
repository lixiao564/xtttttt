const express = require('express'),
      path = require('path'),
      router = express.Router();
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/home/home.html'));
});

module.exports = router;