const Task = require("./task");
const colors = require('colors/safe')
class Tasks {
    constructor() {
        this._list = {};
    }
    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });
        return list;
    }
    createTask(desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }
    loadTasks(tasksdb = []){
        tasksdb.forEach(e => {
            this._list[e.id] = e
        });
    }
    listTasks() {
        this.listArr.forEach((e, i) => {
            const pend = (e.complete)
                            ? colors.green(e.complete)
                            : colors.red('Pendiente')
            console.log(`${colors.green((i+1)+'.')}`,e.desc,pend)
        });
    }
    listTasksbool(complete = false){
        let idx = 0;
        this.listArr.forEach((e) => {
            const pend = (e.complete)
                            ? colors.green(e.complete)
                            : colors.red('Pendiente')
            if (complete === Boolean(e.complete)){
                console.log(`${colors.green((idx+1)+'.')}`,e.desc,pend)
                idx += 1
            }    
        });
    }
    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }
    check(ids = []){
        this.listArr.forEach(task => {
            if (!ids.includes(task.id)){
                this._list[task.id].complete = null;
            }
        });
        ids.forEach(id => {
            let task = this._list[id]
            if(!task.complete)
                task.complete = new Date().toISOString();
        });
    }
}
module.exports = Tasks;