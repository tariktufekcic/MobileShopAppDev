const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const userRouter = require('../routers/userRouter');
const AuthRouter = require('./AuthRouter');
const AdminRouter = require('./AdminRouter');
const categoryRouter = require('./categoryRouter')
const offerRouter = require('./offerRouter');


router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/auth', AuthRouter);
router.use('/admin', AdminRouter);
router.use('/cat', categoryRouter);
router.use('/of', offerRouter);

module.exports = router;