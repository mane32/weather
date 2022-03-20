const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})
function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if (ciudad === '' || pais == '') {
        //Hubo un error
        mostrarError('Ambos campos son obligatorios!');
        return;
    }
    consultarAPI(ciudad, pais);
}
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('pruebas', 'rounded', 'border', 'border-1', 'border-danger', 'text-center', 'p-2', 'w-50', 'm-auto', 'rojizo');
        alerta.innerHTML = `<strong class ="font-bold">Error!</strong><span class ="block">${mensaje}</span>`;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}
function consultarAPI(ciudad, pais) {

    const appId = 'eb7a9b7f91c092afb0cb73b893f3c3eb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    Spinner(); 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); 
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }
        mostrarClima(datos);
        })
    }
function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('h5');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('card-title', 'text-muted');

    const actual = document.createElement('h5');
    actual.innerHTML = `${centigrados}&#8451;`;
    actual.classList.add('card-title', 'mb-2');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max}&#8451;`;
    tempMaxima.classList.add('card-text', 'mt-2');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min}&#8451;`;
    tempMinima.classList.add('card-text');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'card', 'p-2', 'm-auto', 'caja');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-chase');

    divSpinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `;

    resultado.appendChild(divSpinner);
}
