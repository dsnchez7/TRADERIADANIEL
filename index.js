const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/captura', async (req, res) => {
  const { symbol, timeframe } = req.body;
  const url = `https://www.tradingview.com/chart/?symbol=${symbol.toUpperCase()}&interval=${timeframe}`;

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(5000);

    const imagePath = `/tmp/${symbol}_${timeframe}.png`;
    await page.screenshot({ path: imagePath });
    await browser.close();

    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al capturar gráfico');
  }
});
app.get('/', (req, res) => {
  res.send('Servidor activo. Usa POST en /api/captura para obtener el gráfico.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
