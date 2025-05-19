// Declaracion de constantes Globales xd
const students = [];
const modify_ = document.getElementById("avg_");
const tableBody = document.querySelector("#studentsTable tbody");

document.getElementById("studentForm").addEventListener("submit", function (e){
e.preventDefault();
    
    // Obtencion de datos ingresados por el usuario
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value.trim();

    if(!name || !lastName || isNaN(grade) || grade<1 || grade>7 || !date){
        alert("Error al ingresar Datos");
        return
    }

    // Creamos una var const con los datos ingresados por la persona
    const student = {name, lastName, grade, date};

    console.log(students)
    if (students.indexOf(student) > -1){
        console.log("xdxddd", students.indexOf(student))
    }

    // Se los agregamos al array principal
    students.push(student);

    // LLamamos a la funcion de contenido dinamico
    addStudentToTable(student);

    // Calculamos el promedio y mostramos en pantalla
    calcularPromedio();

    // Se limpia el formulario indexado xd
    this.reset();


});

// Funcion encargada de dar contenido dinamico dependiendo de la cantidad de alumnos
function addStudentToTable(student){

    // Se crea la variable almacenando el documento seleccionado
    const row = document.createElement("tr");
    
    let index_ = students.length;
    // Le agregamos contenido
    row.innerHTML = `
      <td>${student.name}</td>
       <td>${student.lastName}</td>
       <td>${student.grade}</td>
       <td>${student.date}</td>`;
    
    // Se le aplican los cambios y se agregan al html
    tableBody.appendChild(row);
}

// Funcion encargada de sacar el promedio de los students xd
function calcularPromedio(){
    let CANT_ST = students.length;

    if (!students){
        modify_.innerHTML = `Promedio de Calificaciones: ${total/CANT_ST}`;
        return
    }

    // Se declara la suma de todos los promedios en 0
    let total = 0;
    
    // Por cada estudiante se va sumando hasta dividirlo por la cantidad
    for (elem of students){
        total = total + elem.grade;
    }
    modify_.innerHTML = `Promedio de Calificaciones: ${total/CANT_ST}`;
}