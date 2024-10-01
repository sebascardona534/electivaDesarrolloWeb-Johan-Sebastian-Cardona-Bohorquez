const path = require('path');
const UserService = require('../services/userService');


class LoginController {
  // Renderizar la página de registro
  getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  };

  // Manejar el login de usuarios
  async login(req, res) {
      try {
          const userData = req.body;
          //console.log("datos del body" + userData)
          const user = await UserService.loginUser(userData);
          res.status(201).json(user);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }
}

module.exports = new LoginController();