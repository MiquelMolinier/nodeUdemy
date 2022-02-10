require('dotenv').config();
const { readInput, inquirerMenu, inquirerPause, listPlaces } = require("./helpers/inquirer");
const Search = require("./models/searchs");
const colors = require("colors/safe");


const main = async() => {
    let opt = '';
    let searchs = new Search();
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje para ingresar ciudad
                const lugar = await readInput("Ingrese ciudad:");
                // Buscar los lugares
                const lugares = await searchs.city(lugar);
                // Seleccionar los lugares
                const id = await listPlaces(lugares);
                if (id === '0') continue;
                const lugarsel = lugares.find(l => l.id === id);
                // Guardar en historial
                searchs.addhistorial(lugarsel.name)
                // Obtener clima
                const temp = await searchs.weather(lugarsel.lat, lugarsel.lng)
                // Mostrar resultados
                console.clear();
                console.log(colors.green('\nInformación de la ciudad\n'));
                console.log('Ciudad:', lugarsel.name);
                console.log('Lat:', lugarsel.lat);
                console.log('Lng:', lugarsel.lng);
                console.log('Temperatura:', temp.tmp);
                console.log('Mínima:', temp.min);
                console.log('Máxima:', temp.max);
                console.log('Cómo está el clima:', temp.desc);
                break;
            case 2:
                if (searchs.historial.length !== 0){
                    searchs.historialmayus.forEach((place,i) => {
                        console.log(`${colors.green((i + 1) + '.')} ${place}`)
                    });
                }
                    
            break;
        }
        if (opt !== 0) await inquirerPause();
    }while(opt !== 0);
}
main()
