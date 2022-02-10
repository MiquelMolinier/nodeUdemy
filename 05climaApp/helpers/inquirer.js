const inquirer = require('inquirer');
const colors = require('colors/safe');
const inquirerMenu = async () => {
    const menuopt = [
        {
            type: 'list',
            message: 'Seleccionar una opcion',
            name: 'opt',
            choices: [
                {
                    name: `${colors.green('1.')} Buscar ciudad`,
                    value: 1
                },
                {
                    name: `${colors.green('2.')} Historial`,
                    value: 2
                },
                {
                    name: `${colors.green('0.')} Salir`,
                    value: 0
                },
            ],
        }
    ]
    console.clear();
    console.log(colors.green.bold('======================='))
    console.log(' Seleccione una opcion ');
    console.log(colors.green.bold('=======================\n'));
    const {opt} = await inquirer.prompt(menuopt);
    return opt;
}
const inquirerPause = async () => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'ENTER',
            message: `Presione ${colors.green('ENTER')} para continuar`
        }
    ]);
}
const readInput = async (message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Ingrese un valor';
            }
            return true;
        }
    }
    const {desc} = await inquirer.prompt(question);
    return desc
}
const listPlaces = async (places = []) => {
    const choices = places.map((place, i) => {
        return {
            name: `${colors.green((i + 1) + '.')} ${place.name}`,
            value: place.id
        }
    });
    choices.unshift({
        value: '0',
        name: `${colors.green(0 + '.')} Cancelar`
    });
    const opt = [
        {
            type: 'list',
            message: 'Seleccionar lugar',
            name: 'id',
            choices
        }
    ]
    const {id} = await inquirer.prompt(opt);
    return id;
}
const confirm = async (message = '') => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message,
    }
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listTaskToComp = async (tasks = []) => {
    console.clear();
    const choices = tasks.map((task, i) =>{
        return {
            name: `${colors.green((i + 1) + '.')} ${task.desc}`,
            value: task.id,
            checked: Boolean(task.complete)
        }
    });
    const opt = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar tareas',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(opt)
    return ids;
}
module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    listPlaces,
    confirm,
    listTaskToComp
}