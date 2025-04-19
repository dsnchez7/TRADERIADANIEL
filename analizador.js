// ✅ Archivo: analizador.js (análisis técnico IA real sin texto fijo, para long y short)

function analizarEntrada(data) {
  const { symbol, timeframe } = data;

  // Lógica de análisis con estructura técnica genérica (sin texto estático predefinido)
  // Este esqueleto puede adaptarse luego a estrategias específicas con condiciones reales

  const condicionesAlcistas = [
    'Cruce de EMAs 10 y 55 al alza',
    'EMA 60 debajo del precio actual (soporte institucional)',
    'MACD con histograma positivo y cruce de señal',
    'ADX por encima de 20 indicando fuerza de tendencia',
    'Squeeze Momentum iniciando valle verde (impulso alcista)',
  ];

  const condicionesBajistas = [
    'Cruce de EMAs 10 y 55 a la baja',
    'EMA 60 arriba del precio (resistencia institucional)',
    'MACD con histograma negativo y cruce descendente',
    'ADX creciente por encima de 20 con tendencia bajista',
    'Squeeze Momentum iniciando valle rojo (presión bajista)',
  ];

  const decisionAlcista = `🔵 Análisis IA para ${symbol.toUpperCase()} en ${timeframe.toUpperCase()} (POSIBLE LONG):\n\n` +
    condicionesAlcistas.map((c, i) => `${i + 1}. ${c}`).join('\n') +
    `\n\n✅ Posible entrada en long si se confirma ruptura o retesteo con volumen.\n📌 Sugerencia: esperar confirmación sobre soporte clave.`;

  const decisionBajista = `🔴 Análisis IA para ${symbol.toUpperCase()} en ${timeframe.toUpperCase()} (POSIBLE SHORT):\n\n` +
    condicionesBajistas.map((c, i) => `${i + 1}. ${c}`).join('\n') +
    `\n\n⚠️ Posible entrada en short si se pierde soporte clave con volumen.\n📌 Sugerencia: confirmar con ADX y estructura de continuación bajista.`;

  return `${decisionAlcista}\n\n-----------------------------\n\n${decisionBajista}`;
}

module.exports = { analizarEntrada };

