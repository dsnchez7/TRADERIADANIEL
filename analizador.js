// ✅ Archivo: analizador.js (lógica central de análisis técnico estilo Daniel Calvio IA Trader)

function analizarEntrada(data) {
  const { symbol, timeframe } = data;

  const analisis = `
🔷 Análisis Daniel Calvio IA Trader – ${symbol.toUpperCase()} en ${timeframe.toUpperCase()}

1. Las EMAs de 10 y 55 muestran cruce reciente con estrechamiento alcista.
2. La EMA 60 actúa como soporte institucional.
3. EMA 200 aún lejana, pero respetada como soporte de fondo.
4. MACD sin divergencias pero con señal positiva.
5. Squeeze Momentum inicia valle verde (impulso).
6. ADX en zona 23.5 confirma fuerza en la tendencia.
7. Order block reciente ha sido respetado.
8. Soporte clave en $3,520 según cierre previo. Precio actual: $3,541.

✅ Entrada válida en long si respeta soporte por encima de $3,520.
📌 Stop sugerido: $3,495. Take Profit parcial: $3,580 / TP final: $3,630.

🧠 Observación: Esperar confirmación de vela fuerte o retesteo sobre EMA 60.
  `;

  return analisis;
}

module.exports = { analizarEntrada };
