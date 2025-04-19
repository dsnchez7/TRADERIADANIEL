// ✅ Archivo: index.js (servidor principal con análisis IA y captura gráfica + imagen servida correctamente)

const { analizarEntrada } = require('./analizador');
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/captura', async (req, res) => {
  const { symbol, timeframe } = req.body;

  if (!symbol || !timeframe) {
    return res.status(400).send('Faltan parámetros requeridos');
  }

  const url = `https://www.tradingview.com/chart/?symbol=${symbol.toUpperCase()}&interval=${timeframe}`;
  const imageName = `${symbol}_${timeframe}.png`;
  const imagePath = path.join(__dirname, 'public', imageName);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: imagePath });
    await browser.close();

    const analisisTexto = analizarEntrada({ symbol, timeframe });
    const imageUrl = `/${imageName}`;

    res.json({
      imagen: imageUrl,
      analisis: analisisTexto
    });

  } catch (error) {
    console.error('Error en captura:', error);
    res.status(500).send('Error al capturar gráfico');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});



