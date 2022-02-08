const {crearArchivo} = require('./helpers/multiplicar.js')
const argv_ = require('./config/yargs.js')
/* const [,,arg3, arg4] = process.argv
const [, base] = arg3.split('=')
const[, limite] = arg4.split('=') */
crearArchivo(argv_.base, argv_.listar, argv_.hasta)
    .then(nombreArchivo => console.log(nombreArchivo, "creado"))
    .catch(err => console.log(err));
