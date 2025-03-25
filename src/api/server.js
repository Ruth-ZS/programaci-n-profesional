const express = require('express');
const cors = require('cors');
const db = require('./models/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Validación simple de email
const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Ruta para registrar paquetes
app.post('/api/paquetes', (req, res) => {
  const { descripcion, depto, correo } = req.body;
  
  console.log('Datos recibidos:', { descripcion, depto, correo });

  // Validación de campos
  if (!descripcion || !depto || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (!validarEmail(correo)) {
    return res.status(400).json({ error: 'Formato de correo inválido' });
  }

  db.run(
    'INSERT INTO paquetes (descripcion, depto, correo) VALUES (?, ?, ?)',
    [descripcion, depto, correo],
    function(err) {
      if (err) {
        console.error('Error en la base de datos:', err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log(`Paquete guardado - ID: ${this.lastID} | Correo: ${correo}`);
      res.status(201).json({ 
        success: true, 
        id: this.lastID,
        correo: correo 
      });
    }
  );
});

app.listen(3001, () => console.log('Backend en http://localhost:3001'));