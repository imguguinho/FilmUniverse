const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const { check } = require('express-validator');

// @route   POST api/auth/register
// @desc    Registrar usuario
// @access  Public
router.post(
  '/register',
  [
    check('username', 'El nombre de usuario es requerido').not().isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  authController.register
);

// @route   POST api/auth/login
// @desc    Login de usuario
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña es requerida').exists()
  ],
  authController.login
);

// @route   POST api/auth/google
// @desc    Login con Google
// @access  Public
router.post('/google', authController.googleLogin);

module.exports = router;