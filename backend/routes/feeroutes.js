const express = require('express')
const feesHandler = require('../controller/FeesHandler')
const router = express.Router()



router.route('/markpaid/:id').put(feesHandler.markpaid)
router.route('/markunpaid/:id').put(feesHandler.Unpaid)




module.exports = router;