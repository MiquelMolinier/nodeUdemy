const obj = {
    at1: "at1",
    at2: "at2",
    at3: "at3",
    getNombre(){
        return `${this.at1} ${this.at2} ${this.at3}`
    }
}
const {at2, at3, at1} = obj;
console.log(at1, at2, at3);
function print({at2, at3, at1}){
    console.log(at1, at2, at3);
};
print(obj)
const array = ["e1", "e2", "e3", "e4"]
let [e1, , , e4] = array
console.log(e1,e4)