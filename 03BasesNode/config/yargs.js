const argv_ = require('yargs')
                .options({
                    'b': {
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                        describe: 'Es la base de la tabla de multiplicar'
                    },
                    'l': {
                        alias: "listar",
                        type: 'boolean',
                        demandOption: false,
                        default: false,
                        describe: "Muestra la tabla en consola"
                    },
                    'h': {
                        alias: "hasta",
                        type: 'number',
                        demandOption: false,
                        describe: 'Define la extension de la tabla de multiplicar',
                        default: 10
                    }
                })
                .check((argv, options) => {
                    if (isNaN(argv.b)){
                        throw "La base debe ser un numero entero"
                    }
                    return true;
                })
                .argv;
module.exports = argv_;