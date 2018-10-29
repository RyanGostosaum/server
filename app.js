const app = require('./config/express')();

require('./config/db');

app.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta ${app.get('port')}...`);
});
