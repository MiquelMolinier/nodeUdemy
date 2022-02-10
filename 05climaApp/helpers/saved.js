const fs = require('fs');
const dir =  './db/data.json';
const savedb = (data) => {
    fs.writeFileSync(dir, JSON.stringify(data));
}
const readdb = () => {
    if (!fs.existsSync(dir)){
        return [];
    }
    const info = fs.readFileSync(dir, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data.historial;
}
module.exports = {
    savedb,
    readdb
}