const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    calcularCalorias();
})

function calcularCalorias() {
    aparecerResultado();

    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const genero = document.querySelector('input[name="genero"]:checked');
    const actividad = document.querySelector('#actividad');
    //my update start
    let nombre_apellido = document.getElementById("nombre_apellido").value;
    let tipo_de_documento = document.getElementById("tipo_de_documento").selectedOptions[0].value;
    let numero_documento = document.getElementById("numero_documento").value;
    let grupo_poblacional = "";
    //my update end
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }




    if ( !(edad.value && peso.value && altura.value) ) {
        mostrarMensajeDeError('Por favor asegúrese de llenar todos los campos');
        return;
    } else if (edad.value < 15 || edad.value > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    }
    
    let calculoCalorias;
    if (genero.id === 'hombre') {
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) + 5;
    } else {
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) -161
    }
    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

    //my update start//
    if (edad.value >= 15 && edad.value <=29) {
        grupo_poblacional = "Jovenes" }
    
    if (edad.value >= 30 && edad.value <=59) {
        grupo_poblacional = "Adultos" }
    
    if (edad.value >= 60) {
        grupo_poblacional = "Adultos mayores"
    }

    // grupo poblacional
    //my update end//
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h4 class="text-center justify-content-between pb-4">El paciente <span>${nombre_apellido}</span> identificado con <span>${tipo_de_documento}</span> No.<span>${numero_documento}</span>, requiere un total de <span>${Math.floor(calculoCalorias)}</span> kcal para el sostenimiento de su TBM "tasa metabólica basal”.</h4>
            <h4 class="text-center justify-content-between pb-4">Perteneces al grupo poblacional <span>${grupo_poblacional}</span>.</h4>
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center font-weight-bold" value="${Math.floor(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `

    //my update start//
    nombre_apellido.value = null;
    tipo_de_documento.value = null;
    numero_documento.value = null;
    //my update end//
    peso.value = null;
    altura.value = null;
    edad.value = null;
    actividad.value = null;
    
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}

// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}