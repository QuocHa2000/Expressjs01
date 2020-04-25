var express = require('express');
var router = express.Router();
var controller = require('../controllers/users.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/search',controller.search);
router.get('/create',controller.get);
router.get('/:id',controller.view);
router.post('/create',validate.postCreate,controller.postCreate);
module.exports= router;