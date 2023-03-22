const mongoose = require('mongoose');

const connect = async () => {
    const user = 'dssdatabase';
    const password = 'admin123';

    try {
        await mongoose.connect(
            `mongodb+srv://${user}:${password}@cluster0.uwbbbmz.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('Conexão ao banco de dados realizada com sucesso!');
    } catch (error) {
        console.log(`Ocorreu um erro ao se conectar com o banco de dados: ${error}`);
    }
};

module.exports = connect;
