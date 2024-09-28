const path = require('path');

exports.getLoginPage = (req, res) => {
  console.log("llego controller")
  res.sendFile(path.join(__dirname, '../views/login.html'));
};
