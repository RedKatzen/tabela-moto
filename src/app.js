import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Temporary in-memory data store
let dataStore = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/get-data', (req, res) => {
    res.json(dataStore);
    res.json({ message: 'Data recebida'});
});

app.post('/submit-form', (req, res) => {
    //console.log(req.body);
    const formData = req.body;
    dataStore.push({
        ltsGastos: parseFloat(formData.ltsGastos),
        kmTotal: parseFloat(formData.kmTotal)
    });
    res.json({ message: 'Data recebida'});
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));