$(() => {
  //Funcion para validar todo el formulario
  const validateData = () => {
    //Array con toda la data del estudiante
    let studentData = []
    let errorNombre = false;
    let errorCedula = false

    //Validando cedula
    const cedula = $("form")[0].cedula.value;
    cedula.length >= 10 && cedula.length <= 12
    ? studentData.push(cedula)
    : errorCedula = true;

    //Validando nombre
    const nombre = $("form")[0].nombre.value;
    if(isNaN(nombre)){
      studentData.push(nombre);
    } else {
      errorNombre = true;
    }

    //Validando notas y sacar promedio
    let promedio = 0;
    for (let i = 0; i < 3; i++) {
      studentData.push(parseFloat($("form")[0].nota[i].value));
      promedio += parseFloat($("form")[0].nota[i].value);
    }
    promedio /= 3;
    studentData.push(parseFloat(promedio.toFixed(2)));

    if(errorNombre) {
      alert("Su nombre debe ser real, no un numero.");
    }
    if(errorCedula) {
      alert("La cedula no cumple con los requisitos.")
    }
    if(!errorNombre && !errorCedula){
      $("tbody").append(`
      <tr>
        <td>${studentData[0]}</td>
        <td>${studentData[1]}</td>
        <td>${studentData[2]}</td>
        <td>${studentData[3]}</td>
        <td>${studentData[4]}</td>
        <td>${studentData[5]}</td>
      </tr>`);
    }
  }

  //Evento disparado al momento de dar click en el botón
  $("form").submit((e) => {
    e.preventDefault();
    validateData();
  })
})