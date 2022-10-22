const bodyParser = require('body-parser');
const express = require('express');
const productsRouter = require('./routers/products.router');
const salesRouter = require('./routers/sales.router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter, bodyParser);
app.use('/sales', salesRouter, bodyParser);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;