const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const { checkAuthenticated } = require('./auth');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.post('/api/calculadora', checkAuthenticated, (req, res) => {
    const { valor1, valor2, operacao } = req.body;

    let resultado;
    switch (operacao) {
        case 'somar':
            resultado = eval(`${valor1} + ${valor2}`);
            break;
        case 'subtrair':
            resultado = eval(`${valor1} - ${valor2}`); 
            break;
        case 'multiplicar':
            resultado = eval(`${valor1} * ${valor2}`);
            break;
        case 'dividir':
            if (valor2 === "0") {
                return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
            }
            resultado = eval(`${valor1} / ${valor2}`);
            break;
        default:
            return res.status(400).json({ error: 'Operação inválida.' });
    }

    res.json({ resultado });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    
    const user = { username: 'user', password: 'password' }; 

    if (username === user.username && password === user.password) {
        const token = auth.generateToken(user);
        return res.json({ token });
    }

    res.status(401).json({ error: 'Credenciais inválidas.' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});