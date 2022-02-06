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

const getEmployer = (id) => {
    return new Promise((resolve, reject) => {
        const employer = employers.find((e)=> e.id===id)?.name;
        (employer) 
            ? resolve(employer)
            : reject(`No existe empleado con id ${id}`);
    });
}
const getSalary = (id) => {
    return new Promise((resolve, reject) => {
        const salary = salaries.find((e)=> e.id===id)?.salary;
        (salary)
            ? resolve(salary)
            : reject(`No hay salario para el id ${id}`)
    }) 
}
const id = 10;

/* getEmployer(id)
    .then(employer => console.log(employer))
    .catch(err => console.log(err));
getSalary(id)
    .then(salary => console.log(salary))
    .catch(err => console.log(err)); */
/* getEmployer(id)
    .then(employer => {
        getSalary(id)
            .then(salary => console.log(`El empleado ${employer} tiene un salario de ${salary}`))
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err)) */
{
let name;
getEmployer(id)
    .then(employer => {
        name = employer
        return getSalary(id)
    })
    .then(salary => console.log(`El empleado ${name} tiene un salario de ${salary}`))
    .catch(err => console.log(err))
}
