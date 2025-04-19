// ✅ index.js adaptado para Vercel + Puppeteer real
const { analizarEntrada } = require('./analizador');
const chromium = require('chrome-aws-lambda');
const express = require('express');
const cors = require('cors');
const path = require('path');

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

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    const url = `https://www.tradingview.com/chart/?symbol=${symbol.toUpperCase()}&interval=${timeframe}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(4000);

    const screenshotBuffer = await page.screenshot();
    await browser.close();

    const analisisTexto = analizarEntrada({ symbol, timeframe });

    res.json({
      imagen: `data:image/png;base64,${screenshotBuffer.toString('base64')}`,
      analisis: analisisTexto
    });

  } catch (error) {
    console.error('❌ Error al analizar:', error);
    res.status(500).send('Error al obtener análisis');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en puerto ${port}`);
});


