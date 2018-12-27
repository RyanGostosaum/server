const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const moment = new Date

require('dotenv').config()

mongoose.connect(process.env.DB)

mongoose.connection.on('connected', () => {
    console.log('logado as: ' + moment);
})

mongoose.connection.on('error', (err) => {
	console.log('Erro na conexão as: '+ moment + '\n' + err );
});

mongoose.connection.on('disconnect', () => {
	console.log('Desconectado :( as' + moment);
});