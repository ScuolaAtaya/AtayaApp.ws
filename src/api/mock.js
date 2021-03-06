import {Router} from 'express'

const router = new Router();
const mock = require('../controllers/mock')

router.get('/book', mock.getBook)
router.get('/book/update/:result?', mock.isUpdate)

module.exports = router