console.log("Inicio")
console.time('inicio');
setTimeout(() => {
    console.log("Timeout 1")
}, 3000)
setTimeout(() => {
    console.log("Timeout 2")
}, 0)
setTimeout(() => {
    console.log("Timeout 3")
}, 0)
console.log("Fin")
const startPoint = new Date().getTime();
while (new Date().getTime() - startPoint <= 3000 ) {
    // Esperando...
    // Haciendo fetch de base de datos...
    // Robando datos de facebook...
}
console.timeEnd('inicio');