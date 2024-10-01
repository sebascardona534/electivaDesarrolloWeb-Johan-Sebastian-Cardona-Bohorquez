const path = require('path');
const UserService = require('../services/userService');


class CatalogoController {
  // Renderizar la página de registro
  getCatalogoPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/catalogo.html'));
  };

}

module.exports = new CatalogoController();