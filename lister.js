const students=[]
const tableBody=document.querySelector("#studentsTable tbody")
const avarageDiv=document.getElementById("avarage");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();
    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const fecha=document.getElementById("fecha").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastName || !fecha || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar Datos")
        return
    }

    const student={name,lastName,fecha,grade};

    students.push(student);
    //console.log(students);
    addStudentToTable(student)
    promedio()
    this.reset()
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.fecha}</td>
        <td>${student.grade}</td>
        <td> <button class="delete-btn" ${student.actions}>Eliminar</button>
        <button class="update-action" ${student.actions}">Modificar</button>
        </td>
        `;
        row.querySelector(".delete-btn").addEventListener("click",function(){
            deleteEstudiante(student,row);
        });
        row.querySelector(".update-action").addEventListener("click", function(){
            modificar(student);
        });
    tableBody.appendChild(row);
}

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index>-1){
        students.splice(index,1);
        promedio();
        row.remove();
    }
}

function promedio(){
    if(students.length===0){
        avarageDiv.textContent="Promedio General del Curso: N/A"
        return  
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0)
    const prom=total/students.length;
    avarageDiv.textContent="Promedio General del Curso: "+prom.toFixed(2);
}

function modificarTabla(index) {

    // Obtener nuevos datos del formulario
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const fecha = document.getElementById("fecha").value.trim();

    // Validación básica
    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !fecha) {
        alert("Error al modificar datos");
        return;
    }

    // Actualizar el objeto en el array
    students[index] = { name, lastName, grade, fecha };

    // Limpiar y volver a generar toda la tabla
    tableBody.innerHTML = "";
    students.forEach(addStudentToTable);

    // Volver a mostrar botón "Guardar Alumno"
    document.getElementById("save_dinamic").innerHTML = `<button type="submit" id="save_">Guardar Alumno</button>`;

    // Limpiar el formulario
    document.getElementById("studentForm").reset();

    // Recalcular promedio
    avg_prom();
}

function modificar(student){
    let index = students.indexOf(student)

    document.getElementById("name").value = students[index]["name"]
    document.getElementById("lastName").value = students[index]["lastName"]
    document.getElementById("grade").value = students[index]["grade"]
    document.getElementById("fecha").value = students[index]["fecha"]

    document.getElementById("save_dinamic").innerHTML = `<input type="button" class="save-action" onclick="modificarTabla(${index})" value="Modificar Alumno">`;

}