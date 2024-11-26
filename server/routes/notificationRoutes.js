const expresss = require('express');
const router = expresss.Router();
const notificationController = require('../controllers/notificationController');
const authorization = require('../middleware/authorization');

router.get('/get-notifications', authorization, notificationController.getNotifications);

module.exports = router;