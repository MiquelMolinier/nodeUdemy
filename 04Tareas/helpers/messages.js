const colors = require('colors/safe');
const { realpath } = require('fs');
const showMenu = () => {
    return new Promise(resolve => {
        console.clear()
        console.log(colors.green.bold('======================='))
        console.log(colors.green.bold(' Seleccione una opcion '));
        console.log(colors.green.bold('======================='));
        console.log(`${colors.green('1.')} Crear una tarea`);
        console.log(`${colors.green('2.')} Listar tareas`);
        console.log(`${colors.green('3.')} Listar tareas completadas`);
        console.log(`${colors.green('4.')} Listar tareas pendientes`);
        console.log(`${colors.green('5.')} Completar tareas`);
        console.log(`${colors.green('6.')} Borrar tareas`);
        console.log(`${colors.green('0.')} Salir\n`);
        const readline = require('readline').createInterface({
            input: process.stdin, // Esperar entrada
            output: process.stdout // Mostrar resultado
        });
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close(); 
            resolve(opt);
        });
    })
}
const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${colors.green('ENTER')} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })
    
}
module.exports = {
    showMenu,
    pause
}