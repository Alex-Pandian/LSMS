const express = require('express');
const { adminLogin, addUser, editUser, deleteUser, getUsers } = require('../controllers/adminController');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/get', getUsers)
router.post('/add', addUser);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;