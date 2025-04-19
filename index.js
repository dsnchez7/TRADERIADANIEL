// ✅ Archivo: index.js (backend simplificado sin puppeteer)

const { analizarEntrada } = require('./analizador');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/captura', (req, res) => {
  const { symbol, timeframe } = req.body;

  if (!symbol || !timeframe) {
    return res.status(400).send('Faltan parámetros requeridos');
  }

  try {
    const analisisTexto = analizarEntrada({ symbol, timeframe });

    res.json({
      imagen: null,
      analisis: analisisTexto
    });

  } catch (error) {
    console.error('Error en análisis:', error);
    res.status(500).send('Error al generar análisis');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
