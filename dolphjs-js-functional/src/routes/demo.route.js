const { Router } = require('@dolph/core');
const { sendMsg } = require('../controllers/demo.controller');

const router = Router();

const path = '/api/v1';

router.get(`${path}`, sendMsg);

module.exports = router;
