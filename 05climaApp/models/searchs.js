const axios = require("axios");
const { readdb, savedb } = require("../helpers/saved");

class Search {
    constructor(){
        // leer DB si existe
        this.historial = readdb();
    }
    addhistorial(data) {
        if (this.historial.includes(data.toLowerCase())) return
        this.historial.unshift(data);
        if (this.historial.length > 6)  this.historial.pop()
        const payload = {historial: this.historial}
        savedb(payload);
    }
    get historialmayus(){
        return this.historial.map(hist => {
            const arr = hist.split(' ');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            const str2 = arr.join(' ');
            return str2;
        });
    }
    async weather(lat = '', lng = ''){
        try{
            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER}&units=metric&lang=es`);
            const {weather, main} = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                tmp: main.temp,
            };
        } catch(error){
            console.log('ERROR!');
        }
    }
    async city(place = ''){
        try {
            /* const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                headers: {
                    'limit': 5,
                    'types': 'place%2Cpostcode%2Caddress',
                    'language': 'es',
                    'access_token': 'pk.eyJ1Ijoid2FsdGVyaXNub3RhdmFpbGFibGUiLCJhIjoiY2t6Zzh2em0xM3BvbjJ1bmsxaDdsbm43ciJ9.5lGIRGbVOYVwV_4eyB3iCg'
                }
            });
            const resp = instance.get(); */
            const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=5&types=place%2Cpostcode%2Caddress&language=es&access_token=${process.env.MAPBOX}`)
            return resp.data.features.map(l => ({
                id: l.id,
                name: l.place_name,
                lng: l.center[0],
                lat: l.center[1],
            }));
            
        } catch (error){
            console.log("ERROR!");
            return [];
        }
    }
}

module.exports = Search;