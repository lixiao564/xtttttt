const express = require('express'),
      path = require('path'),
      router = express.Router();
router.get('/', (req, res) => {
    const uid = req.cookies.userId;
    if (uid) {
        res.sendFile(path.join(__dirname, '../../views/home/home.html'));
    } else {
        res.sendFile(path.join(__dirname, '../../views/login/login.html'));
    }
});

module.exports = router;