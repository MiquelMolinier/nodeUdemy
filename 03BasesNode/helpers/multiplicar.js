const fs = require('fs')
const colors = require('colors/safe')
const crearArchivo = async (base = 3, listar = false, hasta = 10) => {
    try {
        let out = '';
        let printout = ''
        for (let i = 1; i <= hasta; i++){
            printout += `${base} ${colors.red("x")} ${colors.gray(i)} ${colors.red("=")} ${base*i}\n` 
            out += `${base} x ${i} = ${base*i}\n`
        }
        if (listar){
            console.log(colors.green('================='));
            console.log(`Table del`, colors.blue(base));
            console.log(colors.green('================='));
            console.log(printout);
        }
        fs.writeFileSync(`./tablas/tabla ${base}.txt`, out);
        return colors.rainbow(`tabla del ${base}`);
    } catch (err){
        throw err;
    }
    
}
module.exports = {
    crearArchivo,
}