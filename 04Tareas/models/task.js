const { v4: uuidv4 } = require('uuid');
class Task {
    constructor(desc) {
        this.desc = desc;
        this.id = uuidv4();
        this.complete = null;
    }
}

module.exports = Task;