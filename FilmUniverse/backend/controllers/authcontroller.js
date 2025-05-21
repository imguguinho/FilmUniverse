const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validar si el usuario ya existe
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    user = new User({ username, email, password });
    await user.save();

    // Generar token
    const token = user.generateAuthToken();

    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = user.generateAuthToken();

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login con Google
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { email, name, picture } = ticket.getPayload();
    
    let user = await User.findOne({ email });
    
    if (!user) {
      // Crear nuevo usuario si no existe
      user = new User({
        username: name.replace(/\s+/g, '').toLowerCase(),
        email,
        password: Math.random().toString(36).slice(-8),
        avatar: picture
      });
      await user.save();
    }
    
    const token = user.generateAuthToken();
    
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};