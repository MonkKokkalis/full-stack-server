const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res, next) => {
    res.set('FileName', "roll safe.jpg")
    res.download(path.join(__dirname, "../../files/" + 'roll safe.jpg'), 'roll safe.jpg')
})

module.exports = router;
