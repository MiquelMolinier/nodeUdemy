const colors = require('colors/safe');
const { inquirerMenu, inquirerPause, readInput, listTaskToDel, confirm, listTaskToComp} = require('./helpers/inquirer');
const { showMenu, pause } = require('./helpers/messages');
const { savedb, readdb } = require('./helpers/save');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const tasksdb = readdb();
    if (tasksdb) {
        tasks.loadTasks(tasksdb);
    }
    do {
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                const desc = await readInput('Descripción:');
                console.log(desc);
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listTasksbool(true);
                break;
            case '4':
                tasks.listTasksbool(false);
                break;
            case '5':
                const ids = await listTaskToComp(tasks.listArr);
                tasks.check(ids);
                console.log(ids)
                break;
            case '6':
                const id = await listTaskToDel(tasks.listArr);
                if (id !== '0'){
                    const ok = await confirm('¿Esta seguro? Escribe')
                    if (ok)
                        tasks.deleteTask(id);
                }
                break;
        }
        savedb(tasks.listArr);
        await inquirerPause();

    } while(opt !== '0')
}
main()