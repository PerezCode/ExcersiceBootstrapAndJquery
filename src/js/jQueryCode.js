$(() => {
  $('input[type="submit"]').hide();

  // Funcion para validar todo el formulario
  const validateData = () => {
    // Array con toda la data del estudiante
    let studentData = [];
    let errorNombre = false;
    let errorCedula = false;
    let errorNotas = false;

    // Validando cedula
    const cedula = $('input[name="cedula"]').val();

    cedula.length >= 10 && cedula.length <= 12
    ? studentData.push(cedula)
    : errorCedula = true;

    // Validando nombre
    const nombre = $("form")[0].nombre.value;
    isNaN(nombre) ? studentData.push(nombre) : errorNombre = true;

    // Validando notas y sacar promedio
    let promedio = 0;
    let nota1 = $("#nota1").val();
    let nota2 = $("#nota2").val();
    let nota3 = $("#nota3").val();

    if(nota1 === "" || nota2 === "" || nota3 === ""){
      alert("No ingresaste alguna nota :(");
      errorNotas = true;
    } else {
      for (let i = 0; i < 3; i++) {
        studentData.push(parseFloat($("form")[0].nota[i].value));
        promedio += parseFloat($("form")[0].nota[i].value);
      }
      promedio /= 3;
      studentData.push(parseFloat(promedio.toFixed(2)));
    }

    // Mostrando alertas de errores
    if(errorNombre) {
      alert("Su nombre debe ser real, no un numero.");
    }
    if(errorCedula) {
      alert("La cedula no cumple con los requisitos.");
    }

    // Validando la inexistencia de errores para agregar en la tabla
    if(!errorNombre && !errorCedula && !errorNotas){
      $("tbody").append(`
      <tr>
        <td>${studentData[2]}</td>
        <td>${studentData[0]}</td>
        <td>${studentData[1]}</td>
        <td>${studentData[2]}</td>
        <td>${studentData[3]}</td>
        <td>${studentData[4]}</td>
        <td>${studentData[5]}</td>
      </tr>`);
    }
  }

  const calcularEdad = (fecha) => {
    var today = new Date();
    var birthday = new Date(fecha);
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  // Evento disparado al momento de dar click en el botón
  $("form").submit((e) => {
    e.preventDefault();
    validateData();
  })

  $('input[type="date"]').change((e) => {
    const miEdad = calcularEdad(e.target.value);
    if(miEdad >= 18){
      $('input[type="submit"]').show(1000);
    } else {
      $('input[type="submit"]').hide(1000);
    }
  })
})