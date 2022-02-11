require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Servir contenido estático
// Cargar contenido


app.use(express.static('templated-roadtrip', {extensions: ['html']}));

app.get('/', (req, res) => {
    res.render('home.hbs',{
        name: 'Miquel Molinier',
        title: 'Curso de node'
    });
});

app.get('/generic', (req, res) => {
    res.render('generic.hbs', {
        name: 'Miquel Molinier',
        title: 'Curso de node'
    });
});

app.get('/elements', (req, res) => {
    res.render('elements.hbs',{
        name: 'Miquel Molinier',
        title: 'Curso de node'
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});