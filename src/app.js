const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;

promClient.collectDefaultMetrics();

app.get('/', (req, res) => {
  res.send('Hello, NodeOpsX!');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});
