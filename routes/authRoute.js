const express = require('express');
const router = express.Router();
const {createUser, login, getAllUsers, getUser, deleteUser, updateUser} = require('../controllers/userController');

router.post('/createUser', createUser);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUser);
router.get('/deleteUser/:id', deleteUser);
router.post('/updateUser/:id', updateUser);


module.exports = router;