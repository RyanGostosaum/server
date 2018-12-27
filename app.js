const app = require('./config/express')();

require('./config/db');
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
  console.log('Dotenv Load');
  
}

app.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta ${app.get('port')}...`);
});
