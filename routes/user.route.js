var express = require('express');
var multer  = require('multer');

var router = express.Router();
var controller = require('../controllers/users.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);
router.get('/search',controller.search);
router.get('/create',controller.get);
router.get('/:id',controller.view);
router.post('/create',upload.single('avatar'),validate.postCreate,controller.postCreate);
module.exports= router;