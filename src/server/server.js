const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('../routes/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Especifica el origen permitido
    optionsSuccessStatus: 200 // Para algunos navegadores antiguos
  };
  
app.use(cors(corsOptions));  
app.use('/', routes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
