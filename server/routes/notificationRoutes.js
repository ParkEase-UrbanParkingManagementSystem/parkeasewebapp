const expresss = require('express');
const router = expresss.Router();
const notificationController = require('../controllers/notificationController');
const authorization = require('../middleware/authorization');

router.get('/get-notifications', authorization, notificationController.getNotifications);
router.post('/mark-read', authorization, notificationController.markRead);
router.post('/mark-read-all', authorization, notificationController.markReadAll);

module.exports = router;