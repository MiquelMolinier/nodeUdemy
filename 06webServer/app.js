const http = require('http');
const server = http.createServer((req, res) => {
    /* res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead(200, {'Content-type': 'application/csv'});

    res.write('id, nombre\n');
    res.write('1, Morax\n');
    res.write('2, Ganyu\n');
    res.write('3, Yanfei\n');
    res.write('4, Barbara\n');
    res.write('5, Mona\n'); */
    res.write('Hola mundo');
    res.end();
});
server.listen(8080)
console.log("Escuchando el puerto", 8080)