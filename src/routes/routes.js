const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const catalogoController = require('../controllers/catalogoController');

// Ruta para la página de inicio
router.get('/register', registerController.getRegisterPage);
router.get('/', loginController.getLoginPage);
router.get('/catalogo', catalogoController.getCatalogoPage);
router.post('/register', registerController.register);
router.post('/login', loginController.login);
// router.post('/catalogo', catalogoController.catalogo);


module.exports = router;