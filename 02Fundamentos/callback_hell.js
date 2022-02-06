const employers = [
    {
        id:1,
        name: "Karen"
    },
    {
        id:2,
        name: "Michael"
    },
    {
        id:3,
        name: "Trevor"
    }
]
const salaries = [
    {
        id:1,
        salary: 1000
    },
    {
        id:2,
        salary: 2000
    }
]
const getEmployer = (id, callback) => {
    const employer = employers.find((e)=> e.id===id)?.name
    if (employer) {
        callback(null, employer);
    }
    else {
       callback(`No existe empleado con id ${id}`);
    }
}
const getSalary = (id, callback) => {
    const salary = salaries.find((e) => e.id===id)?.salary;
    if (salary) {
        callback(null, salary)
    }
    else{
        callback(`No existe salario para el id ${id}`);
    } 
}
const id = 4
getEmployer(id, (err, empleado) =>{
    if (err){
        console.log("ERROR!")
        return console.log(err)
    }
    getSalary(id, (err, salary) => {
        if(err){
            console.log("ERROR!")
            return console.log(err)
        }
        console.log(`El empleado ${empleado} tiene un salario de ${salary}`)
    })
    
})
